// validation
import { z } from "zod";

// Zod Validation Schema for Club Profile Completion
const shedCreateValidationShema = z.object({
  name: z.string().min(1, "Shed is required"),
  farmer_id: z
    .union([z.string(), z.number()])
    .refine((value) => typeof value === "string" || value > 0, {
      message: "Farmer ID is required",
    }),
  division_id: z.coerce.number().min(1, "Division is required"),
  district_id: z.coerce.number().min(1, "District is required"),
  upzilla_id: z.coerce.number().min(1, "Upzilla is required"),
  union_id: z.coerce.number().min(1, "Upzilla is required"),
  address: z.string().optional(),
});

export default shedCreateValidationShema;
