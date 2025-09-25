import { Dialog } from "primereact/dialog";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

interface CompleteProfileModalProps {
    header: string;
    message: string;
    onClick?: () => void;
    buttonLabel?: string
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
    header,
    message,
    onClick,
    buttonLabel
}) => {
    return (
        <Dialog
            visible={true}
            modal
            onHide={() => { }}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}
            className="lg:max-w-[40vw] !w-[90vw]"
            content={() => (
                <div className="relative w-full flex items-center justify-center bg-white rounded-2xl px-6 py-10">
                    <div className=" flex flex-col items-center gap-8 font-manrope">
                       
                        <h2 className="text-2xl font-semibold text-black">
                            {header}
                        </h2>
                        <p className="text-base text-[#424242] font-medium text-center">
                            {message}
                        </p>

                        <PrimaryButton
                            onClick={onClick}
                            className="w-1/3"
                        >
                            {buttonLabel}
                        </PrimaryButton>
                    </div>

                    
                </div>
            )}
        ></Dialog>
    );
};

export default CompleteProfileModal;
