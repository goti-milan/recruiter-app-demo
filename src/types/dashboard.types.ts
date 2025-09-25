
export interface DashboardKPIsResponse {
    totalJobsCount: number;
    totalApplicationsCount: number;
    latestApplicationsCount: number;
    genderStats: {
        male: number;
        female: number;
    };
}

export interface GetDashboardChartResponse {
    chartData: Array<{
        date: string;
        jobs: number;
        applications: number;
    }>;
}
