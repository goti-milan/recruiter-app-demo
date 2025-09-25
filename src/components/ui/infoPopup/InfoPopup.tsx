import { useState, useEffect, useRef, ReactNode } from "react";

// Define TypeScript interface for props
interface InfoPopupProps {
    title?: string;
    content?: ReactNode;
    icon?: ReactNode;
    iconText?: string;
    width?: string;
}

// Reusable InfoPopup component that can display any content
const InfoPopup: React.FC<InfoPopupProps> = ({
    content = null,
    icon = (
        <i className="text-xs text-[#8C8C8C] pi pi-info-circle cursor-pointer"></i>
    ),
    iconText = "",
    width = "w-64",
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    // Close popup when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        // Add event listener when popup is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const togglePopup = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="relative inline-block"
            ref={popupRef}
        >
            <div
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={togglePopup}
            >
                {icon}
                {iconText && <span className="text-xs">{iconText}</span>}
            </div>

            {isOpen && (
                <div
                    className={`absolute z-10 mt-2 ${width} bg-white rounded-md shadow-lg p-2 border border-gray-200 md:text-xs text-[10px] text-[#525252]`}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default InfoPopup;
