"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/Users";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    // Validate required fields
    if (!amount || !to_username || !paymentform?.name) {
        return { statusCode: 400, error: "Missing required fields" };
    }

    try {
        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        let options = {
            amount: Number.parseInt(amount),
            currency: "INR", // Fixed currency code
        };

        let x = await instance.orders.create(options);

        await Payment.create({
            oid: x.id,
            amount: amount,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
            userId: paymentform.userId,
        });
        console.log("Received userId:", paymentform.userId);
        return x;
    } catch (err) {
        return { statusCode: 400, error: err.message || "Payment initiation failed" };
    }
};