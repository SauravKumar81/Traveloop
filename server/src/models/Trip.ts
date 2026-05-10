import mongoose, { Schema, Document } from 'mongoose';

export interface IItineraryItem {
  _id?: mongoose.Types.ObjectId;
  day: number;
  date: Date;
  time?: string;
  activity: string;
  location?: string;
  notes?: string;
}

export interface ITrip extends Document {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  description?: string;
  coverImage?: string;
  status: 'planning' | 'ongoing' | 'completed';
  itinerary: IItineraryItem[];
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed'],
      default: 'planning',
    },
    itinerary: [
      {
        day: { type: Number, required: true },
        date: { type: Date, required: true },
        time: { type: String },
        activity: { type: String, required: true },
        location: { type: String },
        notes: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model<ITrip>('Trip', tripSchema);

export default Trip;
