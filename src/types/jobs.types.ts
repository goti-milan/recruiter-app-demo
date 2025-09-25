/* <-----Create Jobs Types-----> */

import { JOB_STATUS, SALARY_TYPE } from "@/helpers/constants";
import { z } from "zod";


export enum JobType {
    contract = "CONTRACT",
    parttime = "PARTTIME",
    fulltime = "FULLTIME",
}

export const jobTypeObj = {
    CONTRACT: "Contract",
    PARTTIME: "Part-time",
    FULLTIME: "Full Time",
}

export enum SalaryPeriod {
    month = "MONTH",
    year = "YEAR",
}

export enum IncentivePeriod {
    month = "MONTH",
    year = "YEAR",
}

export enum WorkModel {
    onsite = "ONSITE",
    hybrid = "HYBRID",
    remote = "REMOTE",
}

export enum Gender {
    male = "MALE",
    female = "FEMALE",
    both = "BOTH",
}

export enum LanguageProficiency {
    beginner = "BEGINNER",
    intermediate = "INTERMEDIATE",
    proficient = "PROFICIENT"
}

export const createJobSchema = z.object({
    id: z.string().optional(),
    job_title: z.string().nonempty("Job title is required"),
    description: z.string().max(20000, "Description should be less than 20000 characters").nonempty("Description is required"),
    job_type: z.string().nonempty("Job type is required"),
    vacancy: z.number().min(1, "Vacancy is required"),
    salary: z.nativeEnum(SALARY_TYPE).optional(),
    minimumSalary: z.number().optional().nullable(),
    maximumSalary: z.number().optional().nullable(),
    incentiveAmount: z.number().optional().nullable(),
    expiry_date: z.date({ required_error: "Expiry date is required" }),
    experience: z.number().optional(),
    work_model: z.string().nonempty("Work model is required"),
    location: z.string().nonempty("Location is required"),
    gender: z.nativeEnum(Gender).optional(),
    required_qualification: z.array(z.string()).nonempty("Qualification is required"),
    hard_skills: z.array(z.string().nonempty("Hard skill is required")).min(1, "At least one hard skill is required"),
    soft_skills: z.array(z.string()),
    languages: z.array(z.object({ language: z.string(), proficiency: z.string() })),
    additional_perks: z.array(z.string()),
    generatedJobDescription: z.boolean().default(false),
}).refine(
    (data) => {
        if (data.salary === SALARY_TYPE.FIXED) {
            return data.minimumSalary !== null && data.maximumSalary !== null;
        } else if (data.salary === SALARY_TYPE.FIXED_INCENTIVE) {
            return data.minimumSalary !== null && data.maximumSalary !== null && data.incentiveAmount !== null;
        } else if (data.salary === SALARY_TYPE.INCENTIVE) {
            return data.incentiveAmount !== null;
        }
        return true;
    },
    {
        path: ["salary"],
        message: "Please provide required salary details",
    }
)

export type CreateJobField = z.infer<typeof createJobSchema>;


/* <-----Create Jobs Types[Start]-----> */
export interface Language {
    language: string,
    proficiency: LanguageProficiency
}

export interface CreateAndUpdateJobRequest {
    jobId?: string;
    title: string;
    description?: string;
    jobType: JobType;
    vacancy: number;
    minimumSalary: number | null | undefined;
    maximumSalary: number | null | undefined;
    salaryPeriod: SalaryPeriod;
    incentiveAmount: number | null | undefined;
    incentivePeriod: IncentivePeriod;
    expiry: string;
    experience: number;
    workModel: WorkModel;
    location?: string | null;
    gender: Gender | undefined;
    requiredQualification: string[];
    hardSkills: string[];
    softSkills: string[];
    languages: Language[];
    additionalPerks: string[];
    generatedJobDescription?: boolean;
}
/* <-----Create Jobs Types[End]-----> */


/* <-----Get Jobs Types[Start]-----> */
export interface JobTable {
    id: string;
    title: string;
    description: string;
    jobType: JobType;
    vacancy: number;
    minimumSalary: number;
    maximumSalary: number;
    salaryPeriod: SalaryPeriod;
    incentiveAmount: number;
    incentivePeriod: IncentivePeriod;
    expiry: string;
    isExpired: boolean;
    experience: number;
    workModel: WorkModel;
    location: string;
    gender: Gender;
    requiredQualification: string[];
    hardSkills: string[];
    softSkills: string[];
    languages: Language[];
    perks: string[];
    companyId: string;
    createdAt: string;
    updatedAt: string;
    applicationCount: number;
}


export interface GetJobsForCompanyResponse {
    jobs: JobTable[];
    totalCount: number;
}

export type GetJobDetailsResponse = {
    job: JobTable
}
/* <-----Get Jobs Types[End]-----> */

/* <-----Get Jobs For Company Types[Start]-----> */
export interface GetJobsForCompanyRequest {
    searchText?: string;
    jobStatus?: JOB_STATUS;
    pageSize?: number;
    page?: number;
}

export interface GetSuggestedUsersRequest {
    jobId?: string;
    searchText?: string;
    startDate?: string;
    endDate?: string;
    pageSize: number;
    page: number;
}
/* <-----Get Jobs For Company Types[End]-----> */


/* <----- Get Qualification List Response Types[Start] -----> */
export interface GetQualificationListResponse {
    qualifications: string[];
}
/* <----- Get Qualification List Response Types[End] -----> */


/* <----- Get City List Response Types[Start] -----> */
export interface GetCityListResponse {
    cities: string[];
}
/* <----- Get City List Response Types[End] -----> */

export type GenerateJDRequest = CreateAndUpdateJobRequest;

export type GenerateJDResponse = {
    description: string
}


/* <----- Get Roles Types [Start] ----- /> */
export interface RoleTable {
    id: string;
    title: string;
    isTestGiven?: boolean;
}

export interface GetRolesResponse {
    roles: RoleTable[]
}

/* <----- Get Roles Types [End] ----- */