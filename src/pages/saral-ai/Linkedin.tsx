import NoCandidatesCampaign from "@/components/ui/no-candidate-select/NoCandidateSelect";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";

const Linkedin = ({ savedProfilesData, sidebarCollapsed }: any) => {
  return (
    <div className="m-2 w-full mx-auto max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {!!savedProfilesData?.length && (
        <div className="m-auto flex items-center max-w-[1440px] justify-between rounded-2xl p-3 sm:p-4 bg-transparent container">
          <h3
            className="text-[#3F1562] font-Manrope font-semibold pl-3"
          >
            AI message generator
          </h3>

          <p className="w-full font-Manrope font-semibold max-w-[11rem] m-0 px-0 rounded-xl py-[1.5px]  text-[#3F1562]">
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
  );
};

export default Linkedin;
