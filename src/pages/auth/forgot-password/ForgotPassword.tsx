import AuthButton from "@/components/ui/auth/AuthButton";
import AuthPassword from "@/components/ui/auth/AuthPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ForgotPasswordField, forgotPasswordSchema } from "../../../types/auth.types";
import { LOGIN } from "@/routes";
import { forgotPassword } from "@/helpers/apis/auth";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { showToast } from "@/helpers/helper";

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const forgotPasswordForm = useForm<ForgotPasswordField>({
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        mode: "onChange",
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordField) => {
        setIsLoading(true);
        try {
            const response = await forgotPassword(data.newPassword);
            if (response) {
                navigate(LOGIN);
                showToast("success", response.data);
                forgotPasswordForm.reset();
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
                    Reset Password
                </p>
                <p className="lg:text-lg text-md text-[#313957]">
                    Rediscover your account with new Password
                </p>
            </div>

            <form className="w-full flex flex-col gap-4">
                <Controller
                    name="newPassword"
                    control={forgotPasswordForm.control}
                    render={({ field }) => (
                        <AuthPassword
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="new-password"
                            type="password"
                            placeholder="New Password"
                            label="New Password"
                            errorMsg={
                                forgotPasswordForm.formState.errors.newPassword
                            }
                        />
                    )}
                />
                <Controller
                    name="confirmNewPassword"
                    control={forgotPasswordForm.control}
                    render={({ field }) => (
                        <AuthPassword
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="confirm-new-password"
                            type="password"
                            placeholder="Confirm New Password"
                            label="Confirm New Password"
                            errorMsg={
                                forgotPasswordForm.formState.errors
                                    .confirmNewPassword
                            }
                        />
                    )}
                />
                <AuthButton
                    type="submit"
                    disabled={isLoading}
                    customStyle="mt-4"
                    onClick={forgotPasswordForm.handleSubmit(onSubmit)}
                >
                    {isLoading ? <ButtonLoader isVisible={isLoading} /> : "Reset"}
                </AuthButton>
            </form>
        </div>
    );
};

export default ForgotPassword;
