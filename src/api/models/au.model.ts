import { Document, Schema, Model, model } from "mongoose";

interface IAU extends Document {
   // title: string;
   // machine_name: string;
}
interface IAUModel extends IAU, Document {
    
}

const Types = Schema.Types;
const AUSchema: Schema = new Schema({
    id: {type: Types.String, required: true, unique: true, index: true},
    title: {type: Types.String, required: true},
   // machine_name: {type: Types.String, required: true, unique: true, index: true},
    description: {type: Types.String, required: true},
    masteryScore: {type: Types.Number, default: 0},
    launchMethod: {type: Types.String},
    moveOn: {type: Types.String},
    url: {type: Types.String}

}, { timestamps: true});

/* AUSchema.pre<IAU>("validate", function (next: any) {
    this.machine_name = UtilityScripts.machine_name(this.title);
    next();
}); */
const AUModel: Model<IAUModel> = model<IAUModel>("AU", AUSchema);
export default AUModel;