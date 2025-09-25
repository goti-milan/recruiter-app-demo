/* <--------------- Profile APIs -----------------> */

import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPutFormData } from "../api-helper";
import { GetCompanyProfileResponse } from "@/types/accountSetup.types";

/* <----- Create Profile -----> */
export const createCompanyProfile = async (formData: FormData) => {
    try {
        const result = await ApiPutFormData<ApiResponse<string>>(
            "/company/onboarding",
            formData
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <--------------- Get Profile -----------------> */
export const getCompanyProfile = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetCompanyProfileResponse>>(
            "/company"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}