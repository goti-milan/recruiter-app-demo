import { CommonModal } from "../common-modal/CommonModal";
import { getSearchHistory, SearchHistoryItem } from "@/helpers/apis/saral-ai";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { getAuthorizedUserId } from "@/helpers/authorization";
import ButtonLoader from "../../loader/ButtonLoader";
import NewChat from "@/assets/svg/saral-ai/new-chat/NewChat";
import SeachListIcon from "@/assets/svg/saral-ai/search-list/SeachListIcon";

interface SearchChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchChartModal({ isOpen, onClose }: SearchChatModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<SearchHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [authorizedUserId, setAuthorizedUserId] = useState<string>("");

  const navigate = useNavigate();
  const limit = 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const userId = getAuthorizedUserId();
    setAuthorizedUserId(userId ?? "");
  }, []);

  const fetchHistory = useCallback(
    async (pageNum: number, isInitial = false) => {
      if (isLoadingRef.current || (!hasMore && !isInitial) || !authorizedUserId) return;

      isLoadingRef.current = true;
      setLoading(true);

      try {
        const res = await getSearchHistory(authorizedUserId, pageNum, limit);

        if (pageNum === 1) {
          setHistory(res.data);
        } else {
          setHistory((prev) => {
            const existingIds = new Set(prev.map((item) => item.id));
            const newItems = res.data.filter((item) => !existingIds.has(item.id));
            return [...prev, ...newItems];
          });
        }

        setHasMore(pageNum < res.total_pages);

        if (isInitial) {
          setInitialLoad(false);
        }
      } catch (error) {
        console.error("Error fetching search history:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    },
    [hasMore, limit, authorizedUserId]
  );

  useEffect(() => {
    if (isOpen && authorizedUserId) {
      setPage(1);
      setHasMore(true);
      setHistory([]);
      setInitialLoad(true);
      fetchHistory(1, true);
    }
  }, [isOpen, authorizedUserId]);

  useEffect(() => {
    if (page > 1) {
      fetchHistory(page);
    }
  }, [page]);

  // Filter history based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter((item) =>
        item.query_text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchQuery, history]);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container || isLoadingRef.current || !hasMore || searchQuery.trim() !== "") return;

      const { scrollTop, clientHeight, scrollHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 100);
  }, [hasMore, searchQuery]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `Previous ${diffDays} Days`;
    }
    
    return date.toLocaleDateString();
  }, []);

  const handleHistoryClick = useCallback(
    (itemId: string) => {
      navigate(`/saral-ai/result/${itemId}/view`);
      onClose();
    },
    [navigate, onClose]
  );

  const handleNewChat = useCallback(() => {
    navigate("/saral-ai/new");
    onClose();
  }, [navigate, onClose]);

  // Group history by date
  const groupedHistory = useCallback(() => {
    const groups: { [key: string]: SearchHistoryItem[] } = {};
    
    filteredHistory.forEach((item) => {
      const dateGroup = formatDate(item.created_at);
      if (!groups[dateGroup]) {
        groups[dateGroup] = [];
      }
      groups[dateGroup].push(item);
    });

    return groups;
  }, [filteredHistory, formatDate]);

  const renderHistoryItems = () => {
    const grouped = groupedHistory();
    const groupKeys = Object.keys(grouped);

    if (groupKeys.length === 0 && !loading) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No search history found</p>
        </div>
      );
    }

    return groupKeys.map((dateGroup) => (
      <div key={dateGroup} className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-2 px-1">{dateGroup}</h4>
        {grouped[dateGroup].map((item) => (
          <div
            key={item.id}
            onClick={() => handleHistoryClick(item.id)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="w-4 h-4 rounded-full group-hover:border-[#3D1562] transition-colors flex-shrink-0"><SeachListIcon /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.query_text}</p>
              <p className="text-xs text-gray-500">{item.total_results} results</p>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex flex-col font-manrope w-full h-full max-h-[60vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#3D1562] mb-1">Search Chats</h2>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4 border-b border-gray-300">
          <div className="absolute inset-y-0  left-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-gray-400">
              <path
                d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 border-0 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D1562] focus:border-transparent"
          />
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="flex items-center gap-3 p-3 mb-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-lg flex items-center justify-center">
            <NewChat />
          </div>
          <span className="font-medium text-gray-900">New Chat</span>
        </button>

        {/* History List */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2"
        >
          {initialLoad && loading ? (
            <div className="flex justify-center py-8">
              <ButtonLoader isVisible={loading} />
            </div>
          ) : (
            <>
              {renderHistoryItems()}
              {loading && !initialLoad && (
                <div className="text-center py-4">
                  <ButtonLoader isVisible={loading} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </CommonModal>
  );
}

export default SearchChartModal;