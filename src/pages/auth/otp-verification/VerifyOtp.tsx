import AuthButton from "@/components/ui/auth/AuthButton";
import AuthOtp from "@/components/ui/auth/AuthOtp";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import {
    forgotPasswordVerifyOtp,
    sendVerificationMail,
    verifyOtp,
} from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import { ACCOUNT_SETUP, LOGIN, RESET_PASSWORD } from "@/routes";
import { InputOtpChangeEvent } from "primereact/inputotp";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const VerifyOtp: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [otp, setOtp] = useState<number | undefined | null | string>(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60); // new state variable for countdown
    const [isResendEnabled, setIsResendEnabled] = useState(false); // new state variable to enable/disable resend button

    const onSubmitVerification = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp?.toString().length !== 4) {
            setInvalidOtp(true);
        } else {
            setIsLoading(true);
            try {
                if (state?.type === "forgot-password") {
                    const response = await forgotPasswordVerifyOtp(
                        state?.email,
                        otp as string
                    );
                    if (response) {
                        showToast("success", response.data);
                        navigate(RESET_PASSWORD);
                    }
                } else {
                    const response = await verifyOtp(
                        state?.email,
                        otp as string
                    );
                    if (response) {
                        showToast("success", response.data);
                        navigate(ACCOUNT_SETUP);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
    };

    const resendOtp = async () => {
        try {
            const response = await sendVerificationMail(state?.email);
            if (response) {
                showToast("success", "OTP sent successfully");
                setCountdown(60); // reset countdown to 60 seconds
                setIsResendEnabled(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                setIsResendEnabled(true);
            }
        }, 1000); // decrement countdown every second
        return () => clearInterval(intervalId);
    }, [countdown]);

    useEffect(() => {
        if (!state?.email) {
            navigate(LOGIN);
        }
    }, [state?.type]);

    return (
        <div className="flex flex-col justify-start items-center gap-10 lg:w-3/5 md:w-4/5 w-full">
            <div className="flex flex-col gap-4 w-full">
                <p className="lg:text-4xl text-3xl font-medium text-[#0C1421]">
                    OTP Verification!
                </p>
                <p className="lg:text-lg text-md text-[#313957]">
                    Enter the OTP code from the registered email{" "}
                    <span className="font-semibold">{state?.email}</span> we
                    just sent you.
                </p>
            </div>

            <form className="w-full flex flex-col gap-4">
                <AuthOtp
                    invalid={invalidOtp}
                    length={4}
                    InputOtpContainerStyle="mb-4"
                    integerOnly
                    onChange={(e: InputOtpChangeEvent) => {
                        if (e.value != 4) {
                            setInvalidOtp(false);
                        } else {
                            setInvalidOtp(true);
                        }
                        setOtp(e.value);
                    }}
                />
                <div>
                    {isResendEnabled ? (
                        <span
                            className="font-medium text-primary cursor-pointer w-full text-left"
                            onClick={resendOtp}
                        >
                            Resend
                        </span>
                    ) : (
                        <span className="text-left text-gray-500 w-full font-medium">
                            Resend in {countdown} seconds
                        </span>
                    )}
                </div>
                <AuthButton
                    type="submit"
                    disabled={isLoading}
                    customStyle="mt-4"
                    onClick={onSubmitVerification}
                >
                    {isLoading ? (
                        <ButtonLoader isVisible={isLoading} />
                    ) : (
                        "Verify"
                    )}
                </AuthButton>

                <span className="text-sm text-gray-500">
                    The OTP for login may land in your spam folder
                </span>
            </form>
        </div>
    );
};

export default VerifyOtp;
