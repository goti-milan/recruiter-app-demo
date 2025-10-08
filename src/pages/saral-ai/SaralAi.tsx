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
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import ColoredLogo from "/src/assets/images/main/saral-recruiter-logo.webp";
import LinkdinCampaign from "@/assets/svg/saral-ai/linkdin-campaign/LinkdinCampaign";
import SavedProfiles from "@/assets/svg/saral-ai/saved-profiles/SavedProfiles";
import SendPrompt from "@/assets/svg/saral-ai/send-prompt/SendPrompt";
import Rephrase from "@/assets/svg/saral-ai/rephrase/Rephrase";
import Support from "@/assets/svg/saral-ai/support/Support";
import CandidateCard from "@/components/ui/candidate-card/CandidateCard";
import {
  enhancePrompt,
  getSavedProfilesCount,
  getSearchHistoryResults,
  SavedProfile,
  SavedProfileCountResponse,
  SearchHistoryByIdResponse,
  searchProfiles,
  SearchProfilesResponse,
} from "@/helpers/apis/saral-ai.ts";
import RecentSearchTab from "@/components/ui/recent-search/RecentSearch";
import SavedProfilesTab from "@/components/ui/saved-profiles/SavedProfiles";
import { calculateExperience } from "@/helpers/experience-counter";
import SkeletonCard from "@/components/ui/skeleton/Skeleton";
import SaralLoader from "@/components/ui/loader/SaralLoader";
import { getAuthorizedUserId } from "@/helpers/authorization";
import SearchChartModal from "@/components/ui/saral-ai-popup/search-chat/SearchChat";
import PremiumSvg from "@/assets/svg/saral-ai/premium-svg/PremiumSvg";
import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import { GoHome } from "react-icons/go";
import { GrStatusInfo } from "react-icons/gr";
import { FiSidebar } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import Linkedin from "./Linkedin";
import PaymentModal from "@/components/ui/saral-ai-popup/paymentModal/PaymentModal";

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

type ResultData =
  | { type: "profiles"; data: SearchProfilesResponse }
  | { type: "history"; data: SearchHistoryByIdResponse }
  | null;

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
  const [isSearchChartOpen, setIsSearchChartOpen] = useState(false);
  const [savedProfilesData, setSavedProfilesData] = useState<SavedProfile[]>(
    []
  );
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const { id: recentSearchId } = useParams();

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

  const handleMobileSidebarClose = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
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
          setIsSending(false);
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
          className="lg:hidden fixed top-4.5 left-4 z-999 text-[#3F1562] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <FiSidebar className="text-[#3F1562] text-2xl" />
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
          z-99
          ${
            // Mobile behavior
            isOpen
              ? "fixed top-0 left-0 translate-x-0 w-80"
              : "fixed top-0 -translate-x-full w-80"
          }
          ${
            // Desktop behavior - show icons when collapsed
            sidebarCollapsed
              ? "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-[80px] lg:min-w-[80px] lg:px-3"
              : "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-[320px] lg:min-w-[320px]"
          }
        `}
      >
        {/* Header section - always visible */}
        <div className="flex-1 overflow-hidden">
          <div
            className={`flex items-center justify-between mb-8 ${
              sidebarCollapsed ? "lg:justify-center" : ""
            }`}
          >
            {/* Left: Image */}
            <button
              className="rounded-xl w-[32px] h-[32px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0"
              onClick={sidebarCollapsed ? handleToggleSidebar : undefined}
            >
              <img
                src={ColoredLogo}
                alt="coloredLogo"
                className="aspect-square w-full"
              />
            </button>

            {/* Right: Toggle SVG Icon - Only show on desktop when sidebar is open */}
            <div
              className={`text-[#3F1562] h-[30px] w-[30px] rounded-xl flex  items-center justify-center cursor-pointer  transition-all duration-200 ${
                sidebarCollapsed ? "lg:hidden" : "lg:block"
              } hidden`}
              onClick={handleToggleSidebar}
            >
              {/* <ToggleSVG /> */}
              <FiSidebar className="text-[#3F1562] text-2xl" />
            </div>

            {/* Mobile: Toggle button on right side when sidebar is open */}
            <div
              className="text-[#3F1562] rounded-xl  flex items-center justify-center cursor-pointer hover:bg-[#a490b5d6] transition-all duration-200 lg:hidden block"
              onClick={handleToggleSidebar}
            >
              {/* <ToggleSVG /> */}
              <FiSidebar className="text-[#3F1562] text-2xl" />
            </div>
          </div>

          {/* Menu */}
          <div className="mt-6 flex flex-col gap-1">
            <button
              className={`flex items-center ${
                lastPath === "new"
                  ? "bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#3F1562]"
                  : ""
              } text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium ${
                sidebarCollapsed ? "lg:justify-center lg:px-0" : ""
              }`}
              onClick={() => {
                navigate(SARAL_AI_NEW_CHAT);
                setIsHandleError(false);
                setResults(null);
                setAllResults([]);
                setInpValue(null);
                handleMobileSidebarClose();
              }}
            >
              {/* New Chat icon */}
              {/* <NewChat /> */}
              <BiEdit className="text-2xl" />
              <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
                New Chat
              </span>
            </button>

            <button
              className={`flex items-center ${
                lastPath === "saved-campaigns"
                  ? "bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#3F1562]"
                  : ""
              } text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium ${
                sidebarCollapsed ? "lg:justify-center lg:px-0" : ""
              }`}
              onClick={() => {
                navigate(SARAL_AI_SAVED_CAMPAIGNS);
                handleMobileSidebarClose();
              }}
            >
              {/* Saved Profiles icon */}
              <SavedProfiles />
              <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
                Saved Profiles
              </span>
              <span
                className={`ml-auto text-xs bg-[#dcd4e0] h-6x text-base px-2 py-0.5 rounded-sm ${
                  lastPath === "saved-campaigns"
                    ? "bg-[#ffffff] text-[#000000]"
                    : "text-[deepViolet]"
                } font-medium ${sidebarCollapsed ? "lg:hidden" : ""}`}
              >
                {savedProfileCount}
              </span>
            </button>

            <button
              className={`flex items-center ${
                lastPath === "linkdin-campaign"
                  ? " bg-[#f9f1ffbd] border-2 border-[#684e91] text-[#3F1562]"
                  : "text-[#2d1b4a]"
              } gap-2 py-2 px-2 hover:bg-[#a490b5d6] rounded-lg transition font-medium ${
                sidebarCollapsed ? "lg:justify-center lg:px-0" : ""
              }`}
              onClick={() => {
                navigate(SARAL_AI_LINKEDIN_CAMPAIGN);
                handleMobileSidebarClose();
              }}
            >
              {/* LinkedIn Campaign icon */}
              <LinkdinCampaign />
              <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
                LinkedIn Outreach
              </span>
            </button>

            <button
              className={`flex items-center 
              
                   text-[#2d1b4a]
               gap-2 py-2 px-2 rounded-lg transition font-medium ${
                 sidebarCollapsed ? "lg:justify-center lg:px-0" : ""
               }`}
              onClick={() => sidebarCollapsed && setIsSearchChartOpen(true)}
            >
              {/* LinkedIn Campaign icon */}
              <RecentSearch />
              <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
                Recent Searches
              </span>
            </button>
          </div>

          <div className={`${sidebarCollapsed ? "lg:hidden" : ""} `}>
            <RecentSearchTab
              setIsSearchChartOpen={setIsSearchChartOpen}
              setInpValue={setInpValue}
              handleMobileSidebarClose={() => handleMobileSidebarClose()}
            />
          </div>
        </div>

        {/* Plan/Credits - show minimal version when collapsed */}
        <div
          className={`h-42 flex flex-col justify-end mobile-size ${
            sidebarCollapsed ? "border-t-[2.5px] border-[#3F1562]" : ""
          }`}
        >
          {/* Credits section */}
          <div
            className={`flex items-center bg-[#F5F5F5] justify-between mb-3 text-[#3F1562] text-sm h-[45px] px-3 rounded-lg transition-all duration-200 font-medium hover:bg-[#a490b5d6] cursor-pointer ${
              sidebarCollapsed ? "lg:justify-center lg:px-1" : ""
            }`}
          >
            <span
              className={` font-bold ${sidebarCollapsed ? "lg:hidden" : ""}`}
            >
              Credits
            </span>
            <span
              className={`font-bold text-[#3F1562] ${
                sidebarCollapsed ? "lg:text-xs" : ""
              }`}
            >
              12/25
            </span>
          </div>

          {/* Upgrade button */}
          <div className="w-full rounded-xl p-[1.5px]">
            <button
              className={`w-full ${
                sidebarCollapsed
                  ? "h-[34px] w-[34px] flex justify-center items-center"
                  : "hover:bg-white/90"
              } rounded-xl hover:outline bg-[#3F1562] text-white py-2 font-semibold hover:text-[#3F1562] transition ${
                sidebarCollapsed ? "lg:text-xs lg:py-1" : ""
              }`}
              onClick={() => {
                setIsPricingOpen(true);
                handleMobileSidebarClose();
              }}
            >
              <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
                Upgrade Plan
              </span>
              <span
                className={`${
                  sidebarCollapsed ? "lg:block hidden" : "lg:hidden"
                }`}
              >
                <PremiumSvg />
              </span>
            </button>
          </div>

          {/* Support button */}
          <button
            className={`w-full rounded-xl  py-2 mt-2 flex items-center justify-center gap-2 text-[#3F1462] text-base font-semibold hover:bg-[#a490b5d6] cursor-pointer transition ${
              sidebarCollapsed ? "lg:px-1" : ""
            }`}
            onClick={() => {
              setIsSupportModal(true);
              handleMobileSidebarClose();
            }}
          >
            <Support />
            <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
              Support
            </span>
          </button>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-0" : ""
        }`}
      >
        <div className="sticky top-0 h-[74px] z-50 flex items-center justify-end px-4 sm:px-6 lg:px-8 py-3">
          {/* Info Icon */}
          <button
            className="group flex outline-none items-center bg-purple-50 justify-center mx-2 w-[30px] h-[30px] hover:bg-[#a490b5d6] rounded-md transition-all duration-200 active:scale-95"
            onClick={() => setIsInfoOpen(true)}
          >
            {/* <InfoIcon /> */}
            <GrStatusInfo
              className="text-[#3F1562] text-xl text-bold"
              strokeWidth={0.5}
            />
          </button>

          {/* Home Section */}
          <button
            onClick={() => navigate(DASHBOARD)}
            className="group flex items-center h-[30px] space-x-1 sm:space-x-3 px-2 sm:px-3 py-1.5 bg-purple-50 hover:bg-[#a490b5d6] rounded-xl transition-all duration-200 active:scale-95"
          >
            {/* <Homeicon /> */}
            <GoHome className="text-[#3F1562] text-2xl" strokeWidth={0.5} />
            <span className="text-[#3F1562] font-bold text-sm sm:text-base">
              Home
            </span>
          </button>
        </div>

        {/* Centered content area */}
        {!isLinkedinCampaign && !isSaved && (
          <div
            className={`flex-1 flex flex-col w-full mt-[20px] items-center px-4 sm:px-6 lg:px-8 ${
              results?.data &&
              (results.type === "history"
                ? results.data.data
                : results.data.matched_profiles
              )?.length > 0
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div className="w-full max-w-3xl text-center mb-6 sm:mb-8">
              {isNewChat && !results && (
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3F1562] mb-3 sm:mb-4 tracking-tight leading-tight">
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
              } flex flex-col items-center sm:gap-4`}
            >
              {/* Input field */}
              <motion.div
                initial={{ y: 0 }}
                animate={{
                  y:
                    moved ||
                    (results?.data &&
                      (results.type === "history"
                        ? results.data.data?.length > 0
                        : results.data.matched_profiles?.length > 0))
                      ? -35
                      : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Prompt Box - Removed sticky positioning for mobile scroll */}
                <div
                  className={`mb-4 ${
                    sidebarCollapsed ? "z-50" : "z-0"
                  } w-full flex flex-row items-center bg-white/80 border border-[#3F1462] rounded-full p-2 sm:p-4 shadow-sm gap-2`}
                >
                  {/* Animated Input with AnimatePresence */}
                  <AnimatePresence mode="wait">
                    <motion.input
                      key={animatingText ? "animating" : "normal"}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 min-w-0 bg-transparent outline-none text-sm sm:text-lg placeholder-[#A6A6A6] truncate px-2"
                      placeholder="when an unknown printer took a galley of type and scrambled."
                      autoFocus
                      ref={inputRef}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setInpValue(e.target.value)}
                      value={inpValue ?? ""}
                      disabled={isRephrasing}
                    />
                  </AnimatePresence>

                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Rephrase Button with rotation animation */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="rounded-xl text-[#3D1562] opacity-70 px-2 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs flex items-center gap-1 disabled:opacity-50 disabled:!cursor-not-allowed"
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
                      <span className="hidden sm:inline">Rephrase</span>
                    </motion.button>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOnClick}
                      disabled={
                        !inpValue || inpValue.trim() === "" || isRephrasing
                      }
                      className="rounded-2xl p-2 sm:p-3 from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md disabled:opacity-50 disabled:!cursor-not-allowed flex-shrink-0"
                    >
                      {isSending ? <SaralLoader /> : <SendPrompt />}
                    </motion.button>
                  </div>
                </div>
                {/* Set result cards */}
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center mx-2 grid-1335-2 grid-1280-1320-2 grid-640-713-1 py-4">
                    {/* ... rest of your card content remains the same ... */}
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
                  {results &&
                    // @ts-ignore
                    results.data.has_next &&
                    results.type === "profiles" && (
                      <div className="flex justify-center mt-8 mb-4">
                        <button
                          onClick={handleLoadMore}
                          disabled={isLoadingMore}
                          className="px-8 py-2 rounded-xl font-semibold hover:scale-105 bg-[#3D1562] text-[white] transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            
                          }}
                        >
                          {isLoadingMore ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-t-[white] rounded-xl animate-spin"></div>
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
          <div className="flex-1 flex justify-center items-start h-screen">
            <Linkedin
              savedProfilesData={savedProfilesData}
              sidebarCollapsed={sidebarCollapsed}
            />
          </div>
        )}
        {isSaved && (
          <div className="flex-1 flex justify-center items-start h-screen">
            <SavedProfilesTab
              setSavedProfileCount={setSavedProfileCount}
              savedProfilesData={savedProfilesData}
              setSavedProfilesData={setSavedProfilesData}
            />
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
        setIsPaymentOpen={setIsPaymentOpen}
        setSelectedPlan={setSelectedPlan}
      />
      <SupportModal
        isOpen={isSupportModal}
        onClose={() => setIsSupportModal(false)}
      />
      <SearchChartModal
        isOpen={isSearchChartOpen}
        onClose={() => setIsSearchChartOpen(false)}
      />
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
