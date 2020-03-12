import { Document, Schema, Model, model } from "mongoose";
import UtilityScripts from "../../utils/utilityscripts";

interface ICourseEnroll extends Document {
   registration: string;
   // machine_name: string;
}
interface ICourseEnrollModel extends ICourseEnroll, Document {
    
}

const Types = Schema.Types;
const CourseEnrollSchema: Schema = new Schema({
    registration: {type: Types.String, required: true, unique: true, index: true},
    member: {type: Types.ObjectId, ref: "Member", required: true},
    course: {type: Types.ObjectId, ref: "Course", required: true},
    chapter: {type: Types.ObjectId, ref: "Chapter", required: true},
    status: {type: Types.String, enum:['active', 'inactive', 'expired'], required: true, default: 'active'}
});

CourseEnrollSchema.pre<ICourseEnroll>("validate", function (next: any) {
    this.registration = UtilityScripts.generateUUID();
    next();
}); 
const CourseEnrollModel: Model<ICourseEnrollModel> = model<ICourseEnrollModel>("CourseEnroll", CourseEnrollSchema);
export default CourseEnrollModel;