import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[44vh] gap-4">
        <div className="font-bold text-3xl md:text-5xl flex gap-2 justify-center items-center text-center">Buy Me a Chaii
          <span>
            <Image className="animate-pulse invertimg" src="/tea.gif" width={88} height={88} alt="" />
          </span>
        </div>
        <p>A crowdfunding platform for creators to fund their projects.</p>
        <p>Your fans can support you by buying you a chai!</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
         focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now
            </button>
          </Link>

          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
         focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-emerald-50 h-1 opacity-10">  </div>

      {/* 1 */}
      <div className="text-white container mx-auto pb-32 pt-14">
        <h1 className="text-center font-bold text-2xl mb-14">Your Fans can buy you a Chai</h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 justify-around">
          {/* ITEMS */}
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <Image className=" bg-slate-400 rounded-full p-2 text-black" src="/man.gif" width={88} height={88} alt="" />
            <p className="font-bold">Fans wants to help</p>
            <p className="text-center">Your Fans are available to support you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <Image className=" bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} height={88} alt="" />
            <p className="font-bold">Fans wants to contribute</p>
            <p className="text-center">Your Fans are willing to contribute</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <Image className=" bg-slate-400 rounded-full p-2 text-black" src="/group.gif" width={88} height={88} alt="" />
            <p className="font-bold">Fans wants to collaborate</p>
            <p className="text-center">Your Fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 h-1 opacity-10">  </div>
      {/* 2 */}

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-8">Learn more about us</h2>

        {/* Responsive youtube embed + description */}
        <div className="w-[90%] md:w-[60%] lg:w-[50%]">
          <div className="relative w-full h-[40vh] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Buy Me a Chai - About"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="mt-6 text-center text-gray-200 max-w-2xl mx-auto">
            Buy Me a Chai is a simple way for creators to receive small, meaningful support from their fans.
            Fans can buy a chai to show appreciation, back projects, or collaborate. We focus on simplicity,
            fast payouts, and building direct creator-fan relationships.
          </p>

          <div className="flex gap-3 mt-6 justify-center">
            <Link href="/about">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
               focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
               text-sm px-5 py-2.5 me-2 mb-2">Read our story</button>
            </Link>

            <Link href="/contact">
              <button className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg 
               text-sm px-5 py-2.5 me-2 mb-2">Contact us</button>
            </Link> 
          </div>
        </div>
      </div>
    </>
  );
}
