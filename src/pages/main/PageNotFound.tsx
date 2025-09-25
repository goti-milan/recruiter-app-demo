import AboutUsArrow from "@/assets/svg/page-not-found/AboutUsArrow";
import Astronaught from "@/assets/svg/page-not-found/Astronaught";
import Star from "@/assets/svg/page-not-found/Star";
import React from "react";

const PageNotFound: React.FC = () => {
  return (

    <div className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-50 to-purple-50 overflow-hidden">

      <div className="absolute h-[300px] w-[300px] bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] left-0 md:-top-40 md:-left-40"></div>
      <div className="absolute h-[300px] w-[300px] bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)] right-0 md:top-40 md:-right-40"></div>

      <div className="absolute flex items-center justify-center">
        <div className='absolute h-300 w-300 border border-[#DF6789] rounded-full'> </div>
        <div className='absolute h-200 w-200 border border-[#DF6789] rounded-full'>
        <div className="absolute z-10 top-40 left-0"><Star width={70} /><Star width={30} /></div>
        <div className="absolute z-10 top-1/2 -right-30"><Star width={60} /></div></div>
        <div className='absolute h-250 w-250 border border-[#DF6789] rounded-full'></div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2">
        <Astronaught />
      </div>
      <h1 className="relative z-10 text-[100px] mb-60 md:text-[200px] lg:text-[400px] font-bold text-[#363636]  font-manrope">
        404
      </h1>
      <h1 className="absolute  text-[100px] mb-55 left-100 md:text-[200px] lg:text-[400px] font-bold bg-gradient-to-t from-[#E4C5FF] to-[#FFC7D7] bg-clip-text text-transparent font-manrope">
        404
      </h1>

      <div className="absolute bottom-20 right-100">
        <AboutUsArrow />
      </div>

      <p className="absolute bottom-30 text-xl md:text-5xl font-semibold text-[#DF6789]">
        Oops!
      </p>

      <a
        href="/"
        className="absolute bottom-20 flex items-center gap-2 text-lg font-semibold text-gray-800 border-b-2 border-gray-800 hover:text-[#DF6789] hover:border-[#DF6789] transition-all duration-300"
      >
        ⬅️ Go Home
      </a>
    </div>
  );
};

export default PageNotFound;


