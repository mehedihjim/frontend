// validation
import { z } from "zod";

// Zod Validation Schema for Club Profile Completion
const feedStockUpdateValidation = z.object({
  qty: z.coerce.number().min(1, "Qty is required"),
  price: z.coerce.number().min(1, "Price is required"),
  unit: z.string().min(1, "Unit is required"),
});

export default feedStockUpdateValidation;
