import { SARAL_AI_NEW_CHAT } from "@/routes";
import { useNavigate } from "react-router";

export default function NoCandidatesShortlisted() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[80vh]  items-center justify-center text-center py-10 sm:py-16 lg:py-20 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F1562]  sm:mb-4">
        No Candidates Shortlisted Yet
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-[#886F9D] mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg">
        Search for candidates and select them to build your shortlist.
      </p>

      <button
        className="w-48 rounded-xl hover:outline bg-[#3F1562] text-white hover:text-[#3F1562] hover:border-[#3F1562] hover:bg-white py-2 font-semibold"
        onClick={() => navigate(SARAL_AI_NEW_CHAT)}
      >
        Start Searching
      </button>
    </div>
  );
}
