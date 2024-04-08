import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User, { UserDocument } from '@/models/Users';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        // Find the user by email
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Compare the passwords
        const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: 'Invalid request method' });
      break;
  }
}