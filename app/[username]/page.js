import React from 'react'

const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <>
      {username}
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
          <h1 className=" text-3xl font-bold">@{username}</h1>
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
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                <span className='font-bold'>Shubham</span> donated <span className='font-bold'>$30</span> with a message: Weldone Bro 👌</li>
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/women/2.jpg" alt="" />
                <span className='font-bold'>Riya</span> donated <span className='font-bold'>$10</span> with a message: Keep it up!</li>
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
                <span className='font-bold'>Parshant</span> donated <span className='font-bold'>$50</span> with a message: I support you❤️ </li>
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/women/4.jpg" alt="" />
                <span className='font-bold'>Ritika</span> donated <span className='font-bold'>$20</span> with a message: Keep it up!</li>
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/men/5.jpg" alt="" />
                <span className='font-bold'>Karan</span> donated <span className='font-bold'>$50</span> with a message: Great job!</li>
              <li className='my-2 flex gap-2 items-center'>
                <img className='rounded-full' width={45} src="https://randomuser.me/api/portraits/men/6.jpg" alt="" />
                <span className='font-bold'>Abhi</span> donated <span className='font-bold'>$300</span> with a message: Keep it up!</li>
            </ul>

          </div>
          <div className="makepayment w-1/2 bg-slate-800 rounded-lg text-white p-10">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
            <form className='flex flex-col gap-4'>
              <input type="text" placeholder='Enter Name' className='p-2 rounded-lg bg-slate-700 text-white' />
              <input type="text" placeholder='Enter Amount' className='p-2 rounded-lg bg-slate-700 text-white' />
              <textarea placeholder='Add a message' className='p-2 rounded-lg bg-slate-700 text-white' rows="3"></textarea>
              <div className="text-center">
                <button type="button" className="w-1/2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Pay Now</button>
              </div>
            </form>
            {/* or choose from the amounts */}
            <div className="flex justify-center gap-2 mt-4">
              <button className='bg-blue-600 p-2 rounded-lg text-white'>$10</button>
              <button className='bg-blue-600 p-2 rounded-lg text-white'>$20</button>
              <button className='bg-blue-600 p-2 rounded-lg text-white'>$30</button>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}

export default Username;