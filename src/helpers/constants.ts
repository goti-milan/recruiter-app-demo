import SadEmoji from "@/assets/svg/support/emojis/Sad"
import NeutralEmoji from "@/assets/svg/support/emojis/Neutral"
import HappyEmoji from "@/assets/svg/support/emojis/Happy"
import SmileEmoji from "@/assets/svg/support/emojis/Smile"
import JoyEmoji from "@/assets/svg/support/emojis/Joy"
import { JSX } from "react"

export enum JOB_STATUS {
    ON_GOING = "ONGOING",
    EXPIRED = "EXPIRED",
}

export enum SALARY_TYPE {
    FIXED = "FIXED",
    FIXED_INCENTIVE = "FIXED_INCENTIVE",
    INCENTIVE = "INCENTIVE",
    NOT_DISCLOSED = "NOT_DISCLOSED",
}

export const RATING_EMOJI: Array<{ label: React.FC<JSX.IntrinsicElements["svg"]>; value: number }> = [
    { label: SadEmoji, value: 1 },
    { label: NeutralEmoji, value: 2 },
    { label: SmileEmoji, value: 3 },
    { label: HappyEmoji, value: 4 },
    { label: JoyEmoji, value: 5 },
];

export const APPLICATION_TABS_TYPE = {
    AI_RECOMMENDED: "AI_RECOMMENDED",
    APPLIED: "APPLIED",
    SHORTLISTED: "SHORTLISTED",
    ACCEPTED_REJECTED: "ACCEPTED_REJECTED"
}

export enum USE_QUERY_KEYS {
    GET_COMPANY_USER = "getCompanyUser",
    SEND_OTP = "sendOtp",
    GET_KPIS = "getKpis",
    GET_CHAT = "getChat",
    GET_ALL_JOBS = "getAllJobs",
    GET_SUGGESTED_JOBS = "getSuggestedJobs",
    GET_ONE_JOB = "getOneJob",
    GET_ALL_APPLICATIONS = "getAllApplications",
    GET_ONE_APPLICATION = "getOneApplication",
    GET_COMPANY_PROFILE = "getCompanyProfile",
    GET_USERS_FOR_CHAT = "getUsersForChat",
    IS_VALID_USER = "isValidUser",
    GET_APPLICATIONS_OF_USER = "getApplicationsOfUser",
    GET_MESSAGES = "getMessages",
    GET_QUALIFICATIONS = "getQualifications",
    GET_CITIES = "getCities",
    GET_ROLES = "getRoles"
}

export const VACANCY_LIMIT = [
    "0-10",
    "10-50",
    "50-100",
    "100-500",
    "500+"
] 