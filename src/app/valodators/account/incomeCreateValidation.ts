import { z } from "zod"

export const incomeCreateValidation = z.object({
    "batch_id": z.coerce.number().min(1, "Batch is required"),
    "amount": z.coerce.number().min(1, "Amount is required"),
    "date": z.string().min(1, "Date is required"),
    "expenditure_sector": z.string().min(1, "Expenditure sector is required"),
    "comment": z.string().optional(),
});

export default incomeCreateValidation;