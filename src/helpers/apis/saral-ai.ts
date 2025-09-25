import axios from "axios";
// const BASE_URL = "/api/v1";
const BASE_URL = "https://saral-ai-api.headsin.co/api/v1";

export interface HealthCheckResponse {
  status: string;
  message: string;
}

export interface EnhancePromptResponse {
  success: boolean;
  enhanced_query: string;
}
export interface SearchProfilesResponse {
  success: boolean;
  matched_profiles: MatchedProfile[];
  unmatched_profiles: any[];
  matched_count: number;
  unmatched_count: number;
  current_page: number;
  total_pages: number;
  total_results: number;
  parsed_data: Record<string, any>;
  has_next: boolean;
  has_prev: boolean;
}

export interface MatchedProfile {
  id: number;
  fullName: string;
  headline: string;
  about: string;
  addressWithCountry: string;
  linkedinUrl: string;
  profilePic: string;
  email: string;
  score: number;
  score_breakdown: ScoreBreakdown;
  skills: string[];
  experiences: Experience[];
  is_complete: boolean;
  created_at: string;
}

export interface ScoreBreakdown {
  about_match: number;
  headline_match: number;
  skills_match: number;
}

export interface Experience {
  breakdown: boolean;
  caption: string;
  companyId?: string;
  companyLink1: string;
  companyUrn?: string;
  logo?: string;
  metadata?: string;
  subComponents: SubComponent[];
  subtitle: string;
  title: string;
}

export interface SubComponent {
  description: string[];
}

export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await axios.get<HealthCheckResponse>(`${BASE_URL}/health`);
  return response.data;
};

export const enhancePrompt = async (USER_ID: string, query: string): Promise<EnhancePromptResponse> => {
  const response = await axios.post(
    `${BASE_URL}/ai-query/enhance`,
    { prompt: query },
    {
      headers: {
        "X-User-ID": USER_ID,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data.data;
};

export const searchProfiles = async (USER_ID: string, query: string, page: number = 0): Promise<SearchProfilesResponse> => {
  const response = await axios.post<SearchProfilesResponse>(
    `${BASE_URL}/ai-query/search-profiles`,
    {
      query,
      page,
    },
    {
      headers: {
        "X-User-ID": USER_ID,
        "Content-Type": "application/json",
      },
    },
  );
  // @ts-ignore
  return response.data.data[0];
};

export interface SearchHistoryItem {
  id: string;
  query_text: string;
  total_results: number;
  created_at: string;
}

export interface SearchHistoryResponse {
  data: SearchHistoryItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export const getSearchHistory = async (USER_ID: string, page: number, limit: number): Promise<SearchHistoryResponse> => {
  const response = await axios.get(`${BASE_URL}/search-history`, {
    headers: {
      "X-User-ID": USER_ID,
      "Content-Type": "application/json",
    },
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

export interface CandidateProfile {
  id: string;
  query_text: string;
  total_results: number;
  name: string;
  email: string;
  location: string;
  skills: string; // JSON string of array
  experience: string; // JSON string of array
  profile_pic: string;
  linkedin_url: string;
  is_complete: boolean;
  headline: string;
  created_at: string; // ISO date
  about: string;
  sort_order: number;
}

// API response
export interface SearchHistoryByIdResponse {
  data: CandidateProfile[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export const getSearchHistoryResults = async (USER_ID: string, searchId: string): Promise<SearchHistoryByIdResponse> => {
  const response = await axios.get<any>(`${BASE_URL}/search-history/results`, {
    headers: {
      "X-User-ID": USER_ID,
      "Content-Type": "application/json",
    },
    params: {
      search_id: searchId,
    },
  });

  return response.data;
};

export interface DeleteSavedProfileResponse {
  message: string;
  error?: string;
}

export const deleteSavedProfile = async (USER_ID: string, id: number): Promise<DeleteSavedProfileResponse> => {
  try {
    const response = await axios.delete<DeleteSavedProfileResponse>(`${BASE_URL}/saved-profile/${id}`, {
      headers: {
        "X-User-ID": USER_ID,
        "Content-Type": "application/json",
      },
      data: { profile_id: id },
    });

    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "delete_failed",
        message: error.message,
      }
    );
  }
};

export interface SavedProfileData {
  id: number;
  user_id: string;
  profile_id: number;
  saved_at: string;
}

export interface CreateSavedProfileSuccess {
  data: SavedProfileData;
  message: string;
}

export interface CreateSavedProfileError {
  error: string;
  message: string;
}

export type CreateSavedProfileResponse = CreateSavedProfileSuccess | CreateSavedProfileError;

export const createSavedProfile = async (USER_ID: string, profileId: number): Promise<CreateSavedProfileResponse> => {
  try {
    const response = await axios.post<CreateSavedProfileResponse>(
      `${BASE_URL}/saved-profile`,
      { profile_id: profileId },
      {
        headers: {
          "X-User-ID": USER_ID,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "creation_failed",
        message: error.message,
      }
    );
  }
};
export interface ExperienceItem {
  logo?: string;
  title: string;
  caption: string;
  metadata: string;
  subtitle: string;
  breakdown: boolean;
  companyId?: string;
  companyUrn?: string;
  companyLink1?: string;
  subComponents: Array<{ description: any[] }>;
}

export interface SavedProfile {
  id: number;
  user_id: string;
  profile_id: number;
  score: number;
  saved_at: string;
  name: string;
  email: string;
  location: string;
  skills: string;
  experience: string;
  profile_pic: string;
  linkedin_url: string;
  is_complete: boolean;
  headline: string;
  created_at: string;
  about: string;
}

export interface SavedProfilesResponse {
  data: SavedProfile[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface DeleteSavedProfileError {
  error: string;
  message: string;
}

export const getSavedProfiles = async (USER_ID: string, page = 1, limit = 10): Promise<SavedProfilesResponse> => {
  const response = await axios.get<SavedProfilesResponse>(`${BASE_URL}/saved-profile?page=${page}&limit=${limit}`, {
    headers: {
      "X-User-ID": USER_ID,
    },
  });

  return response.data;
};

export interface SavedProfileCountResponse {
  total: number;
}

export const getSavedProfilesCount = async (USER_ID: string): Promise<SavedProfileCountResponse> => {
  const response = await axios.get<SavedProfileCountResponse>(`${BASE_URL}/saved-profile/count`, {
    headers: {
      "X-User-ID": USER_ID,
    },
  });

  return response.data;
};
