import { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {}
interface IUserModel extends IUser, Document {

}

const Types = Schema.Types;
const UserSchema: Schema = new Schema({
    firstName: { type: Types.String, index: true, text: true },
    lastName: { type: Types.String, index: true}
});

const UserModel: Model<IUserModel> = model<IUserModel>("User", UserSchema);
export default UserModel;