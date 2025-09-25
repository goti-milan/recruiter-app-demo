import { NoProfile } from "@/assets/images";
import CheckIcon from "@/assets/svg/CheckIcon";
import VerticalLineIcon from "@/assets/svg/dashboard/vertical-line.svg";
import {
    createApplication,
    updateApplicationStatus,
} from "@/helpers/apis/applications";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import queryClient from "@/helpers/query.config";
import {
    ApplicationStatus,
    SuggestedUserWithApplicationData,
} from "@/types/applications.types";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "../buttons/PrimaryButton";
import ConfirmShortlistModal from "../modals/ConfirmShortlistModal";
import HeadScore from "../progressbar/HeadScore";

export type TabFooterBtnType =
    | "AI_RECOMMENDED"
    | "APPLIED"
    | "SHORTLISTED"
    | "ACCEPTED_REJECTED";

export interface ApplicationCardProps {
    data: SuggestedUserWithApplicationData;
    jobTitle?: string;
    btnType?: TabFooterBtnType;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
    data,
    jobTitle,
    btnType = "APPLIED",
}) => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [confirmShortlist, setConfirmShortlist] = useState(false);
    const [shortlisteLoader, setShortlisteLoader] = useState(false);

    const handleShortlist = async () => {
        setShortlisteLoader(true);
        try {
            if (btnType === "AI_RECOMMENDED") {
                const response = await createApplication({
                    jobId: data.job?.id || jobId!,
                    userId: data.user.id,
                });
                if (response) {
                    showToast("success", response.data);
                    navigate(`/jobs/${jobId}/applications/shortlisted`);
                }
            } else if (btnType === "APPLIED") {
                if (!data.id) return;
                const response = await updateApplicationStatus({
                    applicationId: data.id,
                    status: ApplicationStatus.shortListed,
                });
                if (response) {
                    showToast("success", response.data);
                    navigate(`/jobs/${jobId}/applications/shortlisted`);
                }
            }
            setConfirmShortlist(false);
        } catch (error) {
            console.error(error);
        }
        setShortlisteLoader(false);
    };

    const openApplication = () => {
        if (confirmShortlist) return;
        let tabStatus = null;
        if (data.status === ApplicationStatus.shortListed)
            tabStatus = "shortlisted";
        else if (data.status === ApplicationStatus.pending)
            tabStatus = "applied";
        else if (
            data.status === ApplicationStatus.accepted ||
            data.status === ApplicationStatus.rejected
        )
            tabStatus = "accepted-rejected";

        const applicationPath =
            "/jobs/" +
            data.job?.id +
            "/applications/" +
            (tabStatus + "/" + data.id);
        navigate(
            `${btnType === "AI_RECOMMENDED" ? data.user.id : applicationPath}`
        );

        queryClient.removeQueries({
            queryKey: [USE_QUERY_KEYS.GET_ONE_APPLICATION],
        });
    };

    return (
        <Card
            pt={{
                root: {
                    className:
                        "h-full rounded-2xl font-manrope bg-[#F6F6F6] hover:bg-field shadow-none cursor-pointer transition-all duration-300 ease-in-out",
                },
                body: {
                    className: "h-full lg:p-5 p-4",
                },
                content: {
                    className: "h-full p-0",
                },
            }}
            onClick={openApplication}
        >
            <div className="w-full h-full flex flex-col items-start justify-between md:gap-3 gap-1">
                <div className="w-full flex flex-col items-start justify-start md:gap-3 gap-1">
                    {/* <div className="w-full flex flex-wrap lg:items-center items-end md:gap-x-3 md:gap-y-1 justify-between"> */}
                    <div className="flex flex-row items-center justify-start md:gap-4 gap-2 text-black w-full">
                        <div className="flex items-center justify-start gap-4 lg:max-w-10/12 md:max-w-3/4 max-w-11/12 w-auto">
                            <Avatar
                                label={data.user.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                                image={data.user.avatar || NoProfile}
                                size="large"
                                shape="circle"
                                style={{
                                    backgroundColor: "var(--color-field)",
                                }}
                                pt={{
                                    image: {
                                        className: "rounded-full",
                                    },
                                }}
                                className="shrink-0 border border-primary md:!w-12 !w-10 md:!h-12 !h-10 flex items-center justify-center"
                            />
                            <h3 className="md:text-2xl text-xl flex-1 font-semibold truncate break-words">
                                {data.user.name?.charAt(0).toUpperCase() +
                                    data.user.name?.slice(1).toLowerCase()}
                            </h3>
                        </div>
                        {/* inactive color => #D60000 */}
                        <p className="flex items-center gap-1 md:text-base text-xs font-medium">
                            <span
                                className={`md:w-2 w-1.5 md:h-2 h-1.5 rounded-full ${data.user.isActive
                                        ? "bg-[#1CD637]"
                                        : "bg-[#D60000]"
                                    }`}
                            ></span>{" "}
                            <span className="md:block hidden">
                                {data.user.isActive ? "Active" : "Inactive"}
                            </span>
                        </p>
                    </div>
                    {/* <div className="text-black font-medium bg-white md:px-4 px-2 py-2 md:text-base text-xs rounded-xl text-nowrap">
                            {moment(data.date.toString()).format(
                                "DD MMM, YYYY"
                            )}
                        </div> */}
                    {/* </div> */}

                    <h4 className="md:text-lg text-sm text-black font-semibold">
                        {data.roleName}
                    </h4>

                    <div className="w-full text-black font-medium flex flex-row items-center justify-start gap-4">
                        {(data.user.experience !== null ||
                            data.user.experience !== undefined) && (
                                <>
                                    {data.user.experience === 0 ? (
                                        <p className="text-base font-bold">
                                            Fresher
                                        </p>
                                    ) : (
                                        <div className="space-y-0.5">
                                            <p className="md:text-xl text-base font-bold">
                                                {data.user.experience}{" "}
                                                <span className="md:text-base text-xs">
                                                    Years
                                                </span>
                                            </p>
                                            <p className="text-[#393939] md:text-base text-xs">
                                                Experience
                                            </p>
                                        </div>
                                    )}
                                    <img
                                        src={VerticalLineIcon}
                                        alt="vertical-line"
                                        className="lg:block hidden"
                                    />
                                </>
                            )}
                        <div className="md:space-y-0.5 space-y-1 w-3/5 md:text-base text-xs">
                            <p className="truncate w-full">{data.user.email}</p>
                            <p>
                                {data.user.countryCode} {data.user.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-wrap md:gap-x-6 gap-y-2 items-center justify-between">
                    <div className="text-black flex items-center justify-start">
                        <HeadScore
                            size={window.innerWidth < 425 ? 100 : 130}
                            value={
                                data.test?.headScore === null
                                    ? 0
                                    : data.test?.headScore
                            }
                        />
                        <div className="flex flex-col">
                            <p className="md:text-base text-sm font-bold">
                                Head Score
                            </p>
                            <p className="flex items-center gap-1 md:text-sm text-xs font-medium text-[#666666]">
                                Exp:{" "}
                                <span className="text-black">
                                    {data.test?.experience} Year
                                </span>
                                <Tooltip
                                    target=".custom-target-icon"
                                    pt={{
                                        root: { className: "rounded-2xl p-0" },
                                        text: {
                                            className:
                                                "text-sm text-[#5B5B5B] bg-white max-w-60 ",
                                        },
                                    }}
                                />
                                <i
                                    className="custom-target-icon pi pi-info-circle cursor-pointer"
                                    data-pr-tooltip={`The assessment test has been given with ${data.test?.experience} year of experience.`}
                                    data-pr-position="top"
                                    data-pr-at="right-5 top"
                                ></i>
                            </p>
                        </div>
                    </div>

                    {getFooterBtns(btnType, setConfirmShortlist, data)}
                </div>

                <ConfirmShortlistModal
                    avatar={data.user.avatar || NoProfile}
                    jobTitle={jobTitle}
                    name={data.user.name}
                    visible={confirmShortlist}
                    setVisible={setConfirmShortlist}
                    onClick={() => handleShortlist()}
                    isLoading={shortlisteLoader}
                />
            </div>
        </Card>
    );
};

export default ApplicationCard;

// Open Confirm Shortlist Modal
const AppliedBtns = ({
    setConfirmShortlist,
    label = "Shortlist",
}: {
    setConfirmShortlist: (value: boolean) => void;
    label?: string;
}) => {
    return (
        <PrimaryButton
            label={label}
            className="lg:w-[140px] w-full h-[40px] bg-black hover:bg-[#333333]"
            onClick={(e) => {
                e.stopPropagation();
                setConfirmShortlist(true);
            }}
        />
    );
};

const ShortlistedBtns = ({
    setConfirmShortlist,
    data,
}: {
    setConfirmShortlist: (value: boolean) => void;
    data: SuggestedUserWithApplicationData;
}) => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const handleApplicationAcceptReject = async (status: ApplicationStatus) => {
        try {
            if (!data?.id) return;

            const response = await updateApplicationStatus({
                applicationId: data?.id,
                status: status,
            });
            if (response) {
                showToast("success", response.data);
                navigate(`/jobs/${jobId}/applications/accepted-rejected`);
            }
            setConfirmShortlist(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-end gap-4 w-full">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleApplicationAcceptReject(ApplicationStatus.rejected);
                }}
                className="w-10 h-10 flex items-center justify-center bg-[#FFD3D3] text-[#D60000] rounded-xl"
            >
                <i className="pi pi-times md:text-base text-sm"></i>
            </button>
            <PrimaryButton
                labelStyle="md:text-base text-sm"
                label="Accept"
                icon={<CheckIcon />}
                className="lg:w-[150px] w-1/3 h-[40px] bg-[#2F2F2F]"
                onClick={(e) => {
                    e.stopPropagation();
                    handleApplicationAcceptReject(ApplicationStatus.accepted);
                }}
            />
        </div>
    );
};

const AcceptedRejectedBtn: React.FC<{ isAccepted?: boolean }> = ({
    isAccepted = false,
}) => {
    return (
        <p
            className={twMerge(
                "text-base font-semibold px-6 py-2 rounded-lg",
                isAccepted
                    ? "text-[#009C17] bg-[#E4FFE8]"
                    : "text-[#D60000] bg-[#FFE3E3]"
            )}
        >
            {isAccepted ? "Accepted" : "Rejected"}
        </p>
    );
};

const getFooterBtns = (
    type: TabFooterBtnType = "APPLIED",
    setConfirmShortlist: (value: boolean) => void,
    data: SuggestedUserWithApplicationData
) => {
    if (type === "AI_RECOMMENDED")
        return <PrimaryButton
            label="Invite to Apply"
            className="lg:w-[140px] w-full h-[40px] bg-[#19AD09] hover:bg-[#159208]"
            onClick={(e) => {
                e.stopPropagation();
                setConfirmShortlist(true);
            }}
        />
    if (
        data.status === ApplicationStatus.rejected ||
        data.status === ApplicationStatus.accepted
    )
        return (
            <AcceptedRejectedBtn
                isAccepted={data.status === ApplicationStatus.accepted}
            />
        );
    else if (data.status === ApplicationStatus.shortListed)
        return (
            <ShortlistedBtns
                setConfirmShortlist={setConfirmShortlist}
                data={data}
            />
        );
    else if (data.status === ApplicationStatus.pending)
        return <AppliedBtns setConfirmShortlist={setConfirmShortlist} />;
};
