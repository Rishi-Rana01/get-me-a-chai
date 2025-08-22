"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments } from '@/actions/useractions';


const PaymentPage = ({ username }) => {
    // const { data: session } = useSession();

    const [paymentform, setPaymentform] = useState({
        name: "",
        amount: "",
        message: ""
    });


    const [currentuser, setcurrentuser] = useState({})
    const [payments, setPayments] = useState([])

    useEffect(() => {
        getData();
    }, [username])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentuser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)

    }



    const pay = async (amount) => {
        // Set userId from session before initiating payment
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id

        var options = {
            key: process.env.NEXT_PUBLIC_KEY_ID, // <-- Use NEXT_PUBLIC_ for frontend env vars
            amount: amount,
            currency: "INR",
            name: "Get Me A Chai",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderId,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            prefill: {
                name: currentuser.name || "Guest",
                email: currentuser.email || "guest@example.com",
                contact: currentuser.contact || "9999999999"
            },


            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"

            />

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-[350px]'
                    style={{
                        display: "block",
                        WebkitUserSelect: "none",
                        margin: "auto",
                        cursor: "zoom-in",
                        backgroundColor: "hsl(0, 0%, 90%)"
                    }}
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=zsP2VxX28Pzusuu7g5cICAJA3of1IL3Ha8GBMmmAqus%3D&amp;token-time=1756944000"
                    width="1024"
                    height="256"
                />
                <div className='absolute -bottom-20 right-[46%] border-white border-2 rounded-full'>
                    <img className='rounded-full' width={85} height={85} src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div>
                    <h1 className=" text-3xl font-bold">{username}</h1>
                </div>

                <div className="text-slate-400">
                    Creating a personalized page for each user.
                </div>
                <div className="text-slate-400">
                    1M members. 99 posts. 1000+ projects.
                </div>
                <div className="payment flex gap-3 w-[88%] mt-11">
                    <div className="supporters w-1/2 bg-slate-800 rounded-lg text-white p-10">
                        {/* Show list of all the supporter as the learderBoard */}
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>

                        <ul className='mx-4 text-lg'>
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-2 items-center'>
                                    <img className='rounded-full' width={45} src={`https://randomuser.me/api/portraits/men/${i}.jpg`} alt="" />
                                    <span className='font-bold'>{p.name}</span> donated <span className='font-bold'>${p.amount}</span> with a message: {p.message}
                                </li>
                            })}

                        </ul>

                    </div>
                    <div className="makepayment w-1/2 bg-slate-800 rounded-lg text-white p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <form className='flex flex-col gap-4'>
                            <input onChange={handleChange} value={paymentform.name ?? ""} name='name' type="text" className='p-2 rounded-lg bg-slate-700 text-white' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.amount ?? ""} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <input onChange={handleChange} value={paymentform.message ?? ""} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <div className="text-center">
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="w-1/2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Pay Now</button>
                            </div>
                        </form>
                        {/* or choose from the amounts */}
                        <div className="flex justify-center gap-2 mt-4">
                            <button className='bg-blue-600 p-2 rounded-lg text-white' onClick={() => pay(1000)} >Pay ₹10</button>
                            <button className='bg-blue-600 p-2 rounded-lg text-white' onClick={() => pay(2000)} >Pay ₹20</button>
                            <button className='bg-blue-600 p-2 rounded-lg text-white' onClick={() => pay(3000)} >Pay ₹30</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default PaymentPage;