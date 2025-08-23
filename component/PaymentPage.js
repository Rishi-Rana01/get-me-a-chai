"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';



const PaymentPage = ({ username }) => {
    // const { data: session } = useSession();

    const [paymentform, setPaymentform] = useState({
        name: "",
        amount: "",
        message: ""
    });


    const [currentuser, setcurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData();
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true" ) {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const getData = async () => {
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
            key: currentuser.razorpayid, // <-- Use NEXT_PUBLIC_ for frontend env vars
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
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />

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
                    src={currentuser.coverpic}
                    width="1024"
                    height="256"
                />
                <div className='absolute -bottom-20 right-[46%] border-white border-2 overflow-hidden rounded-full size-32'>
                    <img className='rounded-full object-cover size-32' src={currentuser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div>
                    <h1 className=" text-3xl font-bold">{username}</h1>
                </div>

                <div className="text-slate-400">
                    Lets help {username} get a Chai!
                </div>
                <div className="text-slate-400">
                    {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                <div className="payment flex gap-3 w-[88%] mt-11">
                    <div className="supporters w-1/2 bg-slate-800 rounded-lg text-white p-10">
                        {/* Show list of all the supporter as the learderBoard */}
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>

                        <ul className='mx-4 text-lg'>
                            {payments.length === 0 && <div>No supporters yet. Be the first one to support!</div>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-2 items-center'>
                                    <img className='rounded-full' width={45} src={`https://randomuser.me/api/portraits/men/${i}.jpg`} alt="" />
                                    <span className='font-bold'>{p.name}</span> donated <span className='font-bold'>₹{p.amount}</span> with a message: {p.message}
                                </li>
                            })}

                        </ul>

                    </div>
                    <div className="makepayment w-1/2 bg-slate-800 rounded-lg text-white p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <form className='flex flex-col gap-4'>
                            <input onChange={handleChange} value={paymentform.name ?? ""} name='name' type="text" className='p-2 rounded-lg bg-slate-700 text-white' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message ?? ""} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount ?? ""} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <div className="text-center">
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button"
                                    className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl 
                                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}
                                >Pay-to contribute
                                </button>
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