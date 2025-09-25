import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import { getSearchHistory, SearchHistoryItem } from "@/helpers/apis/saral-ai";
import { useEffect, useState, useCallback, useMemo } from "react";
import ButtonLoader from "../loader/ButtonLoader";
import { useNavigate } from "react-router";
import { getAuthorizedUserId } from "@/helpers/authorization";
import { LOGIN } from "@/routes";

type RecentSearchTabProps = {
  setIsSearchChartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInpValue: React.Dispatch<React.SetStateAction<string | null>>;
};


const RecentSearchTab = ({ setIsSearchChartOpen, setInpValue }: RecentSearchTabProps) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [authorizedUserId, setAutorizedUserId] = useState<string>("");

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
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
      setInpValue(queryText)
      navigate(`/saral-ai/result/${itemId}/view`);
    },
    [navigate]
  );

  const renderedItems = useMemo(() => {
    return history.slice(0, 4).map((item) => {
      const { date, time } = formatDate(item.created_at);
      return (
        <div
          key={item.id}
          onClick={() => handleHistoryClick(item.id, item.query_text)}
          className="flex justify-between items-center bg-white rounded-xl px-3 py-2 mb-2 shadow-sm border border-[#f0ebf8] cursor-pointer transition-all duration-200 hover:shadow-md hover:border-[#e1d6f2] hover:bg-[#fefefe] active:transform active:scale-[0.98]"
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
  }, [history, formatDate, handleHistoryClick]);

  if (initialLoad && loading) {
    return (
      <div className="bg-white/50 rounded-2xl h-2 border-[3px] border-white p-3 w-full mt-[15px] max-w-xs">
        <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-2 flex items-center gap-2">
          <RecentSearch />
          Recent Search
        </h3>
        <div className="border-t border-[#e9e4f3] mb-3" />
        <div className="flex justify-center py-8">
          <ButtonLoader isVisible={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 rounded-2xl xl:h-[360px] md:h-[347px] border-[3px] border-white p-3 w-full mt-[15px] max-w-xs">
      <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-2 flex items-center gap-2">
        <RecentSearch />
        Recent Search
      </h3>

      <div className="border-t border-[#e9e4f3] mb-3" />

      <div className="space-y-2">
        {renderedItems}
      </div>

      {history.length > 4 && (
        <div className="text-center mt-2">
          <button
            onClick={() => setIsSearchChartOpen(true)}
            className="text-sm outline-none font-medium px-5 py-2 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-[#3F1562] to-[#DF6789] border border-transparent hover:border-[#DF6789] transition-all duration-300 cursor-default"
          >
            View More
          </button>
        </div>
      )}

    </div>
  );
};

export default RecentSearchTab;