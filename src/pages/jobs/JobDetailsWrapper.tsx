import { JOBS } from "@/routes";
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

const JobDetailsWrapper: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-start gap-2 bg-white py-2 px-4 rounded-xl mb-2">
        <Link
          to={JOBS}
          replace
          className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
        >
          <i className="pi pi-times"></i>
        </Link>
        <NavLink
          className={({ isActive }) =>
            twMerge(
              "px-4 py-2 text-[#8C8C8C] font-medium border border-[#8C8C8C] rounded-full transition-colors duration-300 ease-in-out",
              isActive && "text-primary border-primary",
            )
          }
          to="applications"
        >
          Candidates
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            twMerge(
              "px-4 py-2 text-[#8C8C8C] font-medium border border-[#8C8C8C] rounded-full transition-colors duration-300 ease-in-out",
              isActive && "text-primary border-primary",
            )
          }
          to="."
          end
        >
          Details
        </NavLink>
      </div>

      <div className="w-full h-full max-h-[calc(100%-60px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default JobDetailsWrapper;
