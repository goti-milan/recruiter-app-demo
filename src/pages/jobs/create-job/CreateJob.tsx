import AuthButton from "@/components/ui/auth/AuthButton";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import AuthNumber from "@/components/ui/auth/AuthNumber";
import ChipField from "@/components/ui/auth/ChipFiled";
import Datepicker from "@/components/ui/auth/Datepicker";
import EditorField from "@/components/ui/auth/EditorField";
import MultiSelectField from "@/components/ui/auth/MultiSelectField";
import RadioButton from "@/components/ui/auth/RadioField";
import SelectField from "@/components/ui/auth/SelectField";
import SliderField from "@/components/ui/auth/SliderField";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import CompleteProfileModal from "@/components/ui/modals/CompleteProfileModal";
import { computeScore } from "@/components/ui/progressbar/ProfileCompletion";
import { generateJD, getOneJob } from "@/helpers/apis/jobs";
import { getCompanyProfile } from "@/helpers/apis/profile";
import { SALARY_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { CREATE_JOB, EDIT_PROFILE, JOBS, PREVIEW_JOB } from "@/routes";
import {
  CreateAndUpdateJobRequest,
  CreateJobField,
  createJobSchema,
  Gender,
  GetCityListResponse,
  GetQualificationListResponse,
  GetRolesResponse,
  IncentivePeriod,
  JobType,
  Language,
  LanguageProficiency,
  SalaryPeriod,
  WorkModel,
} from "@/types/jobs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { EditorTextChangeEvent } from "primereact/editor";
import { InputNumberChangeEvent } from "primereact/inputnumber";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form";
import { Link, useMatch, useNavigate, useParams } from "react-router";
import SkillsInput from "./Skillnput";

const LANGUAGE_OPTIONS = ["English", "Hindi", "Gujarati", "Bengali", "Marathi", "Tamil", "Telugu", "Malayalam", "Kannada", "Punjabi"].map(
  (lang) => ({ label: lang, value: lang }),
);

const PROFICIENCY_OPTIONS = [
  {
    label: "Beginner",
    value: LanguageProficiency.beginner,
  },
  {
    label: "Intermediate",
    value: LanguageProficiency.intermediate,
  },
  {
    label: "Proficient",
    value: LanguageProficiency.proficient,
  },
];

const CreateJob: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const cityList = useMemo(() => {
    let list = queryClient.getQueryData<GetCityListResponse>([USE_QUERY_KEYS.GET_CITIES]);
    if (!list) {
      const stored = localStorage.getItem("cities");
      list = stored ? JSON.parse(stored) : { cities: [] };
    }
    return list;
  }, [queryClient]);

  const jobRoleList = useMemo(() => {
    let list = queryClient.getQueryData<GetRolesResponse>([USE_QUERY_KEYS.GET_ROLES]);
    if (!list) {
      const stored = localStorage.getItem("roles");
      list = stored ? JSON.parse(stored) : { roles: [] };
    }
    return list;
  }, [queryClient]);

  const qualificationList = useMemo(() => {
    let list = queryClient.getQueryData<GetQualificationListResponse>([USE_QUERY_KEYS.GET_QUALIFICATIONS]);
    if (!list) {
      const stored = localStorage.getItem("qualifications");
      list = stored ? JSON.parse(stored) : { qualifications: [] };
    }
    return list;
  }, [queryClient]);

  const cityOptions = useMemo(
    () =>
      cityList?.cities?.map((city) => ({
        label: city,
        value: city,
      })) || [],
    [cityList],
  );

  const qualificationOptions = useMemo(
    () =>
      qualificationList?.qualifications?.map((qualification) => ({
        label: qualification,
        value: qualification,
      })) || [],
    [qualificationList],
  );

  const companyProfileData = useQuery({
    queryKey: [USE_QUERY_KEYS.GET_COMPANY_PROFILE],
    queryFn: () => getCompanyProfile(),
  });

  const isMatch = useMatch(CREATE_JOB);

  const score = useMemo(() => {
    if (!companyProfileData.data) return 0;
    return computeScore(companyProfileData.data);
  }, [companyProfileData.data]);

  const showModal = isMatch && score < 79;

  const [isJDLoading, setIsJDLoading] = useState(false);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  const createJobForm = useForm<CreateJobField>({
    defaultValues: {
      job_title: "",
      job_type: JobType.fulltime,
      salary: SALARY_TYPE.FIXED,
      minimumSalary: null,
      maximumSalary: null,
      incentiveAmount: null,
      description: "",
      expiry_date: moment().add(15, "days").toDate(),
      vacancy: 1,
      experience: 0,
      work_model: WorkModel.onsite,
      location: "",
      gender: Gender.male,
      required_qualification: [],
      hard_skills: [],
      soft_skills: [],
      languages: [],
      additional_perks: [],
      generatedJobDescription: false,
    },
    mode: "all",
    resolver: zodResolver(createJobSchema),
  });

  const { control, register, handleSubmit, formState, watch, setValue, getValues, trigger, reset } = createJobForm;

  const [languageField, setLanguageField] = useState<{
    language: string;
    proficiency: string;
  }>({
    language: "",
    proficiency: "",
  });

  const languageFieldArray = useFieldArray({
    control: control,
    name: "languages",
  });

  /* Set Job Details in Local Storage */
  const onSubmit = useCallback(
    async (data: CreateJobField) => {
      localStorage.setItem("job-details", JSON.stringify(data));
      navigate(PREVIEW_JOB);
    },
    [navigate],
  );

  const { data: oneJobData } = useQuery({
    queryKey: [USE_QUERY_KEYS.GET_ONE_JOB, id],
    queryFn: () => getOneJob(id as string),
    enabled: !!id,
  });

  /* Form error handler to show toast for first validation error */
  const handleFormErrors = useCallback((errors: Record<string, any>) => {
    const extractMessage = (err: any): string | null => {
      if (!err) return null;
      if (typeof err === "string") return err;
      if (err?.message) return err.message;
      if (Array.isArray(err)) {
        for (const item of err) {
          const m = extractMessage(item);
          if (m) return m;
        }
      } else if (typeof err === "object") {
        for (const key in err) {
          const m = extractMessage(err[key]);
          if (m) return m;
        }
      }
      return null;
    };

    const message = extractMessage(errors) || "Please fix the errors in the form.";
    showToast("error", message);
  }, []);

  /* Generate AI Job Description */
  const generateAIJobDescription = useCallback(async () => {
    const data = getValues();

    const payload: CreateAndUpdateJobRequest = {
      title: data?.job_title,
      jobType: data?.job_type as JobType,
      salaryPeriod: SalaryPeriod.month,
      expiry: moment(data?.expiry_date).format("yyyy-MM-DD"),
      vacancy: data?.vacancy,
      minimumSalary: data.salary === SALARY_TYPE.FIXED || data.salary === SALARY_TYPE.FIXED_INCENTIVE ? data?.minimumSalary : null,
      maximumSalary: data.salary === SALARY_TYPE.FIXED || data.salary === SALARY_TYPE.FIXED_INCENTIVE ? data?.maximumSalary : null,
      incentiveAmount: data.salary === SALARY_TYPE.FIXED_INCENTIVE || data.salary === SALARY_TYPE.INCENTIVE ? data?.incentiveAmount : null,
      incentivePeriod: IncentivePeriod.month,
      experience: (data?.experience as number) || 0,
      workModel: data?.work_model as WorkModel,
      location: data?.location,
      gender: data?.gender === Gender.both ? undefined : data?.gender,
      requiredQualification: data?.required_qualification,
      hardSkills: data?.hard_skills,
      softSkills: data?.soft_skills,
      languages: data?.languages as Language[],
      additionalPerks: data?.additional_perks,
    };

    try {
      setIsJDLoading(true);
      const response = await generateJD(payload);
      const description = response?.description?.slice(1, -1) || "";
      if (description) {
        setValue("description", description);
        setValue("generatedJobDescription", true);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to generate job description. Please try again.");
    } finally {
      setIsJDLoading(false);
    }
  }, [getValues, setValue]);

  /* Auto Complete */
  const getRolesAutoCompleteList = useCallback(
    (e: AutoCompleteCompleteEvent) => {
      if (e.query.length > 2) {
        const filteredRoles =
          jobRoleList?.roles.filter((role) => role?.title?.toLowerCase().includes(e.query.toLowerCase())).map((role) => role.title) ?? [];

        setAutoCompleteList(filteredRoles);
      } else {
        setAutoCompleteList([]);
      }
    },
    [jobRoleList],
  );

  /* Preview Job Details */
  useEffect(() => {
    const jobDetailsString = localStorage.getItem("job-details");
    if (jobDetailsString) {
      const data: CreateJobField = JSON.parse(jobDetailsString);
      const salary =
        data.maximumSalary !== null && data.minimumSalary !== null && data.incentiveAmount !== null
          ? SALARY_TYPE.FIXED_INCENTIVE
          : data.maximumSalary !== null && data.minimumSalary !== null
            ? SALARY_TYPE.FIXED
            : data.incentiveAmount !== null
              ? SALARY_TYPE.INCENTIVE
              : SALARY_TYPE.NOT_DISCLOSED;

      reset({
        ...data,
        salary,
        expiry_date: data.expiry_date ? new Date(data.expiry_date) : new Date(),
        gender: data.gender ?? Gender.both,
      });
    }
  }, [reset]);

  /* Edit Job */
  useEffect(() => {
    const jobData = oneJobData?.job;
    const localStorageJobDetails = JSON.parse(localStorage.getItem("job-details") || "{}");
    if (jobData && localStorageJobDetails?.id !== id) {
      const salary =
        jobData.maximumSalary !== null && jobData.minimumSalary !== null && jobData.incentiveAmount !== null
          ? SALARY_TYPE.FIXED_INCENTIVE
          : jobData.maximumSalary !== null && jobData.minimumSalary !== null
            ? SALARY_TYPE.FIXED
            : jobData.incentiveAmount !== null
              ? SALARY_TYPE.INCENTIVE
              : SALARY_TYPE.NOT_DISCLOSED;

      reset({
        id: jobData.id,
        job_title: jobData.title,
        job_type: jobData.jobType,
        vacancy: jobData.vacancy,
        description: jobData.description,
        salary,
        minimumSalary: jobData.minimumSalary,
        maximumSalary: jobData.maximumSalary,
        incentiveAmount: jobData.incentiveAmount,
        expiry_date: jobData.expiry ? new Date(jobData.expiry) : new Date(),
        experience: jobData.experience ?? 0,
        work_model: jobData.workModel,
        location: jobData.location,
        gender: jobData.gender ?? Gender.both,
        required_qualification: (jobData.requiredQualification as [string, ...string[]]) || [],
        hard_skills: jobData.hardSkills || [],
        soft_skills: jobData.softSkills || [],
        languages: jobData.languages || [],
        additional_perks: jobData.perks || [],
        generatedJobDescription: false, // Reset this for edited jobs
      });
    }
  }, [oneJobData, id, reset]);

  const handleGenerateJD = useCallback(async () => {
    const isValid = await trigger([
      "job_title",
      "job_type",
      "vacancy",
      "salary",
      "minimumSalary",
      "maximumSalary",
      "incentiveAmount",
      "expiry_date",
      "experience",
      "work_model",
      "location",
      "gender",
      "required_qualification",
    ]);

    if (isValid) {
      await generateAIJobDescription();
    } else {
      showToast("error", "Please fill required fields to generate job description.");
    }
  }, [trigger, generateAIJobDescription]);

  const watchedSalary = watch("salary");
  const watchedDescription = watch("description");
  const watchedGeneratedDescription = watch("generatedJobDescription");

  return (
    <div className="w-full lg:h-full flex lg:flex-row flex-col gap-4">
      <form className="w-full h-full flex flex-col gap-6 overflow-auto" onSubmit={handleSubmit(onSubmit, handleFormErrors)}>
        <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
          <div className="flex items-center gap-2 pb-4">
            <Link
              to={id ? `${JOBS}/${id}` : JOBS}
              replace
              className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
              onClick={() => localStorage.removeItem("job-details")}
            >
              <i className="pi pi-times"></i>
            </Link>
            <p className="font-semibold text-xl">{id ? "Update Job" : "Create a Job"}</p>
          </div>

          <div className="flex flex-col w-full">
            <div className={`flex flex-col gap-2 w-full`}>
              <AuthLabel label="Job Title*" />
              <Controller
                name="job_title"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter job title"
                    pt={{
                      root: { className: "w-full" },
                      input: {
                        root: {
                          className: "!w-full text-black border-none focus:!shadow-none !bg-field !rounded-xl font-manrope",
                        },
                      },
                    }}
                    suggestions={autoCompleteList}
                    completeMethod={getRolesAutoCompleteList}
                  />
                )}
              />
            </div>
            {formState.errors.job_title && <small className="w-full text-red-400">{formState.errors.job_title.message}</small>}
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-2 md:w-3/5 w-full">
              <AuthLabel label="Job Type*" />
              <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
                <RadioButton id="fullTime" label="Full Time" value={JobType.fulltime} {...register("job_type")} />
                <RadioButton id="contract" label="Contract" value={JobType.contract} {...register("job_type")} />
                <RadioButton id="partTime" label="Part-Time" value={JobType.parttime} {...register("job_type")} />
              </div>
              {formState.errors.job_type && <small className="w-full text-red-400">{formState.errors.job_type.message}</small>}
            </div>

            <div className="w-full">
              <Controller
                name="vacancy"
                control={control}
                render={({ field }) => (
                  <AuthNumber
                    value={field.value}
                    onChange={(e: InputNumberChangeEvent) => field.onChange(e.value)}
                    label="Vacancy Available*"
                    placeholder="Enter here"
                    useGrouping={false}
                    errorMsg={formState.errors.vacancy}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:w-max">
            <AuthLabel label="Salary*" />
            <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
              <RadioButton id="fixed" label="Fixed" value={SALARY_TYPE.FIXED} {...register("salary")} />
              <RadioButton id="fixedIncentive" label="Fixed & Incentive" value={SALARY_TYPE.FIXED_INCENTIVE} {...register("salary")} />
              <RadioButton id="incentive" label="Incentive" value={SALARY_TYPE.INCENTIVE} {...register("salary")} />
              <RadioButton id="notDisclosed" label="Not Disclosed" value={SALARY_TYPE.NOT_DISCLOSED} {...register("salary")} />
            </div>
          </div>

          {watchedSalary !== SALARY_TYPE.NOT_DISCLOSED && (
            <div>
              {(watchedSalary === SALARY_TYPE.FIXED || watchedSalary === SALARY_TYPE.FIXED_INCENTIVE) && (
                <div className={`flex ${watchedSalary === SALARY_TYPE.FIXED_INCENTIVE ? "md:flex-row flex-col" : ""} gap-6 w-full`}>
                  <div className={`flex flex-col gap-2 ${watchedSalary === SALARY_TYPE.FIXED_INCENTIVE ? "md:w-2/3" : ""}`}>
                    <AuthLabel label="Fixed Amount per month*" />
                    <div className="flex items-center gap-2">
                      <Controller
                        name="minimumSalary"
                        control={control}
                        render={({ field }) => (
                          <AuthNumber
                            value={field.value}
                            onChange={(e: InputNumberChangeEvent) => field.onChange(e.value)}
                            max={10000000}
                            placeholder="Enter here"
                            useGrouping={false}
                            errorMsg={formState.errors.minimumSalary}
                          />
                        )}
                      />
                      <p className="text-sm font-semibold">To</p>
                      <Controller
                        name="maximumSalary"
                        control={control}
                        render={({ field }) => (
                          <AuthNumber
                            value={field.value}
                            onChange={(e: InputNumberChangeEvent) => field.onChange(e.value)}
                            max={10000000}
                            placeholder="Enter here"
                            useGrouping={false}
                            errorMsg={formState.errors.maximumSalary}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {(watchedSalary === SALARY_TYPE.INCENTIVE || watchedSalary === SALARY_TYPE.FIXED_INCENTIVE) && (
                <div className={`flex flex-col gap-2 ${watchedSalary === SALARY_TYPE.FIXED_INCENTIVE ? "md:w-1/3" : ""}`}>
                  <AuthLabel label="Incentive Amount per month" />
                  <Controller
                    name="incentiveAmount"
                    control={control}
                    render={({ field }) => (
                      <AuthNumber
                        value={field.value}
                        onChange={(e: InputNumberChangeEvent) => field.onChange(e.value)}
                        placeholder="Enter here"
                        useGrouping={false}
                        errorMsg={formState.errors.incentiveAmount}
                      />
                    )}
                  />
                </div>
              )}

              {formState.errors.salary && <small className="w-full text-red-400">{formState.errors.salary.message}</small>}
            </div>
          )}

          <div className="md:w-1/2">
            <Controller
              name="expiry_date"
              control={control}
              render={({ field }) => (
                <Datepicker
                  minDate={new Date()}
                  register={field}
                  label="Expiry Date*"
                  dateFormat="dd/mm/yy"
                  errorMsg={formState.errors?.expiry_date}
                />
              )}
            />
          </div>
        </div>

        <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <SliderField label="Experience(in years)*" value={field.value ?? 0} onChange={(e) => field.onChange(e.value)} />
            )}
          />

          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-2 md:w-max w-full">
              <AuthLabel label="Work Model*" />
              <div className="flex items-center gap-2">
                <RadioButton id="onsite" label="Onsite" value={WorkModel.onsite} {...register("work_model")} />
                <RadioButton id="hybrid" label="Hybrid" value={WorkModel.hybrid} {...register("work_model")} />
                <RadioButton id="remote" label="Remote" value={WorkModel.remote} {...register("work_model")} />
              </div>
              {formState.errors.work_model && <small className="w-full text-red-400">{formState.errors.work_model.message}</small>}
            </div>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <SelectField
                  filter
                  filterPlaceholder="Search location"
                  placeholder="Search here"
                  {...field}
                  label="Location*"
                  errorMsg={formState.errors.location}
                  options={cityOptions}
                  virtualScrollerOptions={{ itemSize: 48 }}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2 w-max">
            <AuthLabel label="Gender" />
            <div className="flex items-center gap-2">
              <RadioButton id="male" label="Male" value={Gender.male} {...register("gender")} />
              <RadioButton id="female" label="Female" value={Gender.female} {...register("gender")} />
              <RadioButton id="both" label="Both" value={Gender.both} {...register("gender")} />
            </div>
          </div>

          <Controller
            name="required_qualification"
            control={control}
            render={({ field }) => (
              <MultiSelectField
                {...field}
                label="Required Qualification*"
                placeholder="Select here"
                options={qualificationOptions}
                panelHeaderTemplate={<></>}
                errorMsg={formState.errors.required_qualification as FieldError}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 bg-white w-full rounded-2xl p-4">
          <SkillsInput
            control={control}
            name="hard_skills"
            label="Hard Skills"
            placeholder="Write hard skills here..."
            infoContent="Technical or job-specific abilities (e.g., Python, SEO, Excel, Data Analysis, AutoCAD, Machinery Operation, Legal Research)"
            formErrors={formState.errors}
          />

          {/* Soft Skills */}
          <SkillsInput
            control={control}
            name="soft_skills"
            label="Soft Skills"
            placeholder="Write soft skills here..."
            infoContent="Personal and people-related traits (e.g., Teamwork, Communication, Problem Solving, Empathy, Leadership, Critical Thinking)"
            formErrors={formState.errors}
          />

          {/* Additional Perks */}
          <SkillsInput
            control={control}
            name="additional_perks"
            label="Additional Perk"
            placeholder="Write additional perks here..."
            formErrors={formState.errors}
          />
        </div>

        <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
          {/* Languages */}
          <div>
            <div className="flex md:flex-row flex-col md:items-end md:justify-start gap-4 w-full">
              <div className="md:w-2/5 w-full">
                <SelectField
                  options={LANGUAGE_OPTIONS}
                  label="Languages"
                  placeholder="Select Language"
                  value={languageField.language}
                  onChange={(e) => setLanguageField((prev) => ({ ...prev, language: e.value }))}
                  errorMsg={formState.errors.languages?.[0]?.language}
                />
              </div>

              <div className="flex items-end gap-4 md:w-3/5 w-full">
                <SelectField
                  options={PROFICIENCY_OPTIONS}
                  placeholder="Select Type"
                  value={languageField.proficiency}
                  onChange={(e) =>
                    setLanguageField((prev) => ({
                      ...prev,
                      proficiency: e.value,
                    }))
                  }
                  errorMsg={formState.errors.languages?.[0]?.proficiency}
                />
                <AuthButton
                  customStyle="md:w-3/4 w-1/3"
                  label="Add"
                  type="button"
                  onClick={() => {
                    if (languageField.language && languageField.proficiency) {
                      languageFieldArray.append(languageField);
                      setLanguageField({ language: "", proficiency: "" });
                    }
                  }}
                />
              </div>
            </div>

            {languageFieldArray.fields.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {languageFieldArray.fields.map((field, index) => (
                  <ChipField
                    label={`${field.language}: ${field.proficiency.charAt(0).toUpperCase() + field.proficiency.slice(1).toLowerCase()}`}
                    key={field.id}
                    removable
                    onRemove={() => languageFieldArray.remove(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <AuthButton type="submit" disabled={isJDLoading} customStyle="w-3/5">
              {isJDLoading ? <ButtonLoader isVisible={isJDLoading} /> : id ? "Update" : "Preview"}
            </AuthButton>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-2 bg-white border border-[#E7E7E7] rounded-2xl p-4 lg:w-8/12 lg:max-w-8/12 max-h-full lg:h-fit">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Job Description</h1>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <EditorField
                value={field.value}
                onTextChange={(e: EditorTextChangeEvent) => field.onChange(e.htmlValue ?? "")}
                isLoading={isJDLoading}
              />
            )}
          />
        </div>
        {!isJDLoading && !watchedDescription && formState.errors.description && (
          <small className="w-full text-red-400">{formState.errors.description?.message}</small>
        )}
        {!isJDLoading && (
          <AuthButton
            customStyle="text-sm w-1/3 shrink-0"
            type="button"
            disabled={watchedGeneratedDescription || isJDLoading}
            onClick={handleGenerateJD}
          >
            {isJDLoading ? <ButtonLoader isVisible={true} /> : "Generate by AI"}
          </AuthButton>
        )}
      </div>

      {showModal && (
        <CompleteProfileModal
          buttonLabel="Complete Profile"
          onClick={() => navigate(EDIT_PROFILE, { replace: true })}
          header="Complete your company profile to post a job"
          message="Please complete your company profile to at least 80% to post a job."
        />
      )}
    </div>
  );
};

export default CreateJob;
