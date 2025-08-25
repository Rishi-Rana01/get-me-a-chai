import "./globals.css";
import SessionWrapper from "@/component/sessionWrapper";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] dark:text-white light:bg-white light:text-black transition-colors duration-300">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] dark:text-white light:bg-white light:text-black transition-colors duration-300">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}