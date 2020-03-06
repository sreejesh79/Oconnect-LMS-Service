import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

interface IChapterEntity extends Document {}
interface IChapterEntityModel extends IChapterEntity, Document {

}

const Types = Schema.Types;
const ChapterEntitySchema: Schema = new Schema({
    chapter: {type: Types.ObjectId, ref: "Chapter", required: true, index: true},
    entity: {type: Types.ObjectId, refPath: "onModel", required: true, index: true},
    onModel: { type: Types.String, enum: ["File", "Course", "Activity", "Event", "Project"], required: true, index: true},
});

const ChapterEntityModel: Model<IChapterEntityModel> = model<IChapterEntityModel>("ChapterEntity", ChapterEntitySchema);
export default ChapterEntityModel;