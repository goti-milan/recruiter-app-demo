/* <----- Support types -----> */

import { z } from "zod";

export const supportSchema = z.object({
    issue: z.string().nonempty("Issue is required").max(100, "Issue should be less than 100 characters"),
    description: z.string().nonempty("Description is required").max(500, "Description should be less than 500 characters"),
    rating: z.number().min(1, "Rating is required"),
    emailConsent: z.boolean().default(true),
});

export type supportField = z.infer<typeof supportSchema>;

/* <----- Review request types -----> */
export interface ReviewRequest {
    issue: string;
    description?: string;
    rating: number;
    emailConsent: boolean;
}
