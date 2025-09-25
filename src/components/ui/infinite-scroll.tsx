import { useRef, useEffect, useState, type ReactNode } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import Loader from "./loader/Loader"

interface ResponseData<T> {
  data: T[]
  hasMore: boolean
  totalPages: number
}

interface InfiniteScrollProps<T, P> {
  // Query key for React Query cache
  queryKey: string[]
  // Function to fetch data with pagination
  fetchFn: (params: P) => Promise<ResponseData<T>>
  // Optional flag to enable the query
  enabled?: boolean
  // Initial parameters for the query
  initialParams: P
  // Function to extract data items from the response
  getDataFromResponse: (response: ResponseData<T>) => T[]
  // Function to determine if there are more pages
  hasMorePages: (lastPage: ResponseData<T>, allPages: ResponseData<T>[]) => boolean
  // Function to render each item
  renderItem: (item: T, index: number) => ReactNode
  // Optional loading component
  loadingComponent?: ReactNode
  // Optional empty state component
  emptyComponent?: ReactNode
  // Grid layout: number of columns on desktop
  gridCols?: number
  // Direction of infinite scroll ('up' for WhatsApp-like, 'down' for traditional)
  direction?: "up" | "down"
  // Optional class name for the container
  className?: string
}

function InfiniteScroll<T, P extends { page: number; pageSize: number }>({
  queryKey,
  fetchFn,
  enabled = true,
  initialParams,
  getDataFromResponse,
  hasMorePages,
  renderItem,
  loadingComponent = <Loader isVisible={true} />,
  emptyComponent = (
    <div className="w-full h-full flex items-center justify-center text-primary text-lg font-semibold text-center">
      No data found.
    </div>
  ),
  gridCols = 1,
  direction = "up",
  className = "",
}: InfiniteScrollProps<T, P>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const hasFetched = useRef(false); // Prevent duplicate calls

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: queryKey, // Use the provided queryKey
    queryFn: ({ pageParam }) => fetchFn({ ...initialParams, page: pageParam }),
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages using the provided function
      if (hasMorePages(lastPage, allPages)) {
        return allPages?.length + 1
      }

      return undefined
    },
    initialPageParam: initialParams.page,
  })

  // Handle scroll event to load more data
  const handleScroll = () => {
    if (!containerRef.current || isLoadingMore || hasFetched.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (direction === "up") {
      if (scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
        setIsLoadingMore(true); // Start loading
        const scrollPosition = scrollHeight - scrollTop;

        fetchNextPage().then(() => {
          setTimeout(() => {
            if (containerRef.current) {
              const newScrollHeight = containerRef.current.scrollHeight;
              containerRef.current.scrollTop = newScrollHeight - scrollPosition;
            }
            setIsLoadingMore(false); // Stop loading after 3 seconds
          }, 300);
        });
      }
    } else {
      if (scrollHeight - scrollTop - clientHeight < 100 && hasNextPage && !isFetchingNextPage) {
        hasFetched.current = true; // Block duplicate calls
        setIsLoadingMore(true); // Show Loader

        setTimeout(async () => {
          await fetchNextPage();
          setIsLoadingMore(false); // Hide Loader after fetching
          hasFetched.current = false; // Allow new requests
        }, 300); // Delay API Call by 3 Seconds
      }
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage]); // Include handleScroll


  // Scroll to appropriate position on initial load
  useEffect(() => {
    if (initialLoad && containerRef?.current && data?.pages?.length) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop =
            direction === "up"
              ? containerRef.current.scrollHeight
              : 0;
        }
      });
      setInitialLoad(false);
    }
  }, [data?.pages, initialLoad, direction]); // Use data?.pages instead of full `data`


  // Flatten all pages of data

  if (isLoading) {
    return <>{loadingComponent}</>
  }

  const allItems = data?.pages?.flatMap((page) => getDataFromResponse(page)) || []

  if (allItems?.length === 0) {
    return <>{emptyComponent}</>
  }

  return (
    <div ref={containerRef} className={`w-full overflow-y-auto scrollbar-hidden ${className}`}>
      {/* Show loading indicator at the top when direction is "up" and fetching more */}
      {direction === "up" && isFetchingNextPage && (
        <div className="col-span-full flex justify-center py-2">
          <Loader isVisible />
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-${gridCols} gap-4`}>
        {/* Render all items */}
        {allItems?.map((item, index) => renderItem(item, index))}
      </div>

      {/* Show loading indicator at the bottom when direction is "down" and fetching more */}
      {isLoadingMore && (
        <div className="w-full h-full flex items-center justify-center py-4">
          <Loader isVisible={true} />
        </div>
      )}
    </div>
  )
}

export default InfiniteScroll