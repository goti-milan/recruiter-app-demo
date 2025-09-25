import { z } from "zod";

export const ImageMetaData = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
})

export type ImageMetaData = z.infer<typeof ImageMetaData>;