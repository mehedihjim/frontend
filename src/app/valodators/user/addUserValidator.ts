// validation
import { z } from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; //Max Image Size 3MB

// Zod Validation Schema for Club Profile Completion
const addUserValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z
    .string()
    .min(11, "Must be 11 digits number")
    .max(11, "Must be 11 digits number"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().optional(),
  user_type: z.string().min(1, "User Type is required"),
  division_id: z.coerce.number().min(1, "Division is required"),
  district_id: z.coerce.number().min(1, "District is required"),
  upzilla_id: z.coerce.number().min(1, "Upzilla is required"),
  union_id: z.coerce.number().min(1, "Upzilla is required"),
  village: z.string().min(1, "Village is required"),
  bvc_registration_no: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Inserted image is larger than 3MB"),
  signature: z
    .any()
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Inserted image is larger than 3MB"),
});

export default addUserValidationSchema;
