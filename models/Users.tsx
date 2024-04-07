import mongoose, { Document, Model } from 'mongoose';

interface UserAttributes {
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  posts: string;
}

interface UserDocument extends Document, UserAttributes {}

interface UserModel extends Model<UserDocument> {}

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
  posts: {
    type: String,
  }
});

const UserModel: UserModel = mongoose.models.User || mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;
