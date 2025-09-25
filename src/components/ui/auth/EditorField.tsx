import { Editor, EditorProps } from "primereact/editor";
import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "primereact/skeleton";
import Star from "@/assets/svg/page-not-found/Star";
interface EditorFieldProps extends EditorProps {
    className?: string;
    isLoading?: boolean;
}

const EditorField: React.FC<EditorFieldProps> = ({ isLoading, ...rest }) => {
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                {/* <select className="ql-font"></select> */}
                <select className="ql-size"></select>

                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>

                <button
                    className="ql-list"
                    value="ordered"
                ></button>
                <button
                    className="ql-list"
                    value="bullet"
                ></button>

                <select className="ql-align"></select>

                <button className="ql-link"></button>
                <button className="ql-image"></button>

                {/* <button className="ql-formula"></button> */}
                <button className="ql-code"></button>
                <button className="ql-clean"></button>
            </span>
        );
    };

    const renderSkeleton = () => {
        return (
            <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-4 flex items-center gap-2">
                    <Star />
                    <motion.p className="text-lg bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent font-semibold">
                        Generating by AI
                    </motion.p>
                </div>

                {/* Content skeleton */}
                <div className="flex flex-col p-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                    >
                        <Skeleton
                            width="100%"
                            animation="wave"
                            height="0.8rem"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-3"
                    >
                        <Skeleton
                            width="100%"
                            animation="wave"
                            height="0.6em"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Skeleton
                            width="100%"
                            animation="wave"
                            height="0.4rem"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Skeleton
                            width="100%"
                            animation="wave"
                            height="0.4rem"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Skeleton
                            width="100%"
                            animation="wave"
                            height="0.4rem"
                        />
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-field p-3 rounded-2xl max-h-full">
            {isLoading ? (
                renderSkeleton()
            ) : (
                <Editor
                    {...rest}
                    headerTemplate={renderHeader()}
                    className="h-full border-none rounded-2xl"
                    pt={{
                        content: {
                            className:
                                "create-job-editor !border-none !font-manrope",
                        },
                        toolbar: {
                            className: "!border-none bg-white rounded-xl",
                        },
                    }}
                />
            )}
        </div>
    );
};

export default EditorField;
