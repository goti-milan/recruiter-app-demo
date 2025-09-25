/* <--------------- SUPPORT API -----------------> */

import { ApiResponse } from "@/types/apiResponse";
import { ApiPost } from "../api-helper";
import { ReviewRequest } from "@/types/support.types";

/* <----- Send Review -----> */
export const UserAddReview = async (data: ReviewRequest) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            "/user/add-review",
            data
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}