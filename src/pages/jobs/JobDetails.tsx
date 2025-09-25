import ExperienceIcon from "@/assets/svg/jobs/experience.svg";
import FullTimeIcon from "@/assets/svg/jobs/full-time.svg";
import GenderIcon from "@/assets/svg/jobs/gender.svg";
import JobDescriptionIcon from "@/assets/svg/jobs/job-description.svg";
import LanguageIcon from "@/assets/svg/jobs/languages.svg";
import LocationIcon from "@/assets/svg/jobs/location.svg";
import OnsiteIcon from "@/assets/svg/jobs/on-site.svg";
import QualificationIcon from "@/assets/svg/jobs/qualification.svg";
import SkillIcon from "@/assets/svg/jobs/skills.svg";
import VacancyIcon from "@/assets/svg/jobs/vacancy.svg";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Loader from "@/components/ui/loader/Loader";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import { deleteJob, getOneJob } from "@/helpers/apis/jobs";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { jobTypeObj, Language } from "@/types/jobs.types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Divider } from "primereact/divider";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const JobDetails: React.FC = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const OneJobDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
        queryFn: async () => await getOneJob(jobId!),
    });

    const handleDeleteJob = async () => {
        setDeleteLoading(true);
        try {
            await deleteJob(jobId!);
            navigate("/jobs");
        } catch (error) {
            console.error(error);
        }
        setDeleteLoading(false);
    };

    const handleCopy = () => {
        const CANDIDATE_LANDING_URL = import.meta.env
            .VITE_CANDIDATE_LANDING_URL;

        const urlToCopy = CANDIDATE_LANDING_URL + `/dashboard/jobs/${jobId}/shared`;

        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy URL: ", err);
                alert("Failed to copy URL to clipboard");
            });
    };

    return OneJobDetails.isLoading ? (
        <Loader isVisible />
    ) : OneJobDetails?.data ? (
        <div className="w-full h-full bg-white rounded-2xl p-4 overflow-y-auto">
            {/* Job Details */}

            <div className="w-full flex flex-col md:gap-4 gap-2">
                <div className="w-full flex md:flex-row flex-col items-start justify-between gap-2">
                    <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold line-clamp-2 pb-1 break-words w-full">
                        {OneJobDetails?.data?.job?.title}
                    </h1>
                    <div className="shrink-0 flex flex-col w-full md:w-auto md:items-end items-start">
                        {OneJobDetails?.data?.job?.minimumSalary &&
                            OneJobDetails?.data?.job?.maximumSalary && (
                                <div className="text-sm flex items-center text-[#393939]">
                                    Fixed &nbsp;&nbsp;
                                    <b>
                                        <span className="lg:text-2xl md:text-xl text-xs">
                                            ₹
                                            {OneJobDetails?.data?.job?.minimumSalary?.toLocaleString(
                                                "en-IN"
                                            )}{" "}
                                            - ₹
                                            {OneJobDetails?.data?.job?.maximumSalary?.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                        /month
                                    </b>
                                </div>
                            )}
                        {OneJobDetails?.data?.job?.incentiveAmount && (
                            <div className="text-sm flex items-center text-[#393939]">
                                Incentive &nbsp;&nbsp;
                                <b>
                                    <span className="lg:text-2xl md:text-xl text-xs">
                                        ₹
                                        {OneJobDetails?.data?.job?.incentiveAmount?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                    /month
                                </b>
                            </div>
                        )}

                        {OneJobDetails?.data?.job?.minimumSalary === null &&
                            OneJobDetails?.data?.job?.maximumSalary === null &&
                            OneJobDetails?.data?.job?.incentiveAmount ===
                                null && (
                                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#F2F2F2] text-nowrap h-fit">
                                    Salary Not Disclosed
                                </p>
                            )}
                    </div>
                </div>

                <div className="flex">
                    <p className="text-secondary md:text-base text-sm font-semibold">
                        {OneJobDetails?.data?.job?.isExpired
                            ? "Expired: "
                            : "Expiry: "}
                        <span className="text-black">
                            {" "}
                            {moment(
                                OneJobDetails?.data?.job?.expiry?.toString()
                            ).format("DD MMM, YYYY")}
                        </span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-start lg:gap-4 gap-2 text-black md:text-base text-xs">
                    <div className="flex items-center gap-2">
                        <img
                            src={FullTimeIcon}
                            alt="full-times"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p>{jobTypeObj[OneJobDetails.data?.job?.jobType]}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            src={OnsiteIcon}
                            alt="onsite"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p>
                            {OneJobDetails.data?.job?.workModel
                                ?.charAt(0)
                                .toUpperCase() +
                                OneJobDetails.data?.job?.workModel
                                    ?.slice(1)
                                    .toLowerCase()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            src={ExperienceIcon}
                            alt="experience"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        {OneJobDetails.data?.job?.experience === 0 ? (
                            <p>Fresher</p>
                        ) : (
                            <p>
                                {OneJobDetails.data?.job?.experience}+ Year
                                Experience
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            src={QualificationIcon}
                            alt="qualification"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p className="line-clamp-1">
                            {OneJobDetails.data?.job?.requiredQualification
                                ?.map((qualif: string) => qualif)
                                .join(", ")}{" "}
                            Required
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-start lg:gap-4 gap-2 text-black md:text-base text-xs">
                    <div className="flex items-center gap-2">
                        <img
                            src={VacancyIcon}
                            alt="full-times"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p>{OneJobDetails.data?.job?.vacancy} Vacancies</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            src={GenderIcon}
                            alt="full-times"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p>
                            {OneJobDetails.data?.job?.gender === null
                                ? "Male or Female"
                                : OneJobDetails.data?.job?.gender
                                      ?.charAt(0)
                                      .toUpperCase() +
                                  OneJobDetails.data?.job?.gender
                                      ?.slice(1)
                                      .toLowerCase()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            src={LocationIcon}
                            alt="location"
                            className="aspect-square md:w-5 md:h-5 w-3 h-3"
                        />
                        <p className="line-clamp-1">
                            {OneJobDetails.data?.job?.location}
                        </p>
                    </div>
                </div>

                <div className="w-full flex md:flex-row flex-col md:items-center items-end justify-between gap-4 mb-2">
                    <div className="flex flex-col gap-1 w-full">
                        {OneJobDetails.data?.job?.languages?.length > 0 && (
                            <>
                                <div className="md:text-2xl text-lg font-semibold">
                                    <div className="flex items-center gap-2 mb-2">
                                        <img
                                            src={LanguageIcon}
                                            alt="full-times"
                                            className="aspect-square md:w-6 md:h-6 w-4 h-4"
                                        />
                                        <h3>Languages</h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-x-6 md:text-base text-xs">
                                    {OneJobDetails.data?.job?.languages?.map(
                                        (language: Language, index) => (
                                            <p
                                                key={index}
                                                className="text-black font-semibold relative z-0 after:h-2 after:w-2 after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-4 last:after:hidden"
                                            >
                                                {language.language
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    language.language
                                                        .slice(1)
                                                        .toLowerCase()}
                                                :
                                                <span className="text-[#393939] font-medium">
                                                    {" "}
                                                    {language.proficiency
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        language.proficiency
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </span>
                                            </p>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div
                            className={`flex items-center gap-2 shrink-0 border px-3 py-2 md:text-sm text-xs rounded-lg cursor-pointer transition-colors duration-200 w-fit font-medium ${
                                copied
                                    ? "border-green-500 bg-green-50 text-green-600"
                                    : "border-primary text-primary hover:bg-field"
                            }`}
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <i className="pi pi-check text-green-600"></i>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <i className="pi pi-copy text-primary"></i>
                                    <span>Copy job link</span>
                                </>
                            )}
                        </div>
                        <PrimaryButton
                            labelStyle="md:text-base text-xs"
                            label="Delete"
                            className="md:w-[150px] w-1/3 bg-[#2F2F2F] md:h-[40px]"
                            onClick={() => setDeleteModal(true)}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            {/* Skill Requirements */}
            {OneJobDetails.data?.job?.hardSkills?.length > 0 ||
            OneJobDetails.data?.job?.softSkills?.length > 0 ? (
                <div className="w-full flex flex-col gap-3">
                    <div className="md:text-2xl text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <img
                                src={SkillIcon}
                                alt="full-times"
                                className="aspect-square md:w-8 md:h-8 w-5 h-5"
                            />
                            <h3>Skills Required</h3>
                        </div>
                    </div>

                    {/* Hard Skills */}
                    {OneJobDetails.data?.job?.hardSkills?.length > 0 && (
                        <div className="space-y-1">
                            <h5 className="text-[#222222] md:text-base text-sm font-medium">
                                Hard Skills
                            </h5>
                            <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                                {OneJobDetails.data?.job?.hardSkills.map(
                                    (hardSkill: string) => (
                                        <div
                                            key={hardSkill}
                                            className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                                        >
                                            {hardSkill}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Soft Skills */}
                    {OneJobDetails.data?.job?.softSkills?.length > 0 && (
                        <div className="space-y-1">
                            <h5 className="text-[#222222] md:text-base text-sm font-medium">
                                Soft Skills
                            </h5>
                            <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                                {OneJobDetails.data?.job?.softSkills.map(
                                    (softSkill: string) => (
                                        <div
                                            key={softSkill}
                                            className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                                        >
                                            {softSkill}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}

            {/* Job Description */}
            {OneJobDetails.data?.job?.description?.length > 0 && (
                <div className="mt-6 w-full space-y-3">
                    <div className="md:text-2xl text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <img
                                src={JobDescriptionIcon}
                                alt="full-times"
                                className="aspect-square md:w-6 md:h-6 w-4 h-4"
                            />
                            <h3>Job Description</h3>
                        </div>
                    </div>
                    <div
                        className="text-[#393939] md:text-base text-xs font-medium view-job-editor"
                        dangerouslySetInnerHTML={{
                            __html: OneJobDetails?.data?.job?.description,
                        }}
                    />
                </div>
            )}

            {/* Additional Perks  */}
            {OneJobDetails.data?.job?.perks?.length > 0 && (
                <div className="mt-6 w-full space-y-3">
                    <div className="md:text-2xl text-lg font-semibold">
                        <h3>Additional Perks </h3>
                    </div>
                    <ul className="flex flex-col gap-2 md:text-base text-xs list-disc text-black font-medium list-inside">
                        {OneJobDetails.data?.job?.perks.map((perk: string) => (
                            <li key={perk}>{perk}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Delete Modal */}
            <ConfirmationModal
                buttonLabel={"Yes, Delete"}
                visible={deleteModal}
                setVisible={setDeleteModal}
                header="Delete Job"
                message="Are you sure you want to delete this job?"
                onClick={handleDeleteJob}
                isLoading={deleteLoading}
            />
        </div>
    ) : (
        <p className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
            No data found
        </p>
    );
};

export default JobDetails;
