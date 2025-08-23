import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        await connectDb()
        let body = await req.formData()
        body = Object.fromEntries(body)

        console.log('Payment callback received:', body)

        // Check if razorpayOrderId is present on the server
        let p = await Payment.findOne({oid: body.razorpay_order_id})
        if(!p){
            console.error('Order ID not found:', body.razorpay_order_id)
            return NextResponse.json({success: false, message:"Order Id not found"})
        }

        // fetch the secret of the user who is getting the payment 
        let user = await User.findOne({username: p.to_user})
        if (!user || !user.razorpaysecret) {
            console.error('User or Razorpay secret not found for:', p.to_user)
            return NextResponse.json({success: false, message:"User configuration error"})
        }
        const secret = user.razorpaysecret

        // Verify the payment
        let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

        if(xx){
            // Update the payment status
            const updatedPayment = await Payment.findOneAndUpdate(
                {oid: body.razorpay_order_id}, 
                {done: true}, // Use boolean true instead of string "true"
                {new: true}
            )
            console.log('Payment verified and updated:', updatedPayment)
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)  
        }
        else{
            console.error('Payment verification failed for order:', body.razorpay_order_id)
            return NextResponse.json({success: false, message:"Payment Verification Failed"})
        }
    } catch (error) {
        console.error('Error processing payment:', error)
        return NextResponse.json({success: false, message:"Payment processing error", error: error.message})
    }

}