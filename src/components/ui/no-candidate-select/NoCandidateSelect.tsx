import { SARAL_AI_NEW_CHAT } from "@/routes";
import { useNavigate } from "react-router";

export default function NoCandidatesCampaign() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F1562]  sm:mb-4">
        No Candidates Selected For Campaign
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-[#886F9D] mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg">
        Search for candidates and select them to build your shortlist.
      </p>

      <div className="flex gap-4">
        {/* Search Candidates Button */}
        <button
          className="w-48 rounded-xl hover:outline bg-[#3F1562] text-white hover:text-[#3F1562] hover:border-[#3F1562] hover:bg-white py-2 font-semibold"
          onClick={() => navigate(SARAL_AI_NEW_CHAT)}
        >
          Search Candidate
        </button>

        <button
          className="w-48 rounded-xl hover:outline bg-[#3F1562] text-white hover:text-[#3F1562] hover:border-[#3F1562]  hover:bg-white py-2 font-semibold"
          onClick={() => navigate("/saral-ai/saved-campaigns")}
        >
          View Shortlist
        </button>
      </div>
    </div>
  );
}
