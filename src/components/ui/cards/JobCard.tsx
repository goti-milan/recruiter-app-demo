import ExperienceIcon from "@/assets/svg/jobs/experience.svg";
import FullTimeIcon from "@/assets/svg/jobs/full-time.svg";
import LocationIcon from "@/assets/svg/jobs/location.svg";
import OnsiteIcon from "@/assets/svg/jobs/on-site.svg";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { JobTable, jobTypeObj, Language } from "@/types/jobs.types";
import moment from "moment";
import { Card } from "primereact/card";
import React from "react";
import { useNavigate } from "react-router";

const JobCard: React.FC<{ data: JobTable }> = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Card
            pt={{
                root: {
                    className:
                        "h-full rounded-2xl font-manrope bg-[#F6F6F6] hover:bg-field shadow-none cursor-pointer transition-all duration-300 ease-in-out p-4",
                },
                body: {
                    className: "h-full",
                },
                content: {
                    className: "p-0 h-full",
                },
            }}
            onClick={() => {
                if (data.id) {
                    navigate(`/jobs/${data.id}/applications`);
                    queryClient.removeQueries({
                        queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
                    });
                }
            }}
        >
            <div className="w-full h-full flex flex-col items-start justify-between lg:gap-4 gap-2">
                <div className="w-full flex flex-col items-start justify-start lg:gap-4 gap-2">
                    {/* Job Title */}
                    <div className="w-full flex items-start justify-between">
                        <div className="text-black">
                            <h3 className="lg:text-3xl md:text-2xl text-base font-semibold line-clamp-2 md:pb-1">
                                {data?.title}
                            </h3>
                            {data?.applicationCount > 0 && (
                                <small className="text-primary md:text-base text-[10px] font-medium">
                                    {data?.applicationCount} Applications
                                </small>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center justify-start lg:gap-x-4 gap-y-1 gap-x-2 text-black md:text-base text-xs w-full">
                        <div className="flex items-center gap-2">
                            <img
                                src={FullTimeIcon}
                                alt="full-times"
                                className="aspect-square md:w-5 md:h-5 w-3 h-3"
                            />
                            <p>{jobTypeObj[data?.jobType]}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src={OnsiteIcon}
                                alt="onsite"
                                className="aspect-square md:w-5 md:h-5 w-3 h-3"
                            />
                            <p>
                                {data?.workModel.charAt(0).toUpperCase() +
                                    data?.workModel.slice(1).toLowerCase()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src={ExperienceIcon}
                                alt="experience"
                                className="aspect-square md:w-5 md:h-5 w-3 h-3"
                            />
                            {data.experience === 0 ? (
                                <p>Fresher</p>
                            ) : (
                                <p>{data?.experience}+ Year Experience</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src={LocationIcon}
                                alt="location"
                                className="aspect-square md:w-5 md:h-5 w-3 h-3"
                            />
                            <p className="line-clamp-1">{data?.location}</p>
                        </div>
                    </div>

                    {/* Skills Required */}
                    {[...data.hardSkills, ...data.softSkills].length > 0 && (
                        <div className="lg:block hidden w-full">
                            <div className="text-lg text-black font-semibold mb-1">
                                Skills Required
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-black font-semibold">
                                {[...data.hardSkills, ...data.softSkills]
                                    .slice(0, 4)
                                    .map((skill: string, index: number) => (
                                        <div
                                            className="bg-white rounded-lg px-3 py-1"
                                            key={index}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                {[...data.hardSkills, ...data.softSkills]
                                    .length > 4 ? (
                                    <div className="bg-white rounded-lg px-3 py-1">
                                        +{" "}
                                        {[
                                            ...data.hardSkills,
                                            ...data.softSkills,
                                        ].length - 4}{" "}
                                        more
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>

                {/* Languages */}
                <div className="w-full flex lg:flex-row flex-col lg:items-end justify-between lg:gap-0 gap-4">
                    {data?.languages.length > 0 && (
                        <div className="lg:flex hidden flex-col">
                            <h3 className="text-lg text-black font-semibold mb-1">
                                Languages
                            </h3>
                            <div className="flex flex-wrap gap-x-6">
                                {data?.languages.map((languages: Language) => (
                                    <p
                                        key={languages.language}
                                        className="text-black font-semibold relative z-0 after:h-2 after:w-2 after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-4 last:after:hidden"
                                    >
                                        {languages.language
                                            .charAt(0)
                                            .toUpperCase() +
                                            languages.language
                                                .slice(1)
                                                .toLowerCase()}
                                        :
                                        <span className="text-[#393939] font-medium">
                                            {" "}
                                            {languages.proficiency
                                                .charAt(0)
                                                .toUpperCase() +
                                                languages.proficiency
                                                    .slice(1)
                                                    .toLowerCase()}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                    {data?.expiry && (
                        <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 lg:items-center items-end justify-between">
                            <p className="text-secondary md:text-base text-xs font-semibold">
                                {data?.isExpired ? "Expired:" : "Expiry: "}
                                <span className="text-black">
                                    {" "}
                                    {moment(data?.expiry?.toString()).format(
                                        "DD MMM, YYYY"
                                    )}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default JobCard;
