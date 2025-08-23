"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";


export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDb();
        
        // Validate required fields
        if (!amount || !to_username) {
            return { error: "Missing amount or username" };
        }
        
        if (!paymentform?.name) {
            return { error: "Please provide your name" };
        }
        
        // Find user and validate Razorpay credentials
        let user = await User.findOne({ username: to_username });
        if (!user) {
            return { error: "User not found" };
        }
        
        if (!user.razorpayid || !user.razorpaysecret) {
            return { error: "Payment configuration missing for this user" };
        }
        
        const secret = user.razorpaysecret;
        
        // Create Razorpay instance
        var instance = new Razorpay({
            key_id: user.razorpayid,
            key_secret: secret,
        });

        // Ensure amount is a valid number
        const parsedAmount = Number.parseInt(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return { error: "Invalid amount" };
        }
        
        let options = {
            amount: parsedAmount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        // Create order in Razorpay
        let x = await instance.orders.create(options);
        
        // Store payment details in database
        await Payment.create({
            oid: x.id,
            amount: parsedAmount / 100, // Store actual amount in rupees
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message || "",
            done: false
        });
        
        console.log("Payment initiated:", x.id);
        return x;
    } catch (err) {
        console.error("Payment initiation error:", err);
        return { error: err.message || "Payment initiation failed" };
    }
}

export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: username }).lean();
    if (!u) return null;
    // Convert _id and any Date fields to string
    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString(),
        updatedAt: u.updatedAt?.toISOString(),
    };
};

export const fetchpayments = async (username) => {
    await connectDb();
    let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    // Map each payment to plain object with stringified _id and dates
    return payments.map(p => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toISOString(),
        updatedAt: p.updatedAt?.toISOString(),
    }));
};

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)
    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    }
    else {
        await User.updateOne({ email: ndata.email }, ndata)
    }
}
