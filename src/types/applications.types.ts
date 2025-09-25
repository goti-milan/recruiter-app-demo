import { Gender, JobTable } from "./jobs.types";

export enum ApplicationStatus {
    pending = "PENDING",
    shortListed = "SHORT_LISTED",
    accepted = "ACCEPTED",
    rejected = "REJECTED"
}

export enum ResumeTemplateType {
    resume1 = "RESUME_1",
    resume2 = "RESUME_2",
    resume3 = "RESUME_3",
    resume4 = "RESUME_4",
    resume5 = "RESUME_5",
}


export enum ResumeType {
    headsInResume = "HEADS_IN_RESUME",
    uploadedResume = "UPLOADED_RESUME"
}


/* <-----Get Company Applications Types[Start]-----> */
export interface GetCompanyApplicationsRequest {
    jobId?: string;
    status?: ApplicationStatus[];
    searchText?: string;
    startDate?: string;
    endDate?: string;
    pageSize?: number;
    page?: number;
    userId?: string;
}


export interface EducationTable {
    id: string;
    instituteName: string;
    degreeType: string;
    course: string;
    startYear: string;
    endYear?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface WorkExperienceTable {
    id: string;
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    jobType: string;
    startYear: string;
    endYear?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type ResumeEducation = {
    school: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
}

export type ResumeExperience = {
    jobTitle: string;
    company: string;
    jobType: string;
    jobDescription: string | null;
    startDate: string;
    endDate: string;
}

export interface ResumeTable {
    id: string;
    templateType: ResumeTemplateType;
    image: string | null;
    name: string;
    title: string;
    email: string;
    location: string;
    phone: string;
    linkedIn: string;
    portfolioLink: string;
    otherLink: string;
    educations: ResumeEducation[];
    experiences: ResumeExperience[];
    softSkills: string[];
    hardSkills: string[];
    languages: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}


export interface SuggestedUserWithApplicationData {
    id: string;
    user: {
        id: string;
        name: string;
        isActive: boolean;
        avatar: string;
        email: string;
        phone: string | null;
        countryCode: string | null;
        experience: number | null;
    };
    job: {
        id: string;
        title: string;
    } | null,
    roleName: string | null;
    test: {
        headScore: number | null;
        experience: number | null;
    };
    date: string;
    status: ApplicationStatus;
}


export interface GetSuggestedUserWithCompanyApplicationsResponse {
    applications: SuggestedUserWithApplicationData[];
    totalCount: number;
}

/* <-----Get Company Applications Types[End]-----> */

/* <-----Get Suggested User With Application Details Types[Start]-----> */
export type GetSuggestedUserWithApplicationDetailsResponse = {
    user: {
        id: string,
        name: string,
        gender: Gender,
        roleName: string | null,
        experience: number | null,
        avatar: string,
        email: string,
        phone: string,
        countryCode: string,
        website: string | null,
        linkedIn: string | null,
        isActive: boolean,
        otherDocuments: {
            name: string,
            url: string
        }[]
    },
    application: {
        id: string,
        status: ApplicationStatus,
        createdAt: string,
        updatedAt: string,
    } | null,
    testDetails: {
        headScore: number,
        experience: number,
        strenghs: string,
        growthAreas: string
    },
    educations: EducationTable[],
    workExperiences: WorkExperienceTable[],
    uploadedResume: string | null,
    headsInResume: string | null,
    job?: JobTable
}
/* <-----Get Suggested User With Application Details Types[End]-----> */


/* <----- Create Application [Start]-----> */
export interface CreateApplicationRequest {
    jobId: string;
    userId?: string;
}

/* <----- Create Application [End]-----> */


/* <----- Update Application Status [Start]-----> */

export interface UpdateApplicationStatusRequest {
    applicationId: string ;
    status: ApplicationStatus;
}

/* <----- Update Application Status [End]-----> */
