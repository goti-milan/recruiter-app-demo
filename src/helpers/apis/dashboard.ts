import { ApiResponse } from "@/types/apiResponse";
import { DashboardKPIsResponse, GetDashboardChartResponse } from "@/types/dashboard.types";
import { ApiGet } from "../api-helper";

/* <----- Get Kpis -----> */
export const getKpis = async () => {
    try {
        const result = await ApiGet<ApiResponse<DashboardKPIsResponse>>(
            `/company/dashboard/kpis`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Get Chart -----> */
export const getChart = async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
    try {
        const result = await ApiGet<ApiResponse<GetDashboardChartResponse>>(
            `/company/dashboard/chart?startDate=${startDate}&endDate=${endDate}`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}