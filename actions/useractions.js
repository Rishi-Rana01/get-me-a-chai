"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/utils/connectDB"
import User from '@/models/Users' 

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
}
  