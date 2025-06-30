"use client";
import { useEffect, useState } from "react";
import Select from "../Froms/Select";
import SportsFrom from "../Froms/SportsFrom";
import SportsInput from "../Froms/SportsInput";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useCreateDailyUpdateMutation, useUpdateDailyUpdateMutation } from "@/redux/api/dailyupdateApi";
import { useSingleBatchQuery } from "@/redux/api/batchApi";
import { FaRepeat } from "react-icons/fa6";

export const DailyForm = ({ batchid, updateData, refetch }: any) => {

    const [createDailyUpate] = useCreateDailyUpdateMutation();
    const [updateDailyUpate] = useUpdateDailyUpdateMutation();
    const [error, setError] = useState({});
    const [submitType, setSubmitType] = useState("create");
    const [updateId, setUpdateId] = useState(null);
    const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
        null,
    );

    const { data: batchData, isLoading: isLoadingBatchData } = useSingleBatchQuery(batchid);

    useEffect(() => {
        if (updateData?.id) {
            if (resetForm) {
                resetForm({
                    death_count: updateData.death_count,
                    feed_consumption: updateData.feed_consumption,
                    average_weight: updateData.average_weight,
                    average_price: updateData.average_price,
                    date: updateData.date,
                });
            }
            setSubmitType("update");
            setUpdateId(updateData.id);
        }
    }, [updateData]);
    
    const handleSubmit = async (values: FieldValues) => {
        if (submitType === "create") {
            let payload = {
                batch_id: batchid,
                ...values,
            };
            try {
                const res = await createDailyUpate(payload).unwrap();
                if (resetForm) {
                    resetForm({
                        death_count: "",
                        feed_consumption: "",
                        average_weight: "",
                        average_price: "",
                        date: "",
                    });
                    refetch();
                }
                toast.success(res?.message || "Daily Update added successfully");
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to add data");
            }
        } else if (submitType === "update") {
            try {
                let payload = {
                    batch_id: batchid,
                    ...values,
                };
                const res = await updateDailyUpate({
                    data: payload,
                    dailyupdate_id: updateId,
                }).unwrap();
                if (resetForm) {
                    resetForm({
                        death_count: "",
                        feed_consumption: "",
                        average_weight: "",
                        average_price: "",
                        date: "",
                    });
                    refetch();
                    setSubmitType("create");
                }
                toast.success(res?.message || "Daily Update updated successfully");
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to add data");
            }
        }
    };
    const refreshForm = () => {
        if (resetForm) {
            updateData = [];
            resetForm({
                death_count: "",
                feed_consumption: "",
                average_weight: "",
                average_price: "",
                date: "",
            });
            setSubmitType("create");
        }
    }

    return (
        <>
            <SportsFrom
                // defaultValues={tracebilityDefaultValues(tracebilityData?.data)}
                onSubmit={handleSubmit}
                setInputValues={(reset) => setResetForm(() => reset)}
            >
                <div className="mb-6 mt-6">
                    
                    <h4 className="font-semibold btn btn-disabled">Batch Number : {batchData?.data.batch_number}</h4>
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Death Count <span className="text-danger">*</span>
                            </label>
                            <SportsInput
                                type="text"
                                errors={error}
                                name="death_count"
                                placeholder="Death Count"
                                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Feed Consumption <span className="text-danger">*</span>
                            </label>
                            <Select
                                name="feed_consumption"
                                style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
                            >
                                <option defaultValue="">Select feed consumption</option>
                                <option value="SELLING_BIRDS">SELLING BIRDS</option>
                                <option value="SELLING_EGGS">SELLING EGGS</option>
                                <option value="WASTE_SALE">WASTE SALE</option>
                                <option value="SPONSOR">SPONSOR</option>
                                <option value="DONATION">DONATION</option>
                                <option value="OTHERS">OTHERS</option>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Average Weight
                            </label>
                            <SportsInput
                                type="text"
                                errors={error}
                                name="average_weight"
                                placeholder="Type Average Weight"
                                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Average Price
                            </label>
                            <SportsInput
                                type="text"
                                errors={error}
                                name="average_price"
                                placeholder="Type Average Price"
                                style="input input-bordered w-full max-w-full bg-white dark:bg-black input-md"
                            />
                        </div>

                        <div className="input-container">
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Date <span className="text-danger">*</span>
                            </label>
                            <SportsInput
                                type="date"
                                name="date"
                                errors={error}
                                placeholder="dd/mm/yyyy"
                                style="input input-date-light input-bordered w-full max-w-full bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                            />
                        </div>

                        {/* Button div positioned at the bottom */}
                        <div className="flex items-end justify-end sm:justify-start">
                            <button
                                className="btn btn-md mr-2 w-1/2 border-0 bg-red-700 text-white hover:bg-red-800"
                                type="submit"
                            >
                                {
                                    submitType === "create" ? "Add" : "Update"
                                }
                            </button>
                            { submitType === "update" && (
                                <button
                                    className="btn btn-md border-0 bg-green-700 text-white hover:bg-green-800"
                                    type="button" onClick={refreshForm}
                                >
                                   <FaRepeat size={20} />
                                </button>  
                            )}
                            
                        </div>
                    </div>
                </div>
            </SportsFrom>
        </>
    );
};