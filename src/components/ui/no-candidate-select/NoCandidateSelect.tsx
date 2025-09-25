export default function NoCandidatesCampaign() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-purple-900 mb-8">
        No Candidates Selected For Campaign
      </h1>
      
      <div className="flex gap-4">
        {/* Search Candidates Button */}
        <div className="w-48 rounded-xl p-[1.5px] bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9]">
          <button
            className="w-full rounded-xl outline-none bg-white py-2 font-semibold hover:bg-white/90 transition"
            onClick={() => {
              console.log('Search Candidates clicked');
            }}
          >
            <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent font-semibold">
              Search Candidates
            </span>
          </button>
        </div>

        {/* View Shortlist Button */}
        <div className="w-48 rounded-xl p-[1.5px] bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9]">
          <button
            className="w-full rounded-xl outline-none bg-white py-2 font-semibold hover:bg-white/90 transition"
            onClick={() => {
              console.log('View Shortlist clicked');
            }}
          >
            <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent font-semibold">
              View Shortlist
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}