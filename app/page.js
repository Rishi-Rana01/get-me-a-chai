import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[44vh] gap-4">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center ">Buy Me a Chaii
          <span>
            <img src="/tea.gif" width={88} alt="" />
          </span>
        </div>
        <p>A crowdfunding platform for creators to fund their projects.</p>
        <p>Your fans can support you by buying you a chai!</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
         focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now
          </button>

          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
         focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Read More
          </button>
        </div>
      </div>

      <div className="bg-emerald-50 h-1 opacity-10">  </div>

      {/* 1 */}
      <div className="text-white container mx-auto pb-32 pt-14">
        <h1 className="text-center font-bold text-2xl mb-14">Your Fans can buy you a Chai</h1>
        <div className="flex gap-5 justify-around">
          {/* ITEMS */}
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/man.gif" width={88} alt="" />
            <p className="font-bold">Fans wants to help</p>
            <p className="text-center">Your Fans are available to support you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} alt="" />
            <p className="font-bold">Fans wants to contribute</p>
            <p className="text-center">Your Fans are willing to contribute</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/group.gif" width={88} alt="" />
            <p className="font-bold">Fans wants to collaborate</p>
            <p className="text-center">Your Fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 h-1 opacity-10">  </div>
      {/* 2 */}

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        {/* Responsive youtube embed  */}
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" 
          title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; 
          encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
          </iframe>
        </div>
      </div>
    </>
  );
}
