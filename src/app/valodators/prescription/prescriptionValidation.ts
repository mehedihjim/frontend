import { z } from "zod";

const prescriptionValidation = z.object({
    "doctor_id": z.coerce.number().min(1, "Doctor is required"),
    "date": z.string().min(1, "Date is required"),
});
export default prescriptionValidation;