// validation
import { z } from "zod";

// Zod Validation Schema for Club Profile Completion
const batchCreateValidation = z.object({
    shed_id: z.coerce.number().min(1, "Shed is required"),
    batch_number: z.string().min(1, "batch_number is required"),
    hen_type: z.string().min(1, "hen_type is required"),
    chick_number : z.coerce.number().optional(),
    start_date: z.string().min(1, "start_date is required"),
    chick_price: z.coerce.number().min(1, "chick_price is required"),
});

export default batchCreateValidation;
