/* <--------------- MESSAGE API -----------------> */

import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPost } from "../api-helper";
import { GetMessagesRequest, GetMessagesResponse, GetUsersForChatRequest, GetUsersForChatResponse, SendMessageRequest } from "@/types/message.types";

/* <----- Get Users For Chat -----> */
export const getUsersForChat = async ({ searchText, page, pageSize }: GetUsersForChatRequest) => {
    try {
        let url = `/chat/users?page=${page}&pageSize=${pageSize}`

        if (searchText) {
            url += `&searchText=${searchText}`
        }

        const result = await ApiGet<ApiResponse<GetUsersForChatResponse>>(url);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const getMessages = async ({ applicationId, page, pageSize }: GetMessagesRequest) => {
    if (applicationId === undefined) return
    try {
        let url = `/message?page=${page}&pageSize=${pageSize}`

        if (applicationId) {
            url += `&applicationId=${applicationId}`
        }

        const result = await ApiGet<ApiResponse<GetMessagesResponse>>(url);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const sendMessage = async (request: SendMessageRequest) => {
    try {
        const url = "/message"

        await ApiPost<ApiResponse<string>>(url, request)
    } catch (error) {
        console.error(error);
    }
}