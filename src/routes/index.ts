// All the routes in the app are defined here

// ==> Auth routes
export const LOGIN = "/auth";
export const REGISTER = "/auth/register";
export const VERIFY_OTP = "/auth/verify-otp";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const RESET_PASSWORD = "/auth/reset-password";

// ==> Account setup routes
export const ACCOUNT_SETUP = "/account-setup";

// ==> Main app routes
export const DASHBOARD = "/";
export const MESSAGES = "/messages";
export const JOBS = "/jobs";
export const CREATE_JOB = "/jobs/create-job";
export const EDIT_JOB = "/jobs/edit";
export const PREVIEW_JOB = "/jobs/preview";
export const PROFILE = "/profile";
export const SUPPORT = "/support";


// ** COMPANY
export const CREATE_PROFILE = "/profile/create-profile";
export const EDIT_PROFILE = CREATE_PROFILE;


// ==> Other routes
export const CODE_OF_CONDUCT = "/code-of-conduct";
export const TERMS_AND_CONDITIONS = "/terms-and-conditions";
export const PRIVACY_POLICY = "/privacy-policy";

// ==> Saral AI routes
export const SARAL_AI = "/saral-ai";
export const SARAL_AI_RESULT = "/saral-ai/result";
export const SARAL_AI_NEW_CHAT = "/saral-ai/new";
export const SARAL_AI_LINKEDIN_CAMPAIGN = "/saral-ai/linkdin-campaign";
export const SARAL_AI_SAVED_CAMPAIGNS = "/saral-ai/saved-campaigns";