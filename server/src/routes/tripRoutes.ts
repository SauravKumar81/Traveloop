import express from 'express';
import {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  generateAIItinerary,
} from '../controllers/tripController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();


router.route('/')
  .get(protect, getTrips)
  .post(protect, createTrip);

router.route('/:id')
  .get(protect, getTripById)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

router.post('/:id/generate-itinerary', protect, generateAIItinerary);

export default router;
