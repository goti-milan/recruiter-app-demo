
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router";
import { ChartData } from "chart.js";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

import CreateJob from "@/assets/svg/dashboard/created-job.svg";
import JobPostedIcon from "@/assets/svg/dashboard/job-posted.svg";
import NewApplication from "@/assets/svg/dashboard/new-application.svg";
import TotalApplication from "@/assets/svg/dashboard/total-application.svg";
import ApplicationCard from "@/components/ui/cards/ApplicationCard";
import JobCard from "@/components/ui/cards/JobCard";
import Loader from "@/components/ui/loader/Loader";
import DashboardWidget from "@/components/ui/widgets/DashboardWidget";
import { getAllCompanyApplications } from "@/helpers/apis/applications";
import { getChart, getKpis } from "@/helpers/apis/dashboard";
import { getAllJobs } from "@/helpers/apis/jobs";
import { JOB_STATUS, USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { CREATE_JOB } from "@/routes";
import { SuggestedUserWithApplicationData } from "@/types/applications.types";
import { JobTable } from "@/types/jobs.types";
import { useQuery } from "@tanstack/react-query";

const LineChart = lazy(() => import("@/components/ui/chart/LineChart"));
const DoughnutChart = lazy(() => import("@/components/ui/chart/DoughnutChart"));

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<Nullable<(Date | null)[]>>([
        moment().subtract(30, "days").toDate(),
        moment().add(30, "days").toDate(),
    ]);

    const GetKpis = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_KPIS],
        queryFn: () => getKpis(),
    });

    const GetChartData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_CHAT, dateRange?.[0], dateRange?.[1]],
        queryFn: () =>
            getChart({
                startDate: moment(dateRange?.[0]).format("YYYY-MM-DD"),
                endDate: moment(dateRange?.[1]).format("YYYY-MM-DD"),
            }),
        enabled: !!dateRange?.[0] && !!dateRange?.[1], // fetch data only when dateRange is set
    });

    const GetAllJobs = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_ALL_JOBS],
        queryFn: () =>
            getAllJobs({
                page: 1,
                pageSize: 2,
                jobStatus: JOB_STATUS.ON_GOING,
                searchText: "",
            }),
    });

    const GetAllApplications = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_ALL_APPLICATIONS],
        queryFn: () => getAllCompanyApplications({ page: 1, pageSize: 2 }),
    });

    const [data, setData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: "Applications",
                data: [],
                backgroundColor: "transparent",
                borderColor: "#FC5F5F",
                tension: 0.1,
                pointBorderWidth: 0,
                pointHoverBackgroundColor: "#FC5F5F",
                pointBackgroundColor: "transparent",
            },
            {
                label: "Job Posted",
                data: [],
                backgroundColor: "transparent",
                borderColor: "#3F1562",
                tension: 0.1,
                pointBorderWidth: 0,
                pointHoverBackgroundColor: "#3F1562",
                pointBackgroundColor: "transparent",
            },
        ],
    });

    useEffect(() => {
        if (GetChartData.data) {
            const chartData = GetChartData.data.chartData;
            setData({
                labels: chartData.map((item) => item.date),
                datasets: [
                    {
                        label: "Applications",
                        data: chartData.map((item) => item.applications) ?? [],
                        backgroundColor: "transparent",
                        borderColor: "#FC5F5F",
                        tension: 0.1,
                        pointBorderWidth: 0,
                        pointHoverBackgroundColor: "#FC5F5F",
                        pointBackgroundColor: "transparent",
                    },
                    {
                        label: "Job Posted",
                        data: chartData.map((item) => item.jobs) ?? [],
                        backgroundColor: "transparent",
                        borderColor: "#3F1562",
                        tension: 0.1,
                        pointBorderWidth: 0,
                        pointHoverBackgroundColor: "#3F1562",
                        pointBackgroundColor: "transparent",
                    },
                ],
            });
        }
    }, [GetChartData.data]);

    return GetKpis.isLoading ||
        GetChartData.isLoading ||
        GetAllJobs.isLoading ||
        GetAllApplications.isLoading ? (
        <Loader isVisible />
    ) : (
        <div className="w-full h-full flex flex-col gap-4 overflow-auto scrollbar-hidden">
            <div className="flex items-center justify-between md:py-4 py-2 md:px-0 px-2">
                <h1 className="text-primary font-semibold text-2xl">
                    Dashboard
                </h1>
                <Link
                    to={CREATE_JOB}
                    onClick={() => {
                        localStorage.removeItem("job-details");
                        queryClient.removeQueries({
                            queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
                        });
                    }}
                    className="flex gap-2 border border-primary py-2 px-4 rounded-xl hover:bg-[#EDD8FF]"
                >
                    <img
                        src={CreateJob}
                        alt="create-job"
                        className="aspect-square w-6 h-6"
                    />
                    <p className="font-medium">Create a Job</p>
                </Link>
            </div>
            <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
                <DashboardWidget
                    icon={JobPostedIcon}
                    count={GetKpis.data?.totalJobsCount ?? 0}
                    title="Job Posted"
                />
                <DashboardWidget
                    icon={TotalApplication}
                    count={GetKpis.data?.totalApplicationsCount ?? 0}
                    title="Total Application"
                />
                <DashboardWidget
                    icon={NewApplication}
                    count={GetKpis.data?.latestApplicationsCount ?? 0}
                    title="New Application"
                />
            </div>

            {/* Charts */}
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4">
                {/* Line Chart */}
                <div className="md:col-span-2 border border-[#E7E7E7] rounded-2xl p-4 bg-white flex flex-col gap-4">
                    <div className="flex md:flex-row flex-col w-full md:items-center items-end justify-between md:gap-0 gap-2">
                        <h1 className="text-primary font-semibold text-2xl md:w-auto w-full">
                            Jobs & Applications
                        </h1>
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
                                        "filter-calender lg:!w-[300px] md:w-1/2 w-4/5 h-[40px] !text-black border-none focus:!shadow-none !bg-field !rounded-xl font-manrope",
                                },
                                day: { className: "p-0 filter-calender-day" },
                            }}
                            showIcon
                        />
                    </div>
                    {GetChartData?.data?.chartData &&
                    GetChartData?.data?.chartData.length > 0 ? (
                        <Suspense fallback={<div className="w-full h-[300px] flex items-center justify-center"><Loader isVisible /></div>}>
                            <LineChart data={data} />
                        </Suspense>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No Data...</p>
                        </div>
                    )}
                </div>

                {/* Doughnut Chart */}
                <div className="md:col-span-1 border border-[#E7E7E7] rounded-2xl p-4 bg-white flex flex-col gap-4">
                    <h1 className="text-primary font-semibold text-2xl">
                        Gender
                    </h1>
                    {GetKpis?.data?.genderStats.female ||
                    GetKpis?.data?.genderStats.male ? (
                        <Suspense fallback={<div className="w-full h-[300px] flex items-center justify-center"><Loader isVisible /></div>}>
                            <DoughnutChart
                                maleCount={GetKpis.data?.genderStats.male}
                                femaleCount={GetKpis.data?.genderStats.female}
                            />
                        </Suspense>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No Data...</p>
                        </div>
                    )}
                </div>
            </div>

            {((GetAllJobs.data?.jobs && GetAllJobs.data?.jobs?.length > 0) ||
                (GetAllApplications?.data?.applications &&
                    GetAllApplications.data?.applications?.length > 0)) && (
                <div className="relative w-full rounded-2xl bg-white border border-[#E7E7E7] flex flex-col gap-4 md:p-5 p-3 font-manrope">
                    {GetAllJobs.data && GetAllJobs.data?.jobs?.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-primary font-semibold text-2xl">
                                    Job Posted
                                </h1>
                                <Link
                                    to={"/jobs"}
                                    className="text-primary font-semibold"
                                >
                                    View all
                                    <i className="pi pi-arrow-up-right pl-2"></i>
                                </Link>
                            </div>
                            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                                {GetAllJobs?.data?.jobs?.map(
                                    (job: JobTable) => (
                                        <JobCard
                                            key={job?.id}
                                            data={job}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {GetAllApplications.data &&
                        GetAllApplications.data?.applications?.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <h1 className="text-primary font-semibold text-2xl">
                                    New Applications
                                </h1>
                                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                                    {GetAllApplications?.data?.applications?.map(
                                        (
                                            application: SuggestedUserWithApplicationData
                                        ) => (
                                            <ApplicationCard
                                                jobTitle={
                                                    application.job?.title
                                                }
                                                key={application?.id}
                                                data={application}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
