import { Document, Schema, Model, model } from "mongoose";
import UtilityScripts from "../../utils/utilityscripts";

interface ITracking extends Document {
    title: string;
    machine_name: string;
}
interface ITrackingModel extends ITracking, Document {
    
}

const Types = Schema.Types;
const TrackingSchema: Schema = new Schema({
    member: { type: Types.ObjectId, ref: "Member", required: true, index: true },
    activity: { type: Types.ObjectId, ref: "Activity", required: true, index: true},
    status: { type: Types.String, enum: ["na", "i", "c", "p", "f"], required: true, index: true}
}, { timestamps: true});

TrackingSchema.pre<ITracking>("validate", function (next: any) {
    this.machine_name = UtilityScripts.machine_name(this.title);
    next();
});
const TrackingModel: Model<ITrackingModel> = model<ITrackingModel>("Tracking", TrackingSchema);
export default TrackingModel;