/* <--------------- JOBS API -----------------> */

import { ApiResponse } from "@/types/apiResponse";
import { GetSuggestedUserWithCompanyApplicationsResponse } from "@/types/applications.types";
import { CreateAndUpdateJobRequest, GenerateJDRequest, GenerateJDResponse, GetCityListResponse, GetJobDetailsResponse, GetJobsForCompanyRequest, GetJobsForCompanyResponse, GetQualificationListResponse, GetRolesResponse, GetSuggestedUsersRequest } from "@/types/jobs.types";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "../api-helper";


/* <----- Create Job -----> */
export const createJob = async (data: CreateAndUpdateJobRequest) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            "/job",
            data
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Update Job -----> */
export const updateJob = async (data: CreateAndUpdateJobRequest) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/job`,
            data
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Get All Jobs -----> */
export const getAllJobs = async ({ page, pageSize, searchText, jobStatus }: GetJobsForCompanyRequest) => {
    try {
        const result = await ApiGet<ApiResponse<GetJobsForCompanyResponse>>(
            `/company/job?pageSize=${pageSize}&page=${page}&searchText=${searchText}&jobStatus=${jobStatus}`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Get One Job -----> */
export const getOneJob = async (id: string) => {
    if (!id) return;
    try {
        const result = await ApiGet<ApiResponse<GetJobDetailsResponse>>(
            `/job/one/${id}`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Get suggested users jobs -----> */
export const getSuggestedJobs = async ({ jobId, page, pageSize, searchText, endDate, startDate }: GetSuggestedUsersRequest) => {
    try {
        let url = `job/suggested-users?page=${page}&pageSize=${pageSize}`

        if (jobId) {
            url += `&jobId=${jobId}`
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


/* <----- Get Qualification List -----> */
export const getQualificationList = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetQualificationListResponse>>(
            `/system/qualification`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Get City List -----> */
export const getCityList = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetCityListResponse>>(
            `/system/city`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}


/* <-------- Get Roles --------> */

export const getRoles = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetRolesResponse>>(
            "/role"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Generate Job Description by AI -----> */
export const generateJD = async (data: GenerateJDRequest) => {
    try {
        const result = await ApiPost<ApiResponse<GenerateJDResponse>>(
            `/job/AI/job-description`, data
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Delete Job -----> */
export const deleteJob = async (id: string) => {
    try {
        const result = await ApiDelete<ApiResponse<string>>(
            `/job/${id}`
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}