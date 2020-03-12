import { Document, Schema, Model, model } from "mongoose";

interface ICourse extends Document {
   // title: string;
   // machine_name: string;
}
interface ICourseModel extends ICourse, Document {
    
}

const Types = Schema.Types;
const CourseSchema: Schema = new Schema({
    id: {type: Types.String, required: true},
    title: {type: Types.String, required: true},
    // machine_name: {type: Types.String, required: true, unique: true, index: true},
    description: {type: Types.String, required: true},
    sco: {type: Types.ObjectId, refPath:"onModel", required : true},
    onModel: {type: Types.String, enum: ["AU", "Tincan"], required: true},
    startdate: {type: Types.Number},
    enddate: {type: Types.Number}
});

/* CourseSchema.pre<ICourse>("validate", function (next: any) {
    this.machine_name = UtilityScripts.machine_name(this.title);
    next();
}); */
const CourseModel: Model<ICourseModel> = model<ICourseModel>("Course", CourseSchema);
export default CourseModel;