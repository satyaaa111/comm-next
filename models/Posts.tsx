import mongoose, { Document, Model } from 'mongoose';

interface UserAttributes {
  userName: string;
  posts: string;
}

interface UserDocument extends Document, UserAttributes {}

interface UserModel extends Model<UserDocument> {}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  userName: {
     type: String,
  },
  posts: {
    type: String,
  }
});

const UserModel: UserModel = mongoose.models.User || mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;
