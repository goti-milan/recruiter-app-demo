import ResetPasswordIcon from "@/assets/svg/reset-password/reset-password.svg";
import { ResetPasswordField } from "@/types/auth.types";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import AuthPassword from "../auth/AuthPassword";
import PrimaryButton from "../buttons/PrimaryButton";
import ButtonLoader from "../loader/ButtonLoader";
interface ResetPasswordModalProps {
    isLoading: boolean;
    resetPasswordForm: ReturnType<typeof useForm<ResetPasswordField>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    isLoading,
    resetPasswordForm,
    visible,
    setVisible,
    onClick,
}) => {
    return (
        <Dialog
            visible={visible}
            modal
            onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}
            className="lg:max-w-[40vw] md:!w-4/5 !w-screen !max-h-full lg:overflow-visible md:!rounded-2xl !rounded-none overflow-auto"
            content={({ hide }) => (
                <div className="relative w-full md:!h-auto !h-screen flex items-center justify-center bg-white md:rounded-2xl px-6 py-10">
                    <div className="lg:w-[350px] flex flex-col items-center gap-6 font-manrope">
                        <img
                            src={ResetPasswordIcon}
                            alt="reset-password"
                            className="w-20 h-20 aspect-square"
                        />
                        <h2 className="text-4xl font-semibold text-black">
                            Reset Password
                        </h2>
                        <p className="text-base text-[#7E7E7E] font-medium text-center">
                            Your new password must be unique from those previously used.
                        </p>

                        <form className="w-full flex flex-col gap-4">
                            <Controller
                                name="oldPassword"
                                control={resetPasswordForm.control}
                                render={({ field }) => (
                                    <AuthPassword
                                        value={field.value}
                                        onChange={field.onChange}
                                        autoComplete="old-password"
                                        type="password"
                                        placeholder="Old Password"
                                        label="Old Password"
                                        errorMsg={
                                            resetPasswordForm.formState.errors.oldPassword
                                        }
                                    />
                                )}
                            />

                            <Controller
                                name="newPassword"
                                control={resetPasswordForm.control}
                                render={({ field }) => (
                                    <AuthPassword
                                        value={field.value}
                                        onChange={field.onChange}
                                        autoComplete="new-password"
                                        type="password"
                                        placeholder="New Password"
                                        label="New Password"
                                        errorMsg={
                                            resetPasswordForm.formState.errors.newPassword
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="confirmNewPassword"
                                control={resetPasswordForm.control}
                                render={({ field }) => (
                                    <AuthPassword
                                        value={field.value}
                                        onChange={field.onChange}
                                        autoComplete="confirm-new-password"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        label="Confirm New Password"
                                        errorMsg={
                                            resetPasswordForm.formState.errors
                                                .confirmNewPassword
                                        }
                                    />
                                )}
                            />
                            <PrimaryButton
                                className="mt-3"
                                type="button"
                                disabled={isLoading}
                                onClick={onClick}
                            >
                                {isLoading ? <ButtonLoader isVisible={isLoading} /> : "Update"}
                            </PrimaryButton>
                        </form>
                    </div>

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#F0F0F0] absolute z-10 top-4 right-4"
                        onClick={hide}
                    >
                        <i className="pi pi-times"></i>
                    </button>
                </div>
            )}
        ></Dialog>
    );
};

export default ResetPasswordModal;
