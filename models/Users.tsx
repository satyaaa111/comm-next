import mongoose, { Document, Model } from 'mongoose';

export interface UserAttributes {
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserDocument extends Document, UserAttributes {}

export interface UserModel extends Model<UserDocument> {}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel: UserModel = mongoose.models.User || mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;
