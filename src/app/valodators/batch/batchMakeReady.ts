// validation
import { z } from "zod";

// Zod Validation Schema for Club Profile Completion
const batchReadyValidation = z.object({
  average_weight: z.string().min(1, "Avg weight is required"),
  weight_count_age: z.string().min(1, "Age is required"),
  expected_price: z.string().min(1, "Price is required"),
  available_for_sale_count: z.string().min(1, "Bird count is required"),
  image: z.any().optional(),
});

export default batchReadyValidation;
