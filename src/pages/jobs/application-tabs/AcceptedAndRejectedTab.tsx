import ApplicationCard from "@/components/ui/cards/ApplicationCard";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import Loader from "@/components/ui/loader/Loader";
import { getAllCompanyApplications } from "@/helpers/apis/applications";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import useDebounce from "@/hooks/useDebounce";
import {
    ApplicationStatus,
    SuggestedUserWithApplicationData,
} from "@/types/applications.types";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import React, { useState } from "react";
import { useParams } from "react-router";

const AcceptedAndRejectedTab: React.FC = () => {
    const { jobId } = useParams();

    const [dateRange, setDateRange] = useState<Nullable<(Date | null)[]>>([
        moment().subtract(15, "days").toDate(),
        moment().add(15, "days").toDate(),
    ]);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);

    return (
        <div className="w-full h-full">
            <div className="w-full flex lg:flex-row flex-col items-center justify-between lg:h-[50px] mb-2">
                <div className="flex md:flex-row flex-col items-center justify-start gap-4 lg:w-auto w-11/12">
                    <IconField
                        iconPosition="right"
                        pt={{
                            root: {
                                className: "lg:!w-[300px] w-full",
                            },
                        }}
                    >
                        <InputIcon className="m-0 -traslate-y-1/2 inline-flex">
                            <i className="pi pi-search"></i>{" "}
                        </InputIcon>
                        <InputText
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full !h-[40px] !text-black !border-[#EEEEEE] focus:border-primary focus:!shadow-none !bg-[#F7F7F7] !rounded-xl font-manrope"
                        />
                    </IconField>

                    <Calendar
                        value={dateRange}
                        onChange={(e) => setDateRange(e.value)}
                        selectionMode="range"
                        hideOnRangeSelection
                        dateFormat="dd/mm/yy"
                        placeholder="Date Range"
                        pt={{
                            root: {
                                className:
                                    "filter-calender lg:!w-[300px] w-full h-[40px] !text-black border-none focus:!shadow-none !bg-field !rounded-xl font-manrope",
                            },
                            day: { className: "p-0 filter-calender-day" },
                        }}
                        showIcon
                    />
                </div>

                <button
                    type="button"
                    className="hover:bg-field rounded-xl bg-white text-primary text-lg font-medium px-4 py-2"
                    onClick={() => {
                        setSearch("");
                        setDateRange([
                            moment().subtract(15, "days").toDate(),
                            moment().add(15, "days").toDate(),
                        ]);
                    }}
                >
                    Reset
                </button>
            </div>

            <InfiniteScroll<
                SuggestedUserWithApplicationData,
                { page: number; pageSize: number }
            >
                queryKey={[
                    USE_QUERY_KEYS.GET_ALL_APPLICATIONS,
                    debouncedSearch,
                    dateRange?.[1]?.toString() as string,
                ]}
                fetchFn={async (params) => {
                    const response = await getAllCompanyApplications({
                        ...params,
                        status: [
                            ApplicationStatus.accepted,
                            ApplicationStatus.rejected,
                        ],
                        jobId: jobId,
                        searchText: debouncedSearch,
                        startDate: moment(dateRange?.[0]).format("YYYY-MM-DD"),
                        endDate: moment(dateRange?.[1]).format("YYYY-MM-DD"),
                    });
                    return {
                        data: response?.applications ?? [], // Provide an empty array as default value
                        hasMore:
                            (Number(response?.totalCount) || 0) >
                            params.page * params.pageSize, // Ensure totalCount is a number
                        totalPages:
                            Math?.ceil(
                                (Number(response?.totalCount) || 0) /
                                    params.pageSize
                            ) || 0, // Avoid NaN
                    };
                }}
                enabled={!!dateRange?.[0] && !!dateRange?.[1]}
                initialParams={{ page: 1, pageSize: 10 }}
                getDataFromResponse={(response) => response.data}
                hasMorePages={(lastPage, allPages) =>
                    allPages.length < lastPage.totalPages
                }
                renderItem={(suggestedUser) => (
                    <ApplicationCard
                        key={suggestedUser?.id}
                        data={suggestedUser}
                        jobTitle={suggestedUser?.job?.title}
                        btnType="ACCEPTED_REJECTED"
                    />
                )}
                loadingComponent={<Loader isVisible={true} />}
                emptyComponent={
                    <div className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
                        No Accepted or Rejected Applications Found.
                    </div>
                }
                gridCols={2}
                direction="down"
                className="gap-4 md:h-[calc(100vh-250px)] h-[calc(100vh-200px)]"
            />
        </div>
    );
};

export default AcceptedAndRejectedTab;
