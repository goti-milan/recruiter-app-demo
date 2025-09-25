import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPatch, ApiPost } from "../api-helper";

/* <----- Register -----> */
export const createUser = async (email: string, password: string) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            "/company/register",
            { email, password }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Login -----> */
export const loginUser = async (email: string, password: string) => {
    try {
        const result = await ApiPost<ApiResponse<{ isEmailVerified: boolean }>>(
            "/company/login",
            { email, password }
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* <----- Email Verification -----> */
export const sendVerificationMail = async (email: string) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            `/company/send-email-verification`,
            { email }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Login Otp Verification -----> */
export const verifyOtp = async (email: string, otp: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/company/verify-email`,
            { email, otp }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Forgot Password Otp Verification -----> */
export const forgotPasswordVerifyOtp = async (email: string, otp: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/company/forgot-password-verify-otp`,
            { email, otp }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Forgot Password -----> */
export const forgotPassword = async (password: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/company/forgot-password`,
            { password }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Reset Password -----> */
export const resetPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/company/reset-password`,
            { oldPassword, newPassword }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Logout -----> */
export const logoutUser = async () => {
    try {
        const result = await ApiGet<ApiResponse<string>>(
            "/company/logout"
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Get company auth -----> */
export const getCompanyAuth = async () => {
    try {
        const result = await ApiGet<ApiResponse<string>>(
            "/company/auth"
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}
