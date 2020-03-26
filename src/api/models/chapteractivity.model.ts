import { Document, Schema, Model, model } from "mongoose";

interface IChapterActivity extends Document {
   
}
interface IChapterActivityModel extends IChapterActivity, Document {
    
}

const Types = Schema.Types;
const ChapterActivitySchema: Schema = new Schema({
    trackmode: {type: Types.String, enum: ["none", "cmi5", "xapi"]},
    chapter: {type: Types.ObjectId, ref: "Chapter", required: true, index: true},
    entity: {type: Types.ObjectId, refPath: "onModel", index: true},
    onModel: { type: Types.String, enum: ["Document", "Course", "Video", "MemberActivity", "Event", "Project"], required: true, index: true},
    tracking: { type: Types.ObjectId, ref: "Tracking"},
    createdBy: { type: Types.ObjectId, ref: "User", required: true }
}, { timestamps: true});

const ChapterActivityModel: Model<IChapterActivityModel> = model<IChapterActivityModel>("ChapterActivity", ChapterActivitySchema);
export default ChapterActivityModel;