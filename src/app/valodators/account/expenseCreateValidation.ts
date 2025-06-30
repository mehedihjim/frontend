import { z } from "zod";

export const expenseCreateValidation = z.object({
    "batch_id": z.coerce.number().min(1, "Batch is required"),
    "amount": z.coerce.number().min(1, "Amount is required"),
    "date": z.string().min(1, "Date is required"),
    "source": z.string().min(1, "source is required"),
    "comment": z.string().optional(),
});

export default expenseCreateValidation;