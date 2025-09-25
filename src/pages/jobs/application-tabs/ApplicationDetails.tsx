import { NoProfile, NotShortlisted } from "@/assets/images";
import CertificateIcon from "@/assets/svg/application/certificate";
import WebsiteIcon from "@/assets/svg/application/WebsiteIcon";
import CheckIcon from "@/assets/svg/CheckIcon";
import VerticalLineIcon from "@/assets/svg/dashboard/vertical-line.svg";
import LinkedinIcon from "@/assets/svg/LinkedinIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Loader from "@/components/ui/loader/Loader";
import ConfirmShortlistModal from "@/components/ui/modals/ConfirmShortlistModal";
import HeadScore from "@/components/ui/progressbar/HeadScore";
import TimeLineField from "@/components/ui/timeline/TimeLineField";
import {
    createApplication,
    getApplicationDetails,
    updateApplicationStatus,
} from "@/helpers/apis/applications";
import { getMessages, sendMessage } from "@/helpers/apis/message";
import { APPLICATION_TABS_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import { getTimeOrDate, showToast } from "@/helpers/helper";
import {
    ApplicationStatus,
    EducationTable,
    WorkExperienceTable,
} from "@/types/applications.types";
import { Message, UserType } from "@/types/message.types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Avatar } from "primereact/avatar";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";

const ApplicationDetails: React.FC<{ tab: string }> = ({ tab }) => {
    const navigate = useNavigate();
    const { id, userId, jobId } = useParams();

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const [selectedTab, setSelectedTab] = useState("education");
    const [confirmShortlist, setConfirmShortlist] = useState(false);
    const [shortlisteLoader, setShortlisteLoader] = useState(false);

    const GetOneApplication = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_ONE_APPLICATION, tab],
        queryFn: async () =>
            await getApplicationDetails({
                jobId: jobId!,
                applicationId: id!,
                userId: userId!,
                tab: tab,
            }),
    });

    const messagesFromServer = useQuery({
        queryKey: [GetOneApplication],
        queryFn: () =>
            getMessages({
                applicationId: GetOneApplication.data?.application?.id,
                page: 1,
                pageSize: 10,
            }),
        enabled: !!GetOneApplication.data?.application?.id,
    });

    const customizedMarkerEducation = (item: EducationTable) => {
        return (
            <div className="flex flex-col gap-1.5">
                {item.startYear && (
                    <p className="text-sm font-light text-[#525252]">
                        {item.startYear} -{" "}
                        {item.endYear === null ? "Present" : item.endYear}
                    </p>
                )}
                {item.instituteName && (
                    <p className="font-semibold">{item.instituteName}</p>
                )}
                {item.course && (
                    <p className="text-sm font-medium text-[#525252]">
                        {item.course}
                    </p>
                )}
            </div>
        );
    };

    const customizedMarkerExperience = (item: WorkExperienceTable) => {
        return (
            <div className="flex flex-col gap-1.5">
                {item.startYear && (
                    <p className="text-sm font-light text-[#525252]">
                        {item.startYear} -{" "}
                        {item.endYear === null ? "Present" : item.endYear}
                    </p>
                )}
                {item.jobTitle && (
                    <p className="font-semibold">{item.jobTitle}</p>
                )}
                <ul className="flex list-disc gap-x-6">
                    {item.companyName && (
                        <li className="text-sm font-medium text-[#525252] first:list-none">
                            {item.companyName}
                        </li>
                    )}
                    {item.jobType && (
                        <li className="text-sm font-medium text-[#525252]">
                            {item.jobType.charAt(0).toUpperCase() +
                                item.jobType.slice(1).toLowerCase()}
                        </li>
                    )}
                </ul>
                {item.jobDescription && (
                    <p className="text-sm text-[#525252] line-clamp-3">
                        {item.jobDescription}
                    </p>
                )}
            </div>
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        try {
            if (
                inputMessage.trim() !== "" &&
                GetOneApplication.data?.application?.id
            ) {
                const newMessage: Message = {
                    message: inputMessage,
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    sender: UserType.company,
                };
                setMessages((prev) => [newMessage, ...prev]);
                await sendMessage({
                    applicationId: GetOneApplication.data?.application?.id,
                    message: inputMessage,
                });
                setInputMessage("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleShortlist = async () => {
        setShortlisteLoader(true);
        try {
            if (tab === APPLICATION_TABS_TYPE.AI_RECOMMENDED) {
                const response = await createApplication({
                    jobId: jobId!,
                    userId: userId!,
                });
                if (response) {
                    showToast("success", response.data);
                    navigate(`/jobs/${jobId}/applications/shortlisted`);
                }
            } else if (tab === APPLICATION_TABS_TYPE.APPLIED) {
                if (!GetOneApplication?.data?.application?.id) return;
                const response = await updateApplicationStatus({
                    applicationId: GetOneApplication.data.application.id,
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

    const handleApplicationAcceptReject = async (status: ApplicationStatus) => {
        try {
            if (!GetOneApplication?.data?.application?.id) return;

            const response = await updateApplicationStatus({
                applicationId: GetOneApplication?.data?.application?.id,
                status: status,
            });
            if (response) {
                showToast("success", response.data);
                navigate(
                    `/jobs/${GetOneApplication?.data?.job?.id}/applications/accepted-rejected`
                );
            }
            setConfirmShortlist(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setMessages(messagesFromServer?.data?.messages || []);
    }, [messagesFromServer.data]);

    return GetOneApplication?.isLoading ? (
        <Loader isVisible />
    ) : GetOneApplication?.data ? (
        <div className="flex lg:flex-row flex-col gap-4 h-full w-full bg-white">
            <div
                className={` flex-col lg:w-2/3 w-full rounded-2xl bg-white border border-[#E7E7E7] p-2`}
            >
                <div className="flex items-center justify-between gap-4 w-full">
                    <div
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 m-2 flex items-center justify-center rounded-md bg-[#F7FAFF] cursor-pointer"
                    >
                        <i className="pi pi-times text-sm"></i>
                    </div>
                    <div className="flex items-center justify-end md:gap-4 gap-2">
                        {tab === APPLICATION_TABS_TYPE.ACCEPTED_REJECTED && (
                            <p
                                className={twMerge(
                                    "text-base font-semibold px-6 py-2 rounded-lg",
                                    GetOneApplication.data.application
                                        ?.status === ApplicationStatus.accepted
                                        ? "text-[#009C17] bg-[#E4FFE8]"
                                        : "text-[#D60000] bg-[#FFE3E3]"
                                )}
                            >
                                {GetOneApplication.data.application?.status ===
                                ApplicationStatus.accepted
                                    ? "Accepted"
                                    : "Rejected"}
                            </p>
                        )}
                        {tab === APPLICATION_TABS_TYPE.SHORTLISTED && (
                            <>
                                <button
                                    className="flex items-center justify-center gap-2 text-xs font-medium text-[#D60000] rounded-lg border border-[#D60000] py-2 px-3"
                                    onClick={() => {
                                        handleApplicationAcceptReject(
                                            ApplicationStatus.rejected
                                        );
                                    }}
                                >
                                    <i className="pi pi-times"></i>
                                    Reject
                                </button>
                                <PrimaryButton
                                    label="Accept"
                                    labelStyle="text-xs"
                                    icon={
                                        <CheckIcon
                                            width="20"
                                            height="18"
                                        />
                                    }
                                    className="rounded-lg w-fit py-2 px-3 bg-primary gap-3"
                                    onClick={() => {
                                        handleApplicationAcceptReject(
                                            ApplicationStatus.accepted
                                        );
                                    }}
                                />
                            </>
                        )}
                        {(tab === APPLICATION_TABS_TYPE.AI_RECOMMENDED ||
                            tab === APPLICATION_TABS_TYPE.APPLIED) && (
                            <PrimaryButton
                             label="Shortlist"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmShortlist(true);
                                }}
                                labelStyle="text-xs"
                                className="rounded-lg w-fit py-2 px-3 bg-black gap-3 hover:bg-[#333333]"
                            />
                        )}
                    </div>
                </div>

                <div className="flex h-[calc(100%-45px)] flex-col md:gap-4 gap-2 overflow-auto scrollbar-hidden p-2">
                    <div className="flex flex-row items-center justify-start lg:gap-6 gap-4 text-black w-full">
                        <div className="flex items-center justify-start gap-4 md:max-w-10/12 max-w-10/12 w-auto">
                            <Avatar
                                label={GetOneApplication.data.user?.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                                image={
                                    GetOneApplication.data.user?.avatar ||
                                    NoProfile
                                }
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
                                className="shrink-0 border border-primary"
                            />
                            <div className="md:w-11/12 w-10/12">
                                <h3 className="md:text-3xl text-xl flex-1 font-semibold line-clamp-2 pb-1 break-words">
                                    {GetOneApplication.data.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        GetOneApplication.data.user?.name
                                            ?.slice(1)
                                            .toLowerCase()}
                                </h3>
                                <p className="text-[#404040] text-sm">
                                    {GetOneApplication.data.user?.gender
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        GetOneApplication.data.user?.gender
                                            ?.slice(1)
                                            .toLowerCase()}
                                </p>
                            </div>
                        </div>
                        {/* inactive color => #D60000 */}
                        <p className="flex items-center gap-1 md:text-base text-xs font-medium">
                            <span
                                className={`md:w-2 w-1.5 md:h-2 h-1.5 rounded-full ${
                                    GetOneApplication.data.user?.isActive
                                        ? "bg-[#1CD637]"
                                        : "bg-[#D60000]"
                                }`}
                            ></span>{" "}
                            {GetOneApplication.data.user?.isActive
                                ? "Active"
                                : "Inactive"}
                        </p>
                    </div>

                    <h4 className="text-lg text-black font-semibold">
                        {GetOneApplication.data.user?.roleName}
                    </h4>

                    <div className="w-full text-black font-medium flex lg:flex-row flex-col lg:items-center items-start justify-between md:gap-4 gap-2">
                        <div className="md:w-auto w-full flex flex-col justify-start md:gap-4 gap-2 items-start md:flex-row md:items-center">
                            {(GetOneApplication.data.user.experience !== null ||
                                GetOneApplication.data.user.experience !==
                                    undefined) && (
                                <>
                                    {GetOneApplication.data?.user.experience ===
                                    0 ? (
                                        <p className="text-base font-bold">
                                            Fresher
                                        </p>
                                    ) : (
                                        <div className="space-y-0.5">
                                            <p className="md:text-xl text-base font-bold">
                                                {
                                                    GetOneApplication.data?.user
                                                        .experience
                                                }{" "}
                                                <span className="md:text-base text-xs">
                                                    Years
                                                </span>
                                            </p>
                                            <p className="text-[#393939] tracking-[-1px] md:text-base text-xs">
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
                            <div className="space-y-0.5 md:w-3/4 w-full md:text-base text-xs">
                                <p className="tracking-[-1px] truncate w-full">
                                    {GetOneApplication.data?.user.email}
                                </p>
                                <p>
                                    {GetOneApplication.data?.user.countryCode}{" "}
                                    {GetOneApplication.data?.user.phone}
                                </p>
                            </div>
                        </div>
                        {(GetOneApplication.data.user?.website ||
                            GetOneApplication.data.user?.linkedIn) && (
                            <div className="flex flex-row items-center justify-end gap-2 pr-4 md:w-auto w-full">
                                {GetOneApplication.data.user?.website && (
                                    <Link
                                        to={`${GetOneApplication.data.user?.website}`}
                                        target="_blank"
                                        className="cursor-pointer"
                                    >
                                        <WebsiteIcon />
                                    </Link>
                                )}
                                {GetOneApplication.data.user.linkedIn && (
                                    <Link
                                        to={`${GetOneApplication.data.user?.linkedIn}`}
                                        target="_blank"
                                        className="flex items-center justify-center w-9 h-9 border border-[#D3D3D3]/30 rounded-full p-2 hover:bg-[#e3cbf8ad]"
                                    >
                                        <LinkedinIcon />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl bg-[#F7FAFF] p-4">
                        <div className="text-black flex md:items-end items-center justify-start">
                            <HeadScore
                                size={window.innerWidth < 425 ? 100 : 130}
                                value={
                                    GetOneApplication.data.testDetails
                                        ?.headScore
                                }
                            />
                            <div className="flex flex-col">
                                <p className="md:text-base text-sm font-bold">
                                    Head Score
                                </p>
                                <p className="flex items-center gap-1 md:text-sm text-xs font-medium text-[#666666]">
                                    Exp:{" "}
                                    <span className="text-black">
                                        {
                                            GetOneApplication.data.testDetails
                                                ?.experience
                                        }{" "}
                                        Year
                                    </span>
                                    <Tooltip
                                        target=".custom-target-icon"
                                        pt={{
                                            root: {
                                                className: "rounded-2xl p-0",
                                            },
                                            text: {
                                                className:
                                                    "text-sm text-[#5B5B5B] bg-white max-w-60 ",
                                            },
                                        }}
                                    />
                                    <i
                                        className="custom-target-icon pi pi-info-circle cursor-pointer"
                                        data-pr-tooltip={`The assessment test has been given with ${GetOneApplication.data.testDetails?.experience} year of experience.`}
                                        data-pr-position="bottom"
                                        data-pr-at="right-5 bottom"
                                    ></i>
                                </p>
                            </div>
                        </div>

                        {GetOneApplication.data.testDetails?.strenghs && (
                            <div className="flex flex-col gap-2">
                                <p className="text-base font-bold">Strengths</p>
                                <p className="md:text-sm text-xs leading-5">
                                    {
                                        GetOneApplication.data.testDetails
                                            ?.strenghs
                                    }
                                </p>
                            </div>
                        )}

                        {GetOneApplication.data.testDetails?.growthAreas && (
                            <div className="flex flex-col gap-2">
                                <p className="text-base font-bold">
                                    Growth Areas
                                </p>
                                <p className="md:text-sm text-xs leading-5">
                                    {
                                        GetOneApplication.data.testDetails
                                            ?.growthAreas
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                    {(GetOneApplication.data?.headsInResume ||
                        GetOneApplication.data?.uploadedResume ||
                        GetOneApplication.data?.user?.otherDocuments?.length >
                            0) && (
                        <div className="flex flex-col gap-5 w-full rounded-2xl bg-white border border-[#E7E7E7] p-4">
                            {(GetOneApplication.data?.headsInResume ||
                                GetOneApplication.data?.uploadedResume) && (
                                <a
                                    href={
                                        (GetOneApplication.data
                                            ?.headsInResume as string) ??
                                        (GetOneApplication.data
                                            ?.uploadedResume as string)
                                    }
                                    target="_blank"
                                    className="flex items-center gap-4"
                                >
                                    <p className="font-medium">Resume</p>
                                    <i className="pi pi-download text-primary"></i>
                                </a>
                            )}

                            {GetOneApplication.data?.user?.otherDocuments
                                ?.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">
                                        Other Certificate
                                    </p>
                                    <div className="flex flex-wrap gap-y-2 gap-x-6 items-center gap-2">
                                        {GetOneApplication.data?.user?.otherDocuments?.map(
                                            (
                                                item: {
                                                    name: string;
                                                    url: string;
                                                },
                                                index
                                            ) => (
                                                <a
                                                    key={index}
                                                    href={item.url}
                                                    target="_blank"
                                                    className="flex items-center gap-2"
                                                >
                                                    <CertificateIcon />
                                                    <p className="text-sm line-clamp-1">
                                                        {item.name}
                                                    </p>
                                                    <i className="pi pi-download text-primary text-sm"></i>
                                                </a>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center justify-start gap-2 mb-4">
                            <button
                                onClick={() => setSelectedTab("education")}
                                className={`
                                    px-3 py-1 font-medium border ${
                                        selectedTab === "education"
                                            ? "text-primary border-primary"
                                            : "border-[#8C8C8C] text-[#8C8C8C]"
                                    } rounded-full transition-colors duration-300 ease-in-out`}
                            >
                                Education
                            </button>
                            <button
                                onClick={() => setSelectedTab("experience")}
                                className={`
                                    px-3 py-1 font-medium border ${
                                        selectedTab === "experience"
                                            ? "text-primary border-primary"
                                            : "border-[#8C8C8C] text-[#8C8C8C]"
                                    } rounded-full transition-colors duration-300 ease-in-out`}
                            >
                                Experience
                            </button>
                        </div>
                        <TimeLineField
                            event={
                                selectedTab === "education"
                                    ? GetOneApplication.data.educations
                                    : GetOneApplication.data.workExperiences
                            }
                            customizedMarker={
                                selectedTab === "education"
                                    ? customizedMarkerEducation
                                    : customizedMarkerExperience
                            }
                        />
                    </div>
                </div>
            </div>

            {/* chat box */}
            <div
                className={`rounded-2xl lg:w-1/3 w-full border border-[#E7E7E7] bg-white p-4`}
            >
                <div className="flex items-center justify-between gap-3 border-b border-[#E7E7E7] pb-2">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                GetOneApplication.data.user?.avatar || NoProfile
                            }
                            alt={GetOneApplication.data.user?.name}
                            className="rounded-full aspect-square w-8 h-8"
                        />
                        <h2 className="text-xl font-semibold">
                            {GetOneApplication.data.user?.name
                                ?.charAt(0)
                                .toUpperCase() +
                                GetOneApplication.data.user?.name
                                    ?.slice(1)
                                    .toLowerCase()}
                        </h2>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col-reverse lg:h-[calc(100%-100px)] h-[400px] overflow-y-auto py-4 scrollbar-hidden gap-4">
                    {GetOneApplication.data.application ? (
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex flex-col ${
                                        message.sender === UserType.user
                                            ? "justify-start items-start"
                                            : "justify-end items-end"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 text-xs py-3 ${
                                            message.sender === UserType.user
                                                ? "bg-[#F6F8FA] rounded-r-xl rounded-tl-xl"
                                                : "bg-primary text-white rounded-s-xl rounded-tr-xl"
                                        }`}
                                    >
                                        <p className="break-words">
                                            {message.message}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex ${
                                            message.sender === UserType.user
                                                ? "flex-row-reverse"
                                                : "flex-row"
                                        } items-end gap-2`}
                                    >
                                        {message.createdAt && (
                                            <p
                                                className={`text-xs text-[#797C7B] font-medium`}
                                            >
                                                {getTimeOrDate(
                                                    moment(message.createdAt)
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="aspect-square lg:w-4/5 md:w-1/2 w-4/5">
                                <img
                                    src={NotShortlisted}
                                    alt="Not Shortlisted"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="flex items-center gap-4 w-full py-4">
                    {GetOneApplication.data.application ? (
                        <>
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="w-full text-sm rounded-lg bg-[#F6F8FA] outline-none py-3 px-4"
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <AuthButton
                                type="button"
                                icon={
                                    <i className="pi pi-send w-full text-center"></i>
                                }
                                customStyle="w-16"
                                onClick={handleSendMessage}
                            />
                        </>
                    ) : (
                        <div className="w-full flex items-center justify-center ">
                            <ul className="text-[#343434] text-sm list-disc list-inside text-center w-3/4">
                                <li>
                                    You need to shortlist first, then you can
                                    message them.
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmShortlistModal
                avatar={GetOneApplication.data?.user?.avatar || NoProfile}
                name={GetOneApplication.data?.user?.name}
                jobTitle={GetOneApplication.data?.job?.title}
                visible={confirmShortlist}
                setVisible={setConfirmShortlist}
                onClick={() => handleShortlist()}
                isLoading={shortlisteLoader}
            />
        </div>
    ) : (
        <p className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
            No data found
        </p>
    );
};

export default ApplicationDetails;
