import { Document, Schema, Model, model } from "mongoose";

interface ITracking extends Document {
}
interface ITrackingModel extends ITracking, Document {
    
}

const Types = Schema.Types;
const TrackingSchema: Schema = new Schema({
    member: { type: Types.ObjectId, ref: "Member", required: true, index: true },
    activity: { type: Types.ObjectId, ref: "ChapterActivity", required: true, index: true},
    status: { type: Types.String, enum: ["na", "i", "c", "p", "f"], required: true, index: true},
}, { timestamps: true});


const TrackingModel: Model<ITrackingModel> = model<ITrackingModel>("Tracking", TrackingSchema);
export default TrackingModel;