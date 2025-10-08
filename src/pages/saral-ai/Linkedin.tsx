import NoCandidatesCampaign from "@/components/ui/no-candidate-select/NoCandidateSelect";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";

const Linkedin = ({ savedProfilesData }: any) => {
  return (
    <div className="m-2 w-full flex items-start justify-center mx-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      <div className="max-w-[1440px] flex flex-col justify-items-center items-center">
        {!!savedProfilesData?.length && (
          <div className="m-auto flex items-center w-100% justify-between rounded-2xl p-3 sm:p-4 bg-transparent container">
            <h3 className="text-[#3F1562] font-Manrope font-semibold ">
              AI message generator
            </h3>

            <p className=" font-Manrope font-semibold  m-0 px-0 rounded-xl py-[1.5px]  text-[#3F1562]">
              {savedProfilesData?.length} Candidates Selected
            </p>
          </div>
        )}

        {savedProfilesData?.length ? (
          <div className="m-auto p-2 h-full grid grid-cols-1 max-w-[1440px] lg:grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center grid-1335-2 grid-1280-1320-2 grid-640-713-1">
            {savedProfilesData.map((candidate: any, index: number) => (
              <div key={index} className="w-full">
                <RichTextEditor
                  candidate={candidate}
                  candidate_name={candidate.name}
                  experience={candidate.experience}
                  skills={candidate.skills}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoCandidatesCampaign />
        )}
      </div>
    </div>
  );
};

export default Linkedin;
