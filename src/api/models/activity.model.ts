import { Document, Schema, Model, model } from "mongoose";
import UtilityScripts from "../../utils/utilityscripts";

interface IActivity extends Document {
   
}
interface IActivityModel extends IActivity, Document {
    
}

const Types = Schema.Types;
const ActivitySchema: Schema = new Schema({
    trackmode: {type: Types.String, enum: ["none", "cmi5", "xapi"]},
    chapter: {type: Types.ObjectId, ref: "Chapter", required: true, index: true},
    entity: {type: Types.ObjectId, refPath: "onModel", index: true},
    onModel: { type: Types.String, enum: ["File", "Course", "Video", "MemberActivity", "Event", "Project"], required: true, index: true},
    createdBy: { type: Types.ObjectId, ref: "User", required: true }
}, { timestamps: true});

const ActivityModel: Model<IActivityModel> = model<IActivityModel>("Activity", ActivitySchema);
export default ActivityModel;