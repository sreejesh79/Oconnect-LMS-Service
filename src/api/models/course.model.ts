import { Document, Schema, Model, model } from "mongoose";
import UtilityScripts from "../../utils/utilityscripts";

interface ICourse extends Document {
    title: string;
    machine_name: string;
}
interface ICourseModel extends ICourse, Document {
    
}

const Types = Schema.Types;
const CourseSchema: Schema = new Schema({
    title: {type: Types.String, required: true},
    machine_name: {type: Types.String, required: true, unique: true, index: true},
    description: {type: Types.String, required: true},

}, { timestamps: true});

CourseSchema.pre<ICourse>("validate", function (next: any) {
    this.machine_name = UtilityScripts.machine_name(this.title);
    next();
});
const CourseModel: Model<ICourseModel> = model<ICourseModel>("Course", CourseSchema);
export default CourseModel;