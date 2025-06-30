"use client";

import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useCreateFeedlistMutation, useUpdateFeedlistMutation } from "@/redux/api/feedlistApi";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaRepeat } from "react-icons/fa6";
import { toast } from "sonner";

export const FeedListForm = ({refetch,editData,userType}:any) => {
    const [error, setError] = useState({});
    const [submitType, setSubmitType] = useState("create");
    const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
        null,
    );
    const [selectedItem, setSelectedItem] = useState(null);
    const [createApi] = useCreateFeedlistMutation();
    const [updateApi] = useUpdateFeedlistMutation();

    const [userRole, setUserRole] = useState('');

    useEffect(()=>{
        if(editData?.id){
            if(resetForm){
                resetForm({
                    name:editData?.name,
                    feed_type: editData?.feed_type
                });
            }
            setSubmitType('update');
            setSelectedItem(editData?.id);
        }
    },[editData]);

    useEffect(()=>{
        if(userType){
            setUserRole(userType);
        }
    },[userType]);

    const reloadFrom = () => {
        if (resetForm && selectedItem) {
            editData = [];
            resetForm({
                name:'',
                feed_type:''
            });
            setSubmitType('create')
        }
    };

    const handleSubmit = async (values: FieldValues) => {
        console.log(values);
        if (submitType === 'create') {
            try {
                let res = await createApi(values).unwrap();
                if (res) {
                    if (resetForm) {
                        resetForm({
                            name: "",
                            feed_type:""
                        });
                        refetch();
                        toast.success(res?.message || "FeedList created successfully");
                    } else {
                        toast.error(res?.message);
                        setError(res?.data || res?.error || "Something went wrong!");
                    }
                }
            } catch (err: any) {
                setError(err.errors);
            }
        } else if(submitType === 'update'){
            let res = await updateApi({
                data:values,
                feellist_id:selectedItem
            }).unwrap();
            if(res){
                if (resetForm) {
                    resetForm({
                        name: "",
                        feed_type:""
                    });
                    refetch();
                    setSubmitType('create');
                    toast.success(res?.message || "FeedList Update successfully");
                } else {
                    toast.error(res?.message);
                    setError(res?.data || res?.error || "Something went wrong!");
                } 
            }
        }

    };

    return (
        <SportsFrom
            //   resolver={zodResolver(batchCreateValidation)}
            //   defaultValues={batchCreateDefaultValues(singleBatchData)}
            onSubmit={handleSubmit}
            isReset={true}
            setInputValues={(reset) => setResetForm(() => reset)}
        >
            <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                    {submitType === "create" ? "Create" : "Update"}
                </div>
                <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">

                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Feed Name
                            </label>
                            <SportsInput
                                type="text"
                                name="name"
                                errors={error}
                                placeholder="Enter Feed Name"
                                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Feed Type
                            </label>
                            <Select
                                name="feed_type"
                                style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                            >
                                <option value="">Select Feed Type</option>
                                <option value="Starter">Starter</option>
                                <option value="Grower">Grower</option>
                                <option value="Finisher">Finisher</option>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        {submitType === "update" && selectedItem && (
                            <button
                                onClick={reloadFrom}
                                className="btn btn-sm top-6 mr-3 rounded bg-green-700 text-white hover:bg-green-800"
                            >
                                <FaRepeat size={18} className="cursor-pointer" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn btn-sm top-6 rounded border-none bg-red-700 text-white hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
                        >
                            {submitType === "create" ? "Add" : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </SportsFrom>
    );
}