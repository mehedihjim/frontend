// validation
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;

// Zod Validation Schema for Club Profile Completion
const userProfilePhotoValidationSchema = z.object({
  files: z
    .array(
      z.instanceof(File).refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
      }, "One or more files are larger than 5MB"),
    )
    .optional(),
});

export default userProfilePhotoValidationSchema;
