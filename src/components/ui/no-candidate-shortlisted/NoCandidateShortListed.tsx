import { SARAL_AI_NEW_CHAT } from "@/routes";
import { useNavigate } from "react-router";

export default function NoCandidatesShortlisted() {

    const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 sm:py-16 lg:py-20 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 mb-3 sm:mb-4">
        No Candidates Shortlisted Yet
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg">
        Search for candidates and select them to build your shortlist.
      </p>


        <div className="w-48 rounded-xl p-[1.5px] bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9]">
            <button
              className="w-full rounded-xl outline-none bg-white py-2 font-semibold hover:bg-white/90 transition"
              onClick={()=> navigate(SARAL_AI_NEW_CHAT)}
            >
               <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent font-semibold">
    Start Searching
  </span>
            </button>
          </div>


    </div>
  );
}
