import mongoose, { Document } from 'mongoose';
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
declare const Trip: mongoose.Model<ITrip, {}, {}, {}, mongoose.Document<unknown, {}, ITrip, {}, mongoose.DefaultSchemaOptions> & ITrip & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITrip>;
export default Trip;
//# sourceMappingURL=Trip.d.ts.map