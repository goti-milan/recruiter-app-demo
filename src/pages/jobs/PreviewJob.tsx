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
import AuthButton from "@/components/ui/auth/AuthButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { createJob, updateJob } from "@/helpers/apis/jobs";
import { SALARY_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import queryClient from "@/helpers/query.config";
import { CREATE_JOB, EDIT_JOB, JOBS } from "@/routes";
import {
  CreateAndUpdateJobRequest,
  CreateJobField,
  Gender,
  IncentivePeriod,
  JobType,
  Language,
  SalaryPeriod,
  WorkModel,
} from "@/types/jobs.types";
import moment from "moment";
import { Divider } from "primereact/divider";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const PreviewJob: React.FC = () => {
  const navigate = useNavigate();

  const jobDetails: CreateJobField = JSON.parse(
    localStorage.getItem("job-details") as string,
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateJob = async () => {
    const payload: CreateAndUpdateJobRequest = {
      title: jobDetails?.job_title,
      jobType: jobDetails?.job_type as JobType,
      salaryPeriod: SalaryPeriod.month,
      expiry: moment(jobDetails?.expiry_date).format("yyyy-MM-DD"),
      vacancy: jobDetails?.vacancy,
      minimumSalary:
        ((jobDetails.salary === SALARY_TYPE.FIXED ||
          jobDetails.salary === SALARY_TYPE.FIXED_INCENTIVE) &&
          jobDetails?.minimumSalary) ||
        null,
      maximumSalary:
        ((jobDetails.salary === SALARY_TYPE.FIXED ||
          jobDetails.salary === SALARY_TYPE.FIXED_INCENTIVE) &&
          jobDetails?.maximumSalary) ||
        null,
      incentiveAmount:
        ((jobDetails.salary === SALARY_TYPE.FIXED_INCENTIVE ||
          jobDetails.salary === SALARY_TYPE.INCENTIVE) &&
          jobDetails?.incentiveAmount) ||
        null,
      incentivePeriod: IncentivePeriod.month,
      experience: Math.ceil((jobDetails?.experience as number) / 3.34) || 0,
      workModel: jobDetails?.work_model as WorkModel,
      location: jobDetails?.location,
      gender:
        (jobDetails?.gender as Gender) === Gender.both
          ? undefined
          : jobDetails?.gender,
      requiredQualification: jobDetails?.required_qualification,
      hardSkills: jobDetails?.hard_skills,
      softSkills: jobDetails?.soft_skills,
      languages: jobDetails?.languages as Language[],
      additionalPerks: jobDetails?.additional_perks,
      description: jobDetails?.description as string,
    };

    setIsLoading(true);
    try {
      if (jobDetails?.id) {
        const response = await updateJob(payload);
        if (response) {
          showToast("success", response.data);
          navigate(JOBS);
        }
      } else {
        const response = await createJob(payload);

        if (response) {
          showToast("success", response.data);
          navigate(JOBS);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    localStorage.removeItem("job-details");
  };

  return jobDetails ? (
    <div className="flex flex-col items-center md:gap-4 gap-2 w-full bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link
            to={jobDetails?.id ? EDIT_JOB + "/" + jobDetails?.id : CREATE_JOB}
            replace
            className="md:w-8 md:h-8 w-5 h-5 flex justify-center items-center rounded-md bg-[#F0F0F0]"
          >
            <i className="pi pi-arrow-left text-sm"></i>
          </Link>
          <p className="font-semibold text-xl">Job Post Preview</p>
        </div>

        <div className="md:w-26 w-1/4">
          <AuthButton
            type="button"
            disabled={isLoading}
            onClick={handleCreateJob}
            className="w-[150px] h-[40px]"
          >
            {isLoading ? <ButtonLoader isVisible={isLoading} /> : "Upload"}
          </AuthButton>
        </div>
      </div>

      <div className="w-full h-[calc(100%-40px)] overflow-y-auto">
        {/* Job Details */}

        <div className="w-full flex flex-col gap-4 mb-4">
          <div className="w-full flex md:flex-row flex-col items-start justify-between gap-2">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold line-clamp-2 pb-1 break-words w-full">
              {jobDetails?.job_title}
            </h1>
            <div className="shrink-0 flex flex-col w-full md:w-auto md:items-end items-start">
              {jobDetails?.minimumSalary && jobDetails?.maximumSalary && (
                <div className="text-sm flex items-center text-[#393939]">
                  Fixed &nbsp;&nbsp;
                  <b>
                    <span className="lg:text-2xl md:text-xl text-xs">
                      ₹{jobDetails?.minimumSalary?.toLocaleString("en-IN")} - ₹
                      {jobDetails?.maximumSalary?.toLocaleString("en-IN")}
                    </span>
                    /month
                  </b>
                </div>
              )}
              {jobDetails?.incentiveAmount && (
                <div className="text-sm flex items-center text-[#393939]">
                  Incentive &nbsp;&nbsp;
                  <b>
                    <span className="lg:text-2xl md:text-xl text-xs">
                      ₹{jobDetails?.incentiveAmount?.toLocaleString("en-IN")}
                    </span>
                    /month
                  </b>
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <p className="text-secondary md:text-base text-sm font-semibold">
              Expiry:
              <span className="text-black">
                {" "}
                {moment(jobDetails?.expiry_date?.toString()).format(
                  "DD MMM, YYYY",
                )}
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
              <p>
                {jobDetails.job_type?.charAt(0).toUpperCase() +
                  jobDetails.job_type?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={OnsiteIcon}
                alt="onsite"
                className="aspect-square md:w-5 md:h-5 w-3 h-3"
              />
              <p>
                {jobDetails?.work_model?.charAt(0).toUpperCase() +
                  jobDetails?.work_model?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={ExperienceIcon}
                alt="experience"
                className="aspect-square md:w-5 md:h-5 w-3 h-3"
              />
              {jobDetails?.experience === 0 ? (
                <p>Fresher</p>
              ) : (
                <p>
                  {Math.ceil((jobDetails?.experience as number) / 3.34)}+ Year
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
                {jobDetails?.required_qualification
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
              <p>{jobDetails?.vacancy} Vacancies</p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={GenderIcon}
                alt="full-times"
                className="aspect-square md:w-5 md:h-5 w-3 h-3"
              />
              <p>
                {(jobDetails.gender ?? "") === Gender.both
                  ? "Male or Female"
                  : (jobDetails.gender ?? "").charAt(0)?.toUpperCase() +
                  (jobDetails.gender ?? "").slice(1)?.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={LocationIcon}
                alt="location"
                className="aspect-square md:w-5 md:h-5 w-3 h-3"
              />
              <p className="line-clamp-1">{jobDetails?.location}</p>
            </div>
          </div>

          <div className="w-full flex md:flex-row flex-col items-center justify-between md:gap-0 gap-4">
            <div className="flex flex-col gap-1 w-full">
              {jobDetails?.languages?.length > 0 && (
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
                    {jobDetails?.languages?.map(
                      (
                        language: {
                          language: string;
                          proficiency: string;
                        },
                        index,
                      ) => (
                        <p
                          key={index}
                          className="text-black font-semibold relative z-0 after:h-2 after:w-2 after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-4 last:after:hidden"
                        >
                          {language.language.charAt(0).toUpperCase() +
                            language.language.slice(1).toLowerCase()}
                          :
                          <span className="text-[#393939] font-medium">
                            {" "}
                            {language.proficiency.charAt(0).toUpperCase() +
                              language.proficiency.slice(1).toLowerCase()}
                          </span>
                        </p>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Divider />

        {/* Skill Requirements */}
        {jobDetails?.hard_skills?.length > 0 ||
          jobDetails?.soft_skills?.length > 0 ? (
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
            {jobDetails?.hard_skills?.length > 0 && (
              <div className="flex-1">
                <p className="text-[#222222] font-bold mb-2">Hard Skills</p>
                <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                  {jobDetails?.hard_skills.map((hardSkill: string) => (
                    <div
                      key={hardSkill}
                      className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                    >
                      {hardSkill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {jobDetails?.soft_skills?.length > 0 && (
              <div className="flex-1">
                <p className="text-[#222222] font-bold mb-2">Soft Skills</p>
                <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                  {jobDetails?.soft_skills.map((softSkill: string) => (
                    <div
                      key={softSkill}
                      className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                    >
                      {softSkill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Job Description */}
        {jobDetails?.description?.length > 0 && (
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
                __html: jobDetails?.description,
              }}
            />
          </div>
        )}

        {/* Additional Perks  */}
        {jobDetails?.additional_perks?.length > 0 && (
          <div className="mt-6 w-full space-y-3">
            <div className="md:text-2xl text-lg font-semibold">
              <h3>Additional Perks </h3>
            </div>
            <ul className="flex flex-col gap-2 md:text-base text-xs list-disc text-black font-medium list-inside">
              {jobDetails?.additional_perks.map((perk: string) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="w-full h-full gap-4 flex flex-col items-center justify-center">
      <p className="w-full flex items-center justify-center text-primary text-lg font-semibold text-center">
        Job details not found.
      </p>
      <PrimaryButton
        onClick={() => {
          localStorage.removeItem("job-details");
          navigate("/jobs/create-job");
          queryClient.removeQueries({
            queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
          });
        }}
        label="Create Job"
        className="w-[150px] h-[40px]"
      />
    </div>
  );
};

export default PreviewJob;
