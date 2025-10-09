import NoCandidatesCampaign from "@/components/ui/no-candidate-select/NoCandidateSelect";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";

const Linkedin = ({ savedProfilesData }: any) => {
  return (
    <div className="w-full flex justify-center items-start mx-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {savedProfilesData?.length ? (
        <div className="max-w-[1440px] flex flex-col gap-3 p-3 mt-2 justify-items-center items-center">
          <div className=" flex items-center justify-between rounded-2xl xl:p-0  sm:p-4 w-full">
            <h3 className="text-[#3F1562] font-Manrope font-semibold ">
              AI message generator
            </h3>

            <p className=" font-Manrope font-semibold  m-0 px-0 rounded-xl py-[1.5px]  text-[#3F1562]">
              {savedProfilesData?.length} Candidates Selected
            </p>
          </div>

          {/* Profiles Grid - Maintains current layout */}
          <div className=" h-full grid grid-cols-1 max-w-[1440px] sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center grid-1335-2 grid-1280-1320-2 grid-640-713-1">
            {savedProfilesData.map((candidate: any, index: number) => (
              <div key={index} className="">
                <RichTextEditor
                  candidate={candidate}
                  candidate_name={candidate.name}
                  experience={candidate.experience}
                  skills={candidate.skills}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoCandidatesCampaign />
      )}
    </div>
  );
};

export default Linkedin;
