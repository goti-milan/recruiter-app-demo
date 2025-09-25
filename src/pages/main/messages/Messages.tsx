import { NoProfile, NotShortlisted } from "@/assets/images";
import ExternalLinkIcon from "@/assets/svg/message/ExternalLinkIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import SelectField from "@/components/ui/auth/SelectField";
import Loader from "@/components/ui/loader/Loader";
import { getUserApplications } from "@/helpers/apis/applications";
import {
    getMessages,
    getUsersForChat,
    sendMessage,
} from "@/helpers/apis/message";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { getPastTimeorDate, getTimeOrDate } from "@/helpers/helper";
import useDebounce from "@/hooks/useDebounce";
import { ApplicationStatus } from "@/types/applications.types";
import { Message, UserForChat, UserType } from "@/types/message.types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Messages: React.FC = () => {
    const [selectedContact, setSelectedContact] = useState<UserForChat | null>(
        null
    );
    const [selectedApplication, setSelectedApplication] = useState<string>();
    const [inputMessage, setInputMessage] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const debouncedSearchUser = useDebounce(searchUser, 500);

    const navigate = useNavigate();

    const usersForChat = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USERS_FOR_CHAT, debouncedSearchUser],
        queryFn: () =>
            getUsersForChat({
                searchText: debouncedSearchUser,
                page: 1,
                pageSize: 10,
            }),
    });

    const applications = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_APPLICATIONS_OF_USER, selectedContact],
        queryFn: () => getUserApplications({ userId: selectedContact?.userId }),
    });

    const messagesFromServer = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_MESSAGES, selectedApplication],
        queryFn: () =>
            getMessages({
                applicationId: selectedApplication,
                page: 1,
                pageSize: 10,
            }),
    });

    const handleContactClick = (contact: UserForChat) => {
        setSelectedContact(contact);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (selectedApplication && inputMessage.trim() !== "") {
            const newMessage: Message = {
                message: inputMessage,
                sender: UserType.company,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            setMessages((prev) => [newMessage, ...prev]);
            await sendMessage({
                applicationId: selectedApplication,
                message: inputMessage,
            });
            setInputMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const openApplication = () => {
        if (!selectedApplication) return;

        const application = applications.data?.applications.find(
            (app) => app.id === selectedApplication
        );
        if (!application) return;

        const getStatusTabFromStatus = () => {
            switch (application.status) {
                case ApplicationStatus.pending:
                    return "applied";

                case ApplicationStatus.shortListed:
                    return "shortlisted";

                case ApplicationStatus.accepted:
                    return "accepted-rejected";

                case ApplicationStatus.rejected:
                    return "accepted-rejected";

                default:
                    return null;
            }
        };
        const statusTab = getStatusTabFromStatus();

        if (application?.job && statusTab) {
            const url = `/jobs/${application.job.id}/applications/${statusTab}/${application.id}`;
            navigate(url);
        }
    };

    useEffect(() => {
        setSelectedApplication(applications?.data?.applications[0]?.id);
    }, [applications.data]);

    useEffect(() => {
        setMessages(messagesFromServer?.data?.messages || []);
    }, [messagesFromServer.data]);

    return (
        <div className="lg:flex-1 flex gap-4 h-full bg-gray-50 w-full">
            {/* Sidebar */}
            <div
                className={` ${
                    selectedContact ? "hidden lg:block" : "flex flex-col"
                } lg:min-w-[320px] lg:w-[320px] w-full h-full rounded-2xl border border-[#E7E7E7] bg-white p-4`}
            >
                <div className="flex lg:flex-col lg:gap-0 gap-6 flex-row lg:items-start items-center justify-between pb-2">
                    <h1 className="text-xl font-semibold lg:mb-4 text-primary">
                        Messages
                    </h1>
                    <IconField
                        iconPosition="right"
                        pt={{
                            root: {
                                className:
                                    "lg:!w-full md:!w-1/2 lg:pb-4 !font-manrope",
                            },
                        }}
                    >
                        <InputText
                           id="search-messages"
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            placeholder="Search..."
                            className="w-full !h-[40px] !text-black !border-[#EEEEEE] focus:border-primary focus:!shadow-none !bg-[#F7F7F7] !rounded-xl font-manrope"
                        />
                        <InputIcon className="absolute right-2 -translate-y-1/2 !-mt-1.5">
                            <i className="pi pi-search"></i>{" "}
                        </InputIcon>
                    </IconField>
                </div>
                {usersForChat.isLoading ? (
                    <Loader isVisible />
                ) : (
                    <div className="flex-[1_1_auto] flex flex-col overflow-y-auto scrollbar-hidden w-full">
                        {usersForChat.data?.users?.map((user: UserForChat) => (
                            <div
                                key={user?.userId}
                                className="flex items-center gap-1 px-2 py-3 hover:bg-field w-full rounded-xl cursor-pointer"
                                onClick={() => handleContactClick(user)}
                            >
                                <img
                                    src={user?.avatar || NoProfile}
                                    alt={user?.name}
                                    className="rounded-full aspect-square object-cover w-10 h-10"
                                />
                                <div className="flex flex-col w-[calc(100%-7.5rem)]">
                                    <h3 className="font-semibold truncate">
                                        {user?.name?.charAt(0)?.toUpperCase() +
                                            user?.name?.slice(1)?.toLowerCase()}
                                    </h3>
                                    <p className="text-xs font-medium text-[#3F3F3F] truncate">
                                        {user.messageMetadata.latestMessage}
                                    </p>
                                </div>
                                {user?.messageMetadata?.unreadCount > 0 && (
                                    <div className="flex flex-col items-center justify-between gap-2 ml-auto">
                                        {user?.messageMetadata
                                            ?.latestMessageTime && (
                                            <span className="text-xs text-primary font-medium text-nowrap">
                                                {getPastTimeorDate(
                                                    moment(
                                                        user?.messageMetadata
                                                            ?.latestMessageTime
                                                    )
                                                )}
                                            </span>
                                        )}
                                        {user?.messageMetadata?.unreadCount && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                                                {
                                                    user?.messageMetadata
                                                        ?.unreadCount
                                                }
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Area */}
            {selectedContact ? (
                <div
                    className={`${
                        selectedContact ? "flex" : "hidden lg:flex"
                    } flex-col h-full lg:w-[calc(100%-336px)] lg:max-w-[calc(100%-336px)]  w-full rounded-2xl bg-white border border-[#E7E7E7]`}
                >
                    {/* Chat Header */}
                    <div className="flex md:flex-row flex-col items-center justify-between gap-3 border-b border-[#E7E7E7] p-4 w-full">
                        <div className="flex items-center gap-3 md:w-2/5 w-full">
                            <img
                                src={selectedContact?.avatar || NoProfile}
                                alt="Profile"
                                className="rounded-full aspect-square object-cover w-12 h-12"
                            />
                            <h2 className="text-xl font-semibold w-4/5 truncate">
                                {selectedContact?.name || "Mac Jonathan"}
                            </h2>
                        </div>
                        <div className="flex items-center justify-between gap-4 md:w-1/2 w-full">
                            <div className="flex items-center gap-4 w-11/12">
                                <SelectField
                                    options={applications.data?.applications?.map(
                                        (app) => ({
                                            label: app.job?.title,
                                            value: app.id,
                                        })
                                    )}
                                    placeholder="Select"
                                    onChange={(e) =>
                                        setSelectedApplication(e.target.value)
                                    }
                                    value={selectedApplication}
                                    defaultValue={
                                        applications.data?.applications[0]?.id
                                    }
                                    optionValue="value"
                                />
                                <div>
                                    <Button
                                        pt={{
                                            root: {
                                                className:
                                                    "bg-field text-white border-none outline-none rounded-xl hover:bg-field !shadow-none",
                                            },
                                        }}
                                        icon={<ExternalLinkIcon />}
                                        onClick={openApplication}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedContact(null)}
                                className="shrink-0 w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]/50"
                                type="button"
                            >
                                <i className="pi pi-times text-black" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {messagesFromServer.isLoading ? (
                        <Loader isVisible />
                    ) : (
                        <div className="flex flex-col-reverse h-full overflow-auto p-4 gap-4">
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
                                        className={`max-w-[70%] px-4 py-2 ${
                                            message.sender === UserType.user
                                                ? "bg-[#F6F8FA] md:ml-10 ml-8 rounded-r-xl rounded-tl-xl"
                                                : "bg-primary text-white md:mr-10 mr-8 rounded-s-xl rounded-tr-xl"
                                        }`}
                                    >
                                        <p className="break-words">{message.message}</p>
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
                                        <img
                                            src={
                                                message.sender === UserType.user
                                                    ? selectedContact?.avatar ||
                                                      NoProfile
                                                    : selectedContact?.avatar ||
                                                      NoProfile
                                            }
                                            alt="Profile"
                                            className="rounded-full aspect-square md:w-8 w-6 h-6 md:h-8"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}

                    <div className="flex items-center gap-4 w-full p-4">
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
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        selectedContact ? "flex" : "hidden lg:flex"
                    } w-full rounded-2xl bg-white border border-[#E7E7E7]`}
                >
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="aspect-square w-2/5">
                            <img
                                src={NotShortlisted}
                                alt="Not Shortlisted"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
