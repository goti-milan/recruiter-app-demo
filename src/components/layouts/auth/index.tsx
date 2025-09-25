import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AuthBanner, AuthBg } from "../../../assets/images";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="container flex justify-center h-full gap-20 p-8 font-manrope">
        <div
          style={{ backgroundImage: `url(${AuthBg})` }}
          className="bg-no-repeat bg-contain bg-center lg:flex hidden flex-col justify-items-start items-start h-full rounded-3xl max-w-[50%] aspect-[0.88] bg-[#3F1562]/90 p-10 text-white"
        >
          <div className="h-full flex flex-col gap-10">
            <p className="text-4xl leading-14">
              Your perfect <span className="text-[#C37AFF] font-semibold text-5xl">Hire</span>
              <br />
              is just a few clicks away
            </p>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={AuthBanner}
                alt="authentication"
                decoding="async"
                fetchPriority="high"
                title="Let's get started"
                className="aspect-[1.33] w-full"
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col justify-center items-center lg:w-1/2 w-full lg:h-auto h-screen">
          {!(pathname === "/auth" || pathname.includes("register")) && (
            <div
              className="absolute md:left-14 left-0 md:top-14 top-0 flex items-center justify-center cursor-pointer border border-primary/40 rounded-full p-2 w-10 h-10"
              onClick={() => navigate(-1)}
            >
              <i className="pi pi-chevron-left text-xs"></i>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
