import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Star from "@/assets/svg/saral-ai/Star";
import ColoredLogo from "/src/assets/svg/saral-ai/logo/LogoColor.webp";
import {
  enhancePrompt,
  getSearchHistory,
  searchProfiles,
  SearchProfilesResponse,
} from "@/helpers/apis/saral-ai";
import { useNavigate } from "react-router";
import { LOGIN, SARAL_AI_RESULT } from "@/routes";
import SaralLoader from "@/components/ui/loader/SaralLoader";
import { getAuthorizedUserId } from "@/helpers/authorization";
import { SaralInfoModal } from "@/components/ui/saral-ai-popup/info-modal/InfoModal";

export function PromptScreen() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [animatingText, setAnimatingText] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigate = useNavigate();

  const [authorizedUserId, setAutorizedUserId] = useState<string>("");

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getSearchHistory(authorizedUserId, 1, 10);
      if (res?.total === 0) {
        setIsFirstTime(true);
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [authorizedUserId]);

  const fetchProfiles = async (query: string, page: number = 1) => {
    try {
      setResultLoading(true);
      setIsError(false);
      const response: SearchProfilesResponse = await searchProfiles(
        authorizedUserId,
        query,
        page
      );

      if (response.success) {
        navigate(SARAL_AI_RESULT, {
          state: { query: inputValue, data: response },
        });
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error searching profiles:", error);
    } finally {
      setResultLoading(false);
    }
  };

  const handleSearch = async () => {
    fetchProfiles(inputValue);
  };

  const handleEnhanceSearch = async () => {
    if (inputValue.trim() !== "") {
      try {
        setLoading(true);
        const response = await enhancePrompt(authorizedUserId, inputValue);

        if (response.success) {
          // Animate text change
          setAnimatingText(true);
          setTimeout(() => {
            setInputValue(response.enhanced_query);
            setAnimatingText(false);
          }, 400);
        }
      } catch (error) {
        console.error("Error enhancing search:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      key="prompt"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen font-manrope flex flex-col justify-between items-center bg-[#f9f1ff]"
    >
      {/* Heading */}
      <div className="flex flex-1 flex-col justify-center items-center h-[269px] w-full">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[1.1] font-extrabold text-[#3c295d] mb-8 relative inline-block">
          <span
            className="block opacity-95
            [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)]
            [mask-size:100%_100%]
            [mask-repeat:no-repeat]"
          >
            SARAL AI
          </span>
        </h1>

        {/* Prompt Bar */}
        <div className="w-[calc(100%-2rem)] lg:w-[904px] mx-4 relative p-[2px] rounded-full bg-gradient-to-r from-[#EC83BB] to-[#B664DB] shadow-md">
          <div className="flex items-center w-full bg-white rounded-full px-4 py-3 gap-2 sm:gap-4 overflow-hidden">
            {/* Animated Input */}
            <AnimatePresence mode="wait">
              <motion.input
                key={animatingText ? "animating" : "normal"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="w-full sm:w-3/4 bg-transparent outline-none text-base h-[55px] sm:text-lg placeholder-[#A6A6A6] truncate"
                placeholder="Type what you need. We’ll deliver who you need."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </AnimatePresence>

            {/* Rephrase Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex gap-1 outline-none items-center text-[#3D1562] opacity-80 font-semibold px-3 py-2 hover:scale-105 transition text-sm sm:text-base shrink-0 disabled:opacity-50 disabled:!cursor-not-allowed"
              onClick={handleEnhanceSearch}
              disabled={!inputValue.trim() || loading}
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  loading
                    ? { repeat: Infinity, duration: 3, ease: "linear" }
                    : {}
                }
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span className="hidden sm:inline">Rephrase</span>
            </motion.button>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={!inputValue.trim() || resultLoading}
              className="p-2 rounded-xl w-[40px] h-[40px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0 disabled:!cursor-not-allowed disabled:opacity-50"
            >
              {resultLoading ? (
                <span className="text-[#3D1562]">
                  <SaralLoader />
                </span>
              ) : (
                <img
                  src={ColoredLogo}
                  alt="coloredLogo"
                  className="aspect-square w-full"
                />
              )}
            </motion.button>
          </div>
        </div>
        {isError && (
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
        <SaralInfoModal
          isOpen={isFirstTime}
          onClose={() => setIsFirstTime(false)}
        />
      </div>

      {/* Footer */}
      <footer className="mb-4 text-sm text-gray-500">
        Saral AI v1.0x | Powered by{" "}
        <span className="text-[#663eb7] font-semibold hover:underline cursor-pointer">
          HeadsIn
        </span>
      </footer>
    </motion.div>
  );
}
