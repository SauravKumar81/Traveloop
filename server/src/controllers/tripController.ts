import { Request, Response } from 'express';
import Trip from '../models/Trip';

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// @desc    Get all trips for a user
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    // Find trips where user is the creator or a member
    const trips = await Trip.find({
      $or: [{ creator: userId }, { members: userId }],
    }).sort({ startDate: 1 });

    res.status(200).json(trips);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('creator', 'displayName email avatar')
      .populate('members', 'displayName email avatar');

    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }

    const userId = (req as any).user._id.toString();
    // Check access
    if (
      trip.creator._id.toString() !== userId &&
      !trip.members.some((member: any) => member._id.toString() === userId)
    ) {
      res.status(403).json({ message: 'Not authorized to view this trip' });
      return;
    }

    res.status(200).json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, destination, startDate, endDate, description } = req.body;
    const userId = (req as any).user._id;

    const trip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      description,
      creator: userId,
      members: [userId], // Add creator to members by default
    });

    res.status(201).json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }

    const userId = (req as any).user._id.toString();
    if (trip.creator.toString() !== userId) {
      res.status(403).json({ message: 'Only creator can update the trip' });
      return;
    }

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('creator', 'displayName email avatar')
      .populate('members', 'displayName email avatar');

    // Emit event to all users in the trip room
    const io = req.app.get('io');
    io.to(req.params.id as string).emit('trip_updated', updatedTrip);

    res.status(200).json(updatedTrip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }

    const userId = (req as any).user._id.toString();
    if (trip.creator.toString() !== userId) {
      res.status(403).json({ message: 'Only creator can delete the trip' });
      return;
    }

    await trip.deleteOne();
    res.status(200).json({ message: 'Trip removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate AI Itinerary
// @route   POST /api/trips/:id/generate-itinerary
// @access  Private
export const generateAIItinerary = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }

    const userId = (req as any).user._id.toString();
    if (trip.creator.toString() !== userId) {
      res.status(403).json({ message: 'Only creator can generate AI itinerary' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ message: 'Gemini API key not configured' });
      return;
    }

    const { preferences } = req.body;
    
    // Calculate total days
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

    const prompt = `You are an expert travel planner. Create a detailed daily itinerary for a trip to ${trip.destination}. 
The trip is for ${totalDays} days, from ${start.toISOString().split('T')[0]} to ${end.toISOString().split('T')[0]}.
Additional preferences: ${preferences || 'None provided. Provide a balanced mix of sightseeing, food, and culture.'}

Respond strictly with a JSON array of itinerary items. Do NOT wrap it in markdown. Do NOT add any extra text.
Each item in the array must match this exact structure:
{
  "day": <number> (1 for the first day, 2 for second, etc.),
  "date": <string> (ISO date string e.g. "2024-05-15T00:00:00.000Z"),
  "time": <string> (e.g., "09:00 AM", "12:30 PM", "Evening"),
  "activity": <string> (The main activity),
  "location": <string> (Optional: Specific place name or address),
  "notes": <string> (Optional: Additional tips, booking info, or context)
}

Ensure you provide 3-4 activities per day (e.g. morning, afternoon, evening).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful travel planning assistant that outputs only raw, valid JSON. Never output markdown codeblocks like ```json",
        temperature: 0.7,
      }
    });

    let jsonResponse = response.text || '';
    
    // Quick sanitization in case of markdown wrappers
    jsonResponse = jsonResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let itineraryItems;
    try {
      itineraryItems = JSON.parse(jsonResponse);
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", jsonResponse);
      res.status(500).json({ message: 'Invalid response from AI model' });
      return;
    }
    
    trip.itinerary = itineraryItems;
    
    const updatedTrip = await trip.save();
    const populatedTrip = await Trip.findById(updatedTrip._id)
      .populate('creator', 'displayName email avatar')
      .populate('members', 'displayName email avatar');

    const io = req.app.get('io');
    io.to(req.params.id as string).emit('trip_updated', populatedTrip);

    res.status(200).json(populatedTrip);
  } catch (error: any) {
    console.error('Error generating AI itinerary:', error);
    res.status(500).json({ message: error.message || 'Failed to generate itinerary' });
  }
};
