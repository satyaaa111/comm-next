import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User, { UserDocument } from '@/models/Users';
import bcrypt from 'bcrypt';

interface CreateUserRequestBody {
  name: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { name, userName, phone, email, password }: CreateUserRequestBody =
      await req.json();

    // Check if the user already exists
    const existingUser: UserDocument | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Create a new user
    const user: UserDocument = new User({
      name,
      userName,
      phone,
      email,
      password: hashedPassword,
    });
    await user.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const GET = () => {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
};