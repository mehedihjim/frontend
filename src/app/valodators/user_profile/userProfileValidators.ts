// validation
import { z } from "zod";

// Zod Validation Schema for Club Profile Completion
const userProfileValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  name_bn: z.string().min(1, "Name is required"),
  contact_person_name: z.string().min(1, "Contact person is required"),
  contact_person_name_en: z.string().min(1, "Contact person is required"),
  contact_person_designation: z.string().min(1, "Designation is required"),
  contact_person_designation_bn: z.string().min(1, "Designation is required"),
  contact_person_mobile: z
    .string()
    .min(11, "Must be 11 digits number")
    .max(11, "Must be 11 digits number"),
  contact_person_email: z.string().email("Please enter a valid email address!"),
  email: z.string().email("Please enter a valid email address!"),
  mobile: z
    .string()
    .min(11, "Must be 11 digits number")
    .max(11, "Must be 11 digits number"),
  address: z.string().min(1, "Address is required"),
});

export default userProfileValidationSchema;
