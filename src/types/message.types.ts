/* <----- Message types -----> */

/* <----- Get Users For Chat Types [Start] -----> */
export interface GetUsersForChatRequest {
    searchText?: string;
    pageSize: number;
    page: number;
}

export interface UserForChat {
    userId: string;
    name: string;
    avatar: string | null;
    messageMetadata: {
        latestMessage: string | null;
        latestMessageTime: string | null;
        unreadCount: number;
    }
}

export interface GetUsersForChatResponse {
    users: UserForChat[];
    totalCount: number;
}

/* <----- Get Users For Chat Types [End] -----> */

export interface GetMessagesRequest {
    applicationId?: string;
    pageSize: number;
    page: number;
}

export enum UserType {
    user = "USER",
    company = "COMPANY",
};

export interface Message {
    id?: string;
    message: string;
    sender: UserType;
    createdAt?: string;
}

export type GetMessagesResponse = {
    messages: Message[];
    companyLogo: string | null;
    totalCount: number;
}

export type SendMessageRequest = {
    applicationId: string;
    message: string;
}