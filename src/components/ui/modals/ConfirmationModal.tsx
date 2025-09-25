import { Dialog } from "primereact/dialog";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import ButtonLoader from "../loader/ButtonLoader";

interface ConfirmationModalProps {
    isLoading?: boolean;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    header: string;
    message: string;
    onClick?: () => void;
    image?: string;
    buttonLabel?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isLoading,
    visible,
    setVisible,
    header,
    message,
    onClick,
    image,
    buttonLabel
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
            className="lg:max-w-[40vw] md:!w-1/2 !w-[90vw]"
            content={({ hide }) => (
                <div className="relative w-full flex items-center justify-center bg-white rounded-2xl px-6 py-10">
                    <div className="w-[320px] flex flex-col items-center gap-8 font-manrope">
                        {image && <img
                            src={image}
                            alt="confirmation"
                            className="w-20 h-20 aspect-square"
                        />}
                        <h2 className="text-4xl font-semibold text-black">
                            {header}
                        </h2>
                        <p className="text-base text-[#424242] font-medium text-center">
                            {message}
                        </p>

                        <PrimaryButton
                            disabled={isLoading}
                            onClick={onClick}
                        >
                            {isLoading ? <ButtonLoader isVisible={isLoading} /> : (buttonLabel || "Yes, Logout")}
                        </PrimaryButton>
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

export default ConfirmationModal;
