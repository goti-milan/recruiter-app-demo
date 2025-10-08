import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import { getSearchHistory, SearchHistoryItem } from "@/helpers/apis/saral-ai";
import { useEffect, useState, useCallback, useMemo } from "react";
import ButtonLoader from "../loader/ButtonLoader";
import { useNavigate, useParams } from "react-router";
import { getAuthorizedUserId } from "@/helpers/authorization";
import { LOGIN } from "@/routes";

type RecentSearchTabProps = {
  setIsSearchChartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInpValue: React.Dispatch<React.SetStateAction<string | null>>;
  handleMobileSidebarClose: () => void;
};

const RecentSearchTab = ({
  setIsSearchChartOpen,
  setInpValue,
  handleMobileSidebarClose,
}: RecentSearchTabProps) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [authorizedUserId, setAutorizedUserId] = useState<string>("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const params = useParams();
  const resultId = params.id;

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await getSearchHistory(authorizedUserId, 1, 10);
      setHistory(res.data);
      if (initialLoad) {
        setInitialLoad(false);
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, authorizedUserId, initialLoad]);

  useEffect(() => {
    if (authorizedUserId) {
      fetchHistory();
    }
  }, [authorizedUserId]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, []);

  const handleHistoryClick = useCallback(
    (itemId: string, queryText: string) => {
      setInpValue(queryText);
      navigate(`/saral-ai/result/${itemId}/view`);
    },
    [navigate]
  );

  const handleRecentSearchClick = useCallback(() => {
    if (windowHeight < 753 && history.length > 0) {
      setIsSearchChartOpen(true);
      handleMobileSidebarClose();
    }
  }, [windowHeight, history.length, setIsSearchChartOpen, handleMobileSidebarClose]);

  const renderedItems = useMemo(() => {
    if (windowHeight < 753) {
      return null;
    }

    return history.slice(0, 4).map((item) => {
      const { date, time } = formatDate(item.created_at);
      return (
        <div
          key={item.id}
          onClick={() => {
            handleHistoryClick(item.id, item.query_text);
            handleMobileSidebarClose();
          }}
          className={`flex justify-between items-center rounded-xl px-3 py-2 mb-2 cursor-pointer transition-all duration-200 hover:shadow-md active:transform  ${resultId === item.id ? "bg-[#eeeaf0d6]" : "bg-white hover:border-[#e1d6f2] hover:bg-[#fefefe] "} `}
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#2d1b4a] truncate max-w-[150px]">
              {item.query_text}
            </span>
            <span className="text-xs text-[#7965a8]">
              {item.total_results} results
            </span>
          </div>
          <span className="text-xs text-[#7965a8] flex flex-col sm:flex-col sm:gap-1">
            <span>{date}</span>
            <span>{time}</span>
          </span>
        </div>
      );
    });
  }, [history, formatDate, handleHistoryClick, windowHeight, resultId]);

  if (initialLoad && loading) {
    return (
      <div className="bg-white/50 rounded-2xl h-2 border-[3px] border-white p-3 w-full max-w-xs">
        <div className="flex justify-center py-8">
          <ButtonLoader isVisible={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 rounded-2xl xl:h-[360px] md:h-[347px] border-[3px] border-white w-full  max-w-xs">
      {windowHeight >= 753 && <div className="border-t border-[#e9e4f3] mb-3 overflow-y-auto" /> }
      {windowHeight >= 753 && <div className="space-y-2">{renderedItems}</div>}
      {windowHeight >= 753 && history.length > 4 && (
        <div className="text-center mt-2">
          <button
            onClick={() => {
              setIsSearchChartOpen(true);
              handleMobileSidebarClose();
            }}
            className="text-sm outline-none font-medium px-21 py-2 rounded-md text-[#886F9D] hover:bg-[#a490b5d6] hover:text-[#3F1562] cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentSearchTab;