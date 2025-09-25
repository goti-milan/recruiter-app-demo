import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { sendVerificationMail } from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import { VERIFY_OTP } from "@/routes";
import {
    EmailVerificationField,
    emailVerificationSchema,
} from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const emailVerificationForm = useForm<EmailVerificationField>({
        mode: "onChange",
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(emailVerificationSchema),
    });

    const onSubmit = async (data: EmailVerificationField) => {
        setIsLoading(true);
        try {
            const response = await sendVerificationMail(data.email);
            if (response) {
                showToast("success", "OTP sent successfully");
                navigate(VERIFY_OTP, {
                    state: { email: data?.email, type: "forgot-password" },
                });
                emailVerificationForm.reset();
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col justify-start items-center gap-10 lg:w-3/5 md:w-4/5 w-full">
            <div className="flex flex-col gap-4 w-full">
                <p className="lg:text-4xl text-3xl font-medium text-[#0C1421]">
                    Forgot Password
                </p>
                <p className="lg:text-lg text-md text-[#313957]">
                    Please enter your registered email address to reset your
                    password.
                </p>
            </div>

            <form className="w-full flex flex-col gap-4">
                <AuthInput
                    register={emailVerificationForm.register("email")}
                    type="email"
                    placeholder="Example@email.com"
                    label="Email"
                    errorMsg={emailVerificationForm.formState.errors.email}
                />
                <AuthButton
                    type="submit"
                    disabled={isLoading}
                    onClick={emailVerificationForm.handleSubmit(onSubmit)}
                    customStyle="mt-4"
                >
                    {isLoading ? (
                        <ButtonLoader isVisible={isLoading} />
                    ) : (
                        "Send OTP"
                    )}
                </AuthButton>
            </form>
        </div>
    );
};

export default EmailVerification;
