"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controllers/tripController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, tripController_1.getTrips)
    .post(authMiddleware_1.protect, tripController_1.createTrip);
router.route('/:id')
    .get(authMiddleware_1.protect, tripController_1.getTripById)
    .put(authMiddleware_1.protect, tripController_1.updateTrip)
    .delete(authMiddleware_1.protect, tripController_1.deleteTrip);
router.post('/:id/generate-itinerary', authMiddleware_1.protect, tripController_1.generateAIItinerary);
exports.default = router;
//# sourceMappingURL=tripRoutes.js.map