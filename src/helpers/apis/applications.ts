/* <--------------- APPLICATIONS API -----------------> */

import { ApiResponse } from "@/types/apiResponse";
import { GetSuggestedUserWithApplicationDetailsResponse, GetCompanyApplicationsRequest, GetSuggestedUserWithCompanyApplicationsResponse, CreateApplicationRequest, UpdateApplicationStatusRequest } from "@/types/applications.types";
import { ApiGet, ApiPatch, ApiPost } from "../api-helper";
import { APPLICATION_TABS_TYPE } from "../constants";

/* <----- Get All Company Applications -----> */
export const getAllCompanyApplications = async ({ jobId, userId, status, searchText, startDate, endDate, page, pageSize }: GetCompanyApplicationsRequest) => {
    try {

        let url = `/company/application?`

        if (page) {
            url += `&page=${page}`
        }
        if (pageSize) {
            url += `&pageSize=${pageSize}`
        }
        if (jobId) {
            url += `&jobId=${jobId}`
        }
        if (userId) {
            url += `&userId=${userId}`
        }
        if (status) {
            status.map((item, index) => {
                url += `&status[${index}]=${item}`
            })
        }
        if (searchText) {
            url += `&searchText=${searchText}`
        }
        if (startDate) {
            url += `&startDate=${startDate}`
        }
        if (endDate) {
            url += `&endDate=${endDate}`
        }

        const result = await ApiGet<ApiResponse<GetSuggestedUserWithCompanyApplicationsResponse>>(url);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const getUserApplications = async ({ userId }: { userId?: string }): Promise<GetSuggestedUserWithCompanyApplicationsResponse | undefined> => {
    try {
        if (!userId) return { applications: [], totalCount: 0 };

        const data = await getAllCompanyApplications({ userId });
        return data;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Get Application Details -----> */
export const getApplicationDetails = async ({ jobId, userId, tab, applicationId }: { jobId: string, userId: string, tab: string, applicationId: string }) => {
    try {
        if (tab === APPLICATION_TABS_TYPE.AI_RECOMMENDED) {
            const result = await ApiGet<ApiResponse<GetSuggestedUserWithApplicationDetailsResponse>>(
                `/job/suggested-user?jobId=${jobId}&userId=${userId}`
            );
            return result.data;
        } else {
            const result = await ApiGet<ApiResponse<GetSuggestedUserWithApplicationDetailsResponse>>(
                `/user/application/${applicationId}`
            );
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
}


/* <----- Create Application -----> */
export const createApplication = async (data: CreateApplicationRequest) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            "/application",
            data
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Update Application Status -----> */
export const updateApplicationStatus = async (data: UpdateApplicationStatusRequest) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            "/application",
            data
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}