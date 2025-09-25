import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CandidateCard from "../candidate-card/CandidateCard";
import {
  deleteSavedProfile,
  getSavedProfiles,
  getSavedProfilesCount,
  SavedProfile,
  SavedProfileCountResponse,
  SavedProfilesResponse,
} from "@/helpers/apis/saral-ai.ts";
import NoCandidatesShortlisted from "../no-candidate-shortlisted/NoCandidateShortListed";
import { calculateExperience } from "@/helpers/experience-counter";
import SaralLoader from "../loader/SaralLoader";
import RegenerateMessageSvg from "@/assets/svg/saral-ai/regenerate-message/RegenerateMessageSvg";
import { getAuthorizedUserId } from "@/helpers/authorization.ts";
import { LOGIN } from "@/routes";
import { useNavigate } from "react-router";

interface SavedProfilesTabProps {
  setSavedProfileCount: Dispatch<SetStateAction<number>>;
}

const SavedProfilesTab: React.FC<SavedProfilesTabProps> = ({
  setSavedProfileCount,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [delLoading, setDelLoading] = useState(false);

  const [authorizedUserId, setAutorizedUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
      return;
    }
    setAutorizedUserId(userId);
  }, []);

  useEffect(() => {
    if (authorizedUserId) {
      fetchProfiles(1, false);
      setCurrentPage(1);
    }
  }, [authorizedUserId]); // depends on authorizedUserId

  const fetchProfiles = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProfiles([]);
      }
      const res: SavedProfilesResponse = await getSavedProfiles(
        authorizedUserId,
        page,
        limit
      );

      if (append) {
        setProfiles((prev) => [...prev, ...(res.data || [])]);
      } else {
        setProfiles(res.data || []);
      }

      setCurrentPage(res.page || 1);
    } catch (error) {
      console.error("Error fetching saved profiles:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchProfiles(currentPage + 1, true);
  };

  const handleDelete = async (id: number) => {
    setDelLoading(true);
    try {
      const res = await deleteSavedProfile(authorizedUserId, id);

      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
      const response: SavedProfileCountResponse = await getSavedProfilesCount(
        authorizedUserId
      );
      setSavedProfileCount(response.total);

      console.log("Delete response:", res.message);
    } catch (err: any) {
      console.error("Error deleting profile:", err);
    } finally {
      setDelLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader isVisible={loading} />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <NoCandidatesShortlisted />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      <div className="flex items-start justify-between rounded-2xl p-3 sm:p-4 bg-transparent">
        <span className="text-base sm:text-lg text-[#3D1562] font-medium">
          {profiles.length} Candidates Selected
        </span>
       <div className="w-full max-w-[12rem] rounded-xl p-[1.5px] bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9]">
  <button className="w-full rounded-xl outline-none bg-[#eee7fa] py-2 font-semibold hover:bg-white/90 transition">
    <span className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent text-sm sm:text-base">
      <RegenerateMessageSvg className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">Generate Message</span>
    </span>
  </button>
</div>
      </div>

      {/* Profiles Grid - Maintains current layout */}
      <div className="m-auto grid grid-cols-1 max-w-[1440px] sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
        {profiles.map((profile, i) => {
          const experienceData = JSON.parse(profile.experience || "[]");
          const overallExperience = calculateExperience(experienceData);

          const candidate = {
            id: profile.id,
            name: profile.name,
            initials: profile.name
              .split(" ")
              .map((n) => n[0])
              .join(""),
            position: profile.headline ?? "N/A",
            experience: overallExperience.formatted,
            location: profile.location ?? "Unknown",
            assessmentScore: profile.score,
            profileUrl: profile.linkedin_url ?? "",
          };

          return (
            <CandidateCard
              key={profile.id}
              candidate={candidate}
              initialSavedState={true}
              animationDelay={i * 0.1}
              maxWidth={375}
              isForSavedList={true}
              handleDelete={() => handleDelete(profile.id)}
              delLoading={delLoading}
            />
          );
        })}
      </div>

      {/* Load More Button - Fixed condition */}
      {true && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-2 bg-transparent rounded-xl border-2 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderImage: "linear-gradient(to right, #de7fdf, #a881fa) 1",
              background: "linear-gradient(to right, #a881fa, #de7fdf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {loadingMore ? (
              <div className="flex items-center">
                <SaralLoader />
                <span className="mx-2">Loading...</span>
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedProfilesTab;
