import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import ButtonLoader from "../loader/ButtonLoader";

interface ConfirmShortlistModalProps {
    avatar: string;
    name: string;
    jobTitle?: string;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: () => void;
    isLoading?: boolean;
}

const ConfirmShortlistModal: React.FC<ConfirmShortlistModalProps> = ({
    avatar,
    name,
    jobTitle,
    visible,
    setVisible,
    onClick,
    isLoading,
}) => {
    return (
        <Dialog
            onHide={() => {}}
            visible={visible}
            modal
            onClick={(e) => {
                e.stopPropagation();
            }}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}
            className="lg:max-w-[40vw] md:!w-4/5 !w-[90vw]"
            content={() => (
                <div className="relative w-full flex items-center justify-center bg-white rounded-2xl px-6 py-10">
                    <div className="w-[340px] flex flex-col items-center gap-8 font-manrope">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Avatar
                                label={name?.charAt(0)}
                                size="large"
                                image={avatar}
                                shape="circle"
                                style={{
                                    backgroundColor: "var(--color-field)",
                                }}
                                pt={{ image: { className: "rounded-full" } }}
                                className="border border-primary !w-16 !h-16 aspect-square"
                            />
                            <h4 className="text-2xl font-semibold text-black w-full">
                                {name?.charAt(0).toUpperCase() +
                                    name?.slice(1).toLowerCase()}
                            </h4>
                        </div>
                        <h2 className="md:text-4xl text-3xl font-semibold text-black w-full">
                            Willing to proceed?
                        </h2>
                        <p className="text-base text-[#424242] font-medium text-center">
                            {`Are you interested in hiring the user for the ${jobTitle} job role?`}
                        </p>

                        <PrimaryButton
                            disabled={isLoading}
                            onClick={onClick}
                        >
                            {isLoading ? (
                                <ButtonLoader isVisible />
                            ) : (
                                "Yes, Interested"
                            )}
                        </PrimaryButton>
                    </div>

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#F0F0F0] absolute z-10 top-4 right-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            setVisible(false);
                        }}
                    >
                        <i className="pi pi-times"></i>
                    </button>
                </div>
            )}
        ></Dialog>
    );
};

export default ConfirmShortlistModal;
