import { Document, Schema, Model, model } from "mongoose";
// import findOrCreate from "mongoose-findorcreate";
import UtilityScripts from "../../utils/utilityscripts";

interface IDocument extends Document {
   
}
interface IDocumentModel extends IDocument, Document {
    
}

const Types = Schema.Types;
const DocumentSchema: Schema = new Schema({
    file: {type: Types.ObjectId, ref: "File", required: true},
    type: {type: Types.String, enum: ['pdf', 'presentation', 'document', 'spreadsheet', 'others'], required: true, index: true, default: 'others'},
    metadata: {type: Types.String}
});

const DocumentModel: Model<IDocumentModel> = model<IDocumentModel>("Document", DocumentSchema);
export default DocumentModel;
