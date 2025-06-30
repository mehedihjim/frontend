import { z } from "zod";

const batchPriceSetupValidation = z.object({
    selling_price: z.coerce.number().min(1, "Selling price is required"),
});

export default batchPriceSetupValidation;