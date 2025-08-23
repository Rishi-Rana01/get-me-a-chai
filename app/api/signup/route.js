import { NextResponse } from 'next/server';
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Connect to the database
    await connectDb();
    
    // Parse the request body
    const { name, email, username, password } = await request.json();
    
    // Validate required fields
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json(
        { message: 'Username already taken' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      profilepic: "https://i.imgur.com/your-default-profilepic.png",
      coverpic: "https://i.imgur.com/your-default-coverpic.png",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Save the user to the database
    await newUser.save();
    
    // Return success response
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}