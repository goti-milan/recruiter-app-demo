import Homeicon from "@/components/layouts/main/svgs/Homeicon";
import InfoIcon from "@/components/layouts/main/svgs/InfoIcon";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";
import { SaralInfoModal } from "@/components/ui/saral-ai-popup/info-modal/InfoModal";
import { PricingModal } from "@/components/ui/saral-ai-popup/pricing-modal/PricingModal";
import { SupportModal } from "@/components/ui/saral-ai-popup/support-modal/SupportModal";
import {
  DASHBOARD,
  LOGIN,
  SARAL_AI_LINKEDIN_CAMPAIGN,
  SARAL_AI_NEW_CHAT,
  SARAL_AI_RESULT,
  SARAL_AI_SAVED_CAMPAIGNS,
} from "@/routes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import ColoredLogo from "/src/assets/svg/saral-ai/logo/LogoColor.webp";
import LinkdinCampaign from "@/assets/svg/saral-ai/linkdin-campaign/LinkdinCampaign";
import SavedProfiles from "@/assets/svg/saral-ai/saved-profiles/SavedProfiles";
import NewChat from "@/assets/svg/saral-ai/new-chat/NewChat";
import SearchBar from "@/assets/svg/saral-ai/search-bar/SearchBar";
import SendPrompt from "@/assets/svg/saral-ai/send-prompt/SendPrompt";
import Rephrase from "@/assets/svg/saral-ai/rephrase/Rephrase";
import Support from "@/assets/svg/saral-ai/support/Support";
import CandidateCard from "@/components/ui/candidate-card/CandidateCard";
import {
  enhancePrompt,
  getSavedProfilesCount,
  getSearchHistoryResults,
  SavedProfileCountResponse,
  SearchHistoryByIdResponse,
  searchProfiles,
  SearchProfilesResponse,
} from "@/helpers/apis/saral-ai.ts";
import RecentSearchTab from "@/components/ui/recent-search/RecentSearch";
import SavedProfilesTab from "@/components/ui/saved-profiles/SavedProfiles";
import ToggleSVG from "@/assets/svg/saral-ai/toggle/Toggle";
import { calculateExperience } from "@/helpers/experience-counter";
import SkeletonCard from "@/components/ui/skeleton/Skeleton";
import SaralLoader from "@/components/ui/loader/SaralLoader";
import { getAuthorizedUserId } from "@/helpers/authorization";
import SearchChartModal from "@/components/ui/saral-ai-popup/search-chat/SearchChat";

interface CandidateData {
  id: number;
  name: string;
  initials: string;
  position: string;
  experience: string;
  location: string;
  assessmentScore?: number;
  profileUrl?: string;
}

export default function SaralPromptScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [inpValue, setInpValue] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSupportModal, setIsSupportModal] = useState(false);
  const [isLinkedinCampaign, setIsLinkedinCampaign] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHandleError, setIsHandleError] = useState(false);
  const [savedProfileCount, setSavedProfileCount] = useState<number>(0);
  const [SkeletonLoading, setSkeletonLoading] = useState(false);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [animatingText, setAnimatingText] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [authorizedUserId, setAutorizedUserId] = useState<string>("");
  const [linkdinCandidateData, setLinkdinCandidateData] =
    useState<CandidateData | null>(null);
  const [isSearchChartOpen, setIsSearchChartOpen] = useState(false);

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const { id: recentSearchId } = useParams();

  type ResultData =
    | { type: "profiles"; data: SearchProfilesResponse }
    | { type: "history"; data: SearchHistoryByIdResponse }
    | null;

  const [results, setResults] = useState<ResultData>(null);

  const fetchHistoryData = async (recentSearchId: string) => {
    try {
      setIsHandleError(false);
      setSkeletonLoading(true);
      const data: SearchHistoryByIdResponse = await getSearchHistoryResults(
        authorizedUserId,
        recentSearchId
      );
      setResults({ type: "history", data });
      setInpValue(data.data?.[0]?.query_text);
    } catch (error) {
      setIsHandleError(true);
      setResults(null);
      setInpValue;
      console.error("Error fetching search history results:", error);
    } finally {
      setSkeletonLoading(false);
    }
  };

  useEffect(() => {
    if (recentSearchId) {
      fetchHistoryData(recentSearchId);
    }
  }, [recentSearchId]);

  type Candidate = {
    id: number;
    name: string;
    initials: string;
    position: string;
    experience: string;
    location: string;
    profileUrl?: string;
    assessmentScore?: number;
  };

  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;
  const data = location.state?.data;

  useEffect(() => {
    if (data) {
      setResults({ type: "profiles", data });
      setInpValue(query);
    }
  }, [data, query]);

  const lastPath = location.pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
    setIsLinkedinCampaign(lastPath === "linkdin-campaign");
    setIsNewChat(lastPath === "new");
    setIsResult(lastPath === "result");
    setIsSaved(lastPath === "saved-campaigns");
    if (lastPath === "new") {
      setIsHandleError(false);
    }
    if (lastPath === "linkdin-campaign" && location?.state?.candidate) {
      setLinkdinCandidateData(location.state.candidate);
    }
  }, [location]);

  useEffect(() => {
    if (lastPath === "new") {
      setIsNewChat(true);
      setIsLinkedinCampaign(false);
      setIsSaved(false);
      setIsResult(false);
      setMoved(false);
    }
  }, [lastPath]);

  useEffect(() => {
    if (!query) {
      navigate(location.pathname);
    }
  }, [query, navigate]);

  useEffect(() => {
    if (!results && lastPath === "result") {
      navigate(SARAL_AI_NEW_CHAT);
    }
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnhanceSearch = async () => {
    if (inpValue !== "" && inpValue) {
      try {
        setIsRephrasing(true);
        const response = await enhancePrompt(authorizedUserId, inpValue);
        if (response.success) {
          // Animate text change like in PromptScreen
          setAnimatingText(true);
          setTimeout(() => {
            setInpValue(response.enhanced_query);
            setAnimatingText(false);
          }, 400);
        }
      } catch (error) {
        console.error("Error enhancing search:", error);
      } finally {
        setIsRephrasing(false);
      }
    }
  };

  const SavedProfileCount = async () => {
    try {
      const response: SavedProfileCountResponse = await getSavedProfilesCount(
        authorizedUserId
      );
      setSavedProfileCount(response.total);
    } catch (error) {
      console.error("Error enhancing search:", error);
    }
  };

  useEffect(() => {
    if (authorizedUserId) {
      SavedProfileCount();
    }
  }, [authorizedUserId]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inpValue !== "" && inpValue) {
      e.preventDefault();

      fetchProfiles(inpValue, 1);
    }
  };

  const handleOnClick = async () => {
    if (inpValue !== "" && inpValue) {
      fetchProfiles(inpValue, 1);
    }
  };

  const fetchProfiles = async (
    query: string,
    page: number = 1,
    isLoadMore: boolean = false
  ) => {
    try {
      setIsHandleError(false);
      setIsSending(true);
      if (isLoadMore) {
        setIsLoadingMore(true);
      }

      const response: SearchProfilesResponse = await searchProfiles(
        authorizedUserId,
        query,
        page
      );

      if (response.success) {
        if (!isLoadMore) {
          // First search or new search
          navigate(SARAL_AI_RESULT);
          setMoved(true);
          inputRef.current?.blur();
          setResults({ type: "profiles", data: response });
          setAllResults(response.matched_profiles);
        } else {
          // Load more - append new results
          const updatedResults = [...allResults, ...response.matched_profiles];
          setAllResults(updatedResults);
          const updatedResponse = {
            ...response,
            matched_profiles: updatedResults,
          };
          setResults({ type: "profiles", data: updatedResponse });
        }

        // Pagination states
        setCurrentPage(response.current_page);
      }

      if (response.matched_profiles.length === 0 && !isLoadMore) {
        setIsHandleError(true);
      }
    } catch (error) {
      setIsHandleError(true);
      console.error("Error searching profiles:", error);
    } finally {
      if (isLoadMore) {
        setIsLoadingMore(false);
      } else {
        setIsSending(false); // Stop sending animation for initial search
      }
    }
  };

  const handleLoadMore = async () => {
    if (inpValue && !isLoadingMore) {
      await fetchProfiles(inpValue, currentPage + 1, true);
    }
  };

  return (
    <div className="min-h-screen font-manrope flex bg-[#f9f1ff]">
      {/* Mobile Menu Button - Always show on mobile */}
      {!isOpen && (
        <button
          onClick={handleToggleSidebar}
          className="lg:hidden fixed top-5.5 left-4 z-50 text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Desktop Toggle Button - Only show when sidebar is collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={handleToggleSidebar}
          className="lg:block fixed top-4 left-4 z-[9999] text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-[#00000080] bg-opacity-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-[#FFFFFF] 
          border-r-[2px] border-[#F7EEFF] p-6 
          flex flex-col justify-between h-screen z-40 
          transition-all duration-300 ease-in-out
          ${
            // Mobile behavior
            isOpen
              ? "fixed top-0 left-0 translate-x-0 w-80"
              : "fixed top-0 -translate-x-full w-80"
          }
          ${
            // Desktop behavior - key changes here
            sidebarCollapsed
              ? "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-0 lg:min-w-0 lg:overflow-hidden lg:p-0 lg:border-0"
              : "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-[320px] lg:min-w-[320px]"
          }
        `}
      >
        {/* Only show content when not collapsed on desktop */}
        <div
          className={`${
            sidebarCollapsed ? "lg:hidden" : ""
          } flex-1 overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-8">
            {/* Left: Image */}
            <button className="p-2 rounded-xl w-[40px] h-[40px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
              <img
                src={ColoredLogo}
                alt="coloredLogo"
                className="aspect-square w-full"
              />
            </button>

            {/* Right: Toggle SVG Icon - Only show on desktop when sidebar is open */}
            <div
              className="text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:block hidden"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>

            {/* Mobile: Toggle button on right side when sidebar is open */}
            <div
              className="text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:hidden block"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>
          </div>

          {/* Menu */}
          <div className="mt-6 flex flex-col gap-1">
            <button
              className={`flex items-center ${
                lastPath === "new"
                  ? "bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#886F9D]"
                  : ""
              } text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium`}
              onClick={() => {
                navigate(SARAL_AI_NEW_CHAT);
                setIsHandleError(false);
                setResults(null);
                setAllResults([]);
                setInpValue(null);
              }}
            >
              {/* Saved Profiles icon */}
              <NewChat />
              <span>New Chat</span>
            </button>

            <button
              className={`flex items-center ${
                lastPath === "search"
                  ? "bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#886F9D]"
                  : ""
              } text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium`}
            >
              {/* Saved Profiles icon */}
              <SearchBar />
              <span>Search</span>
            </button>

            <button
              className={`flex items-center ${
                lastPath === "saved-campaigns"
                  ? "bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#886F9D]"
                  : ""
              } text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium`}
              onClick={() => navigate(SARAL_AI_SAVED_CAMPAIGNS)}
            >
              {/* Saved Profiles icon */}
              <SavedProfiles />
              <span>Saved Profiles</span>
              <span
                className={`ml-auto text-xs bg-[#dcd4e0] h-6x text-base
 px-2 py-0.5 rounded-sm  ${
   lastPath === "saved-campaigns"
     ? "bg-[#ffffff] text-[#000000]"
     : "text-[deepViolet]"
 } font-medium`}
              >
                {savedProfileCount}
              </span>
            </button>

            <button
              className={`flex items-center ${
                lastPath === "linkdin-campaign"
                  ? " bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#886F9D]"
                  : "text-[#2d1b4a]"
              } gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium`}
              onClick={() => navigate(SARAL_AI_LINKEDIN_CAMPAIGN)}
            >
              {/* LinkedIn Campaign icon */}
              <LinkdinCampaign />

              <span>LinkedIn Campaign</span>
            </button>
          </div>

          {/* Recent Searches */}
          <RecentSearchTab
            setIsSearchChartOpen={setIsSearchChartOpen}
            setInpValue={setInpValue}
          />
        </div>

        {/* Plan/Credits */}
        <div className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
          <div className="flex items-center justify-between mb-3 text-[#6b54a3] text-sm h-[30px] px-3 rounded-lg transition-all duration-200 font-medium hover:bg-[rgba(107,84,163,0.05)] cursor-pointer">
            <span>Credits</span>
            <span className="font-bold text-[#4a3761]">12/25</span>
          </div>

          <div className="w-full rounded-xl p-[1.5px] bg-[#3F1562]">
            <button
              className="w-full rounded-xl outline-none bg-[#3F1562] text-white py-2 font-semibold hover:bg-white/90 hover:text-[#3F1562] transition"
              onClick={() => setIsPricingOpen(true)}
            >
              <span>Upgrade Plan</span>
            </button>
          </div>

          <button
            className="w-full rounded-xl outline-none py-2 mt-2 flex items-center justify-center gap-2 text-[#3F1462] text-base font-semibold hover:bg-white/20 transition"
            onClick={() => setIsSupportModal(true)}
          >
            <Support />
            Support
          </button>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-0" : ""
        }`}
      >
        <div className="sticky top-0 z-0 flex items-center justify-end p-4 sm:p-6 lg:px-8 pt-6 lg:pt-6">
          {/* Info Icon */}
          <button
            className="group flex outline-none items-center bg-purple-50 justify-center mx-4 w-[33px] h-[33px] hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsInfoOpen(true)}
          >
            <InfoIcon />
          </button>

          {/* Home Section */}
          <button
            onClick={() => navigate(DASHBOARD)}
            className="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Homeicon />
            <span className="text-purple-700 font-medium group-hover:text-purple-800 text-sm sm:text-base">
              Home
            </span>
          </button>
        </div>

        {/* Centered content area */}
        {!isLinkedinCampaign && !isSaved && (
          <div className="flex-1 flex flex-col w-full items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl text-center mb-6 sm:mb-8">
              {isNewChat && !results && (
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl  md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3F1562] mb-3 sm:mb-4 tracking-tight leading-tight">
                      What Can I Help You With?
                    </h1>
                    <p className="text-[#1F2937] opacity-40 font-medium text-sm sm:text-base lg:text-md tracking-wide px-4">
                      Describe your ideal candidate and let AI find the perfect
                      matches
                    </p>
                  </div>
                </>
              )}
            </div>

            <div
              className={`w-full ${
                results || isResult || SkeletonLoading
                  ? "max-w-7xl"
                  : "max-w-3xl"
              } flex flex-col items-center gap-3 sm:gap-4`}
            >
              {/* Input field */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: moved ? -35 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div
                  className={`sticky top-30 ${
                    sidebarCollapsed ? "z-50" : "z-0"
                  } w-[full] flex flex-col sm:flex-row items-stretch sm:items-center bg-white/80 border border-[#DF6789] rounded-full p-3 sm:p-4 shadow-sm gap-2 sm:gap-0`}
                >
                  {/* Animated Input with AnimatePresence */}
                  <AnimatePresence mode="wait">
                    <motion.input
                      key={animatingText ? "animating" : "normal"}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 min-w-0 bg-transparent outline-none text-base sm:text-lg  placeholder-[#A6A6A6] truncate"
                      placeholder="when an unknown printer took a galley of type and scrambled."
                      autoFocus
                      ref={inputRef}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setInpValue(e.target.value)}
                      value={inpValue ?? ""}
                      disabled={isRephrasing}
                    />
                  </AnimatePresence>

                  <div className="flex items-center gap-2 justify-end">
                    {/* Rephrase Button with rotation animation */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="rounded-xl text-[#3D1562] opacity-70 px-3 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs sm:text-sm flex items-center gap-2 disabled:opacity-50 disabled:!cursor-not-allowed"
                      onClick={handleEnhanceSearch}
                      disabled={
                        !inpValue || inpValue.trim() === "" || isRephrasing
                      }
                    >
                      <motion.div
                        animate={isRephrasing ? { rotate: 360 } : { rotate: 0 }}
                        transition={
                          isRephrasing
                            ? { repeat: Infinity, duration: 3, ease: "linear" }
                            : {}
                        }
                      >
                        <Rephrase />
                      </motion.div>
                      Rephrase
                    </motion.button>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOnClick}
                      disabled={
                        !inpValue || inpValue.trim() === "" || isRephrasing
                      }
                      className="rounded-2xl p-2.5 sm:p-3 from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md disabled:opacity-50 disabled:!cursor-not-allowed"
                    >
                      {isSending ? <SaralLoader /> : <SendPrompt />}
                    </motion.button>
                  </div>
                </div>

                {/* Set result cards */}
                <div className="max-h-[67vh] mt-2 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-2 xl:grid-cols-3 2xl-grid-cols-4 gap-6 justify-items-center">
                    {SkeletonLoading
                      ? Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={`skeleton-${index}`}
                            className="w-full flex justify-center"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <SkeletonCard />
                          </div>
                        ))
                      : results?.data &&
                        (results.type === "history"
                          ? results.data.data
                          : results.data.matched_profiles
                        )?.map((profile: any, index: number) => {
                          const experienceData =
                            results.type === "history"
                              ? JSON.parse(profile.experience || "[]")
                              : profile.experiences || [];
                          const overallExperience =
                            calculateExperience(experienceData);
                          const candidate: Candidate = {
                            id: profile.id,
                            name:
                              results.type === "history"
                                ? profile.name
                                : profile.fullName,
                            initials:
                              (results.type === "history"
                                ? profile.name
                                : profile.fullName)?.[0] ?? "",
                            position: profile.headline,
                            experience: overallExperience.formatted,
                            location:
                              results.type === "history"
                                ? profile.location
                                : profile.addressWithCountry,
                            profileUrl:
                              results.type === "history"
                                ? profile.linkedin_url
                                : profile.linkedinUrl,
                            assessmentScore: profile.score ?? 0,
                          };

                          return (
                            <motion.div
                              key={candidate.id}
                              initial={{ opacity: 0, y: 30, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                delay: index * 0.15,
                                duration: 0.5,
                                ease: "easeOut",
                              }}
                              className="flex justify-center flex-wrap"
                            >
                              <CandidateCard
                                candidate={candidate}
                                SavedProfileCount={() => SavedProfileCount()}
                              />
                            </motion.div>
                          );
                        })}
                  </div>

                  {/* Load More Button */}
                  {results && results.type === "profiles" && (
                    <div className="flex justify-center mt-8 mb-4">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-8 py-2 bg-transparent border-2 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          borderImage:
                            "linear-gradient(to right, #de7fdf, #a881fa) 1",
                          background:
                            "linear-gradient(to right, #a881fa, #de7fdf)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {isLoadingMore ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#de7fdf] border-t-transparent rounded-full animate-spin"></div>
                            Loading...
                          </div>
                        ) : (
                          `Load More`
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>

              {isHandleError && (
                <AnimatePresence>
                  <motion.div
                    key="error-box"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center py-8 px-4"
                  >
                    <p className="text-[#3D1562] font-semibold text-lg sm:text-xl mb-2">
                      We couldn't find any results.
                    </p>
                    <p className="text-[#3D1562] text-sm sm:text-base">
                      Try again using another prompt.
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
        {isLinkedinCampaign && (
          <div className="flex-1">
            <div className="flex justify-between h-[30px] items-center px-2 sm:px-3 lg:px-4">
              <motion.h3
                className="
        text-[#3F1562] font-Manrope font-semibold 
        my-4 sm:my-6 lg:my-8 
        mx-4 sm:mx-8 md:mx-12 lg:mx-14
      "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                AI message generator
              </motion.h3>

              <span className="text-xs sm:text-sm md:text-base text-purple-800 pr-2 sm:pr-4 md:pr-6 lg:pr-[35px]">
                1 Candidates Selected
              </span>
            </div>

            {/* Editor */}
            <motion.div
              className="m-2 sm:m-4 lg:m-6 sm:flex sm:justify-start sm:items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full max-w-2xl">
                {linkdinCandidateData ? (
                  <RichTextEditor
                    candidate_name={`${linkdinCandidateData.name}`}
                    experience={`${linkdinCandidateData.experience}`}
                    skills={`${linkdinCandidateData.position}`}
                  />
                ) : (
                  <div className="h-[80vh] w-[75vw] flex items-center justify-center">
                    <p>No selected candidate</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        {isSaved && (
          <div className="flex-1 flex justify-center items-center">
            <SavedProfilesTab setSavedProfileCount={setSavedProfileCount} />
          </div>
        )}
        {/* Footer */}
        <footer className="text-center p-4 sm:p-6 text-xs sm:text-[13px] text-[royalPurple] opacity-50 px-4">
          Saral AI simplifies sourcing, but human judgment is still key
        </footer>
      </main>

      <SaralInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
      <SupportModal
        isOpen={isSupportModal}
        onClose={() => setIsSupportModal(false)}
      />
      <SearchChartModal
        isOpen={isSearchChartOpen}
        onClose={() => setIsSearchChartOpen(false)}
      />
    </div>
  );
}
