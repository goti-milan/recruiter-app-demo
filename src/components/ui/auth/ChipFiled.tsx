import { Chip, ChipProps } from "primereact/chip";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ChipFieldProps extends ChipProps {
    ChipFieldStyle?: string;
    onRemove: () => any;
}

const ChipField: React.FC<ChipFieldProps> = ({
    ChipFieldStyle,
    onRemove,
    ...rest
}) => {
    const customChip = () => {
        return (
            <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-black">{rest.label}</p>
                <i
                    className="pi pi-times bg-[#9E9E9E] border-none rounded-full p-1 text-xs text-white cursor-pointer"
                    onClick={onRemove}
                ></i>
            </div>
        );
    };

    return (
        <div className={twMerge("", ChipFieldStyle)}>
            <Chip
                pt={{
                    root: {
                        className: "rounded-lg bg-[#F2F2F2] py-2 px-3",
                    },
                }}
                {...rest}
                template={customChip}
            />
        </div>
    );
};

export default ChipField;
