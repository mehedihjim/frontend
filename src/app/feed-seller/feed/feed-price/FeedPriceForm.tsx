"use client";

import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetFeedlistQuery } from "@/redux/api/feedlistApi";
import { useCreateFeedPriceMutation, useUpdateFeedPriceMutation } from "@/redux/api/feedPriceApi";
import { useGetUsersByTypeQuery} from "@/redux/api/userApi";
import { IFeedListType } from "@/types/feedlistType";
import { IUser } from "@/types/user.type";
import { useEffect, useState } from "react";
import { FaPlus, FaRepeat, FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
export const FeedPriceForm = ({editData,refetchData,user,isUserLoading}:any) => {
    const [error, setError] = useState({});
    const [submitType, setSubmitType] = useState("create");
    const [resetForm, setResetForm] = useState<((values: any) => void) | null>(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const { data: feedlist, isLoading: shedListLoading } = useGetFeedlistQuery({});
    
    const {data: dealerData, isLoading: dealerLoading} = useGetUsersByTypeQuery("feed-seller")
    // State to manage dynamic fields
    const [fields, setFields] = useState([{ id: 1, feed_id: "", dealer_price: "", unit: "" }]);
    const [createApi] = useCreateFeedPriceMutation();
    const [updateApi] = useUpdateFeedPriceMutation();
    // Function to add a new field
    const handleAddField = () => {
        const newField = { id: fields.length + 1, feed_id: "", dealer_price: "", unit: "" };
        setFields([...fields, newField]);
    };
    useEffect(() => {
        if (editData) {
            if(resetForm){
                resetForm({
                    dealer_id: editData?.dealer_id,
                    feed_id_1: editData?.feed_id,
                    dealer_price_1: editData?.dealer_price ?? "",
                    unit_1: editData?.unit,
                    admin_price_1: editData?.price ?? "",

                });
                setSubmitType("update");
                setSelectedItem(editData?.id);
            }
        }
    },[editData]);
    // Function to remove a field
    const handleRemoveField = (id: number) => {
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
    };
    // Handle form submission
    const handleSubmit = (data: any) => {
        // Transform form data into the desired structure
        const items = fields.map((field) => ({
            feed_id: parseInt(data[`feed_id_${field.id}`], 10), // Convert to number
            dealer_price: parseFloat(data[`dealer_price_${field.id}`]), // Convert to number
            price: parseFloat(data[`admin_price_${field.id}`]), // Same as dealer_price for admin
            unit: data[`unit_${field.id}`],
        }));

        // Prepare the final payload
        const payload = {
            dealer_id:data.dealer_id,
            items,
        };

        const updatePayload = {
            dealer_id:data.dealer_id,
            ...items,
        }
        const transformedPayload = {
            dealer_id: String(updatePayload.dealer_id), // Convert dealer_id to string
            feed_list_id: String(items[0]?.feed_id), // Extract feed_id
            dealer_price: items[0]?.dealer_price, 
            price: items[0]?.price, 
            unit: items[0]?.unit
        };
        if (submitType === "create") {
            try {
                createApi(payload).unwrap().then((res) => {
                    if (res) {
                        if (resetForm) {
                            resetForm({
                                dealer_id: "",
                                feed_id: "",
                                dealer_price: "",
                                unit: "",
                            });
                            refetchData();
                            setFields([...fields]);
                            toast.success(res?.message || "Feed Price created successfully");
                        } else {
                            toast.error(res?.message);
                            setError(res?.data || res?.error || "Something went wrong!");
                        }
                    }
                }).catch((error) => {
                    toast.error(error?.data?.message || "Something went wrong!");
                    setError(error?.data || error?.error || "Something went wrong!");
                });
            } catch (error: any) {
                
            }
        } else if (submitType === "update") {
            try {
                updateApi({ data: transformedPayload, feedprice_id: selectedItem }).unwrap().then((res) => {
                    if (res) {
                        if (resetForm) {
                            refetchData();
                            toast.success(res?.message || "Feed Price updated successfully");
                        } else {
                            toast.error(res?.message);
                            setError(res?.data || res?.error || "Something went wrong!");
                        }
                    }
                });
            } catch (error: any) {
                toast.error(error?.data?.message || "Something went wrong!");
                setError(error?.data || error?.error || "Something went wrong!");
            }
        }
    };
    const reloadFrom = () => {
        if (resetForm && editData) {
            editData = [];
            resetForm({
                dealer_id: "",
                feed_id_1: "",
                dealer_price_1: "",
                unit_1: "",
                admin_price_1: "",
            });
            setSubmitType("create");
        }
    };

    let userRole = user?.data.user_type;
    
    if(isUserLoading){
        return <div>Loading...</div>
    }
    return (
        <SportsFrom
            onSubmit={handleSubmit}
            isReset={true}
            setInputValues={(reset) => setResetForm(() => reset)}
        >
            <div className="mb-6 mt-6">
                <div className="table-headline mb-6 dark:text-white">
                    {submitType === "create" ? "Create" : "Update"}
                </div>
                <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                {userRole == "admin" && (
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mb-3">
                        <div>
                             <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Dealer Name <span className="text-danger">*</span>
                            </label>
                            <Select
                                    name="dealer_id"
                                    style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                                >
                                    <option value="">Select Dealer</option>
                                    {dealerData?.data.map((data: IUser) => (
                                        <option value={data.id} key={data.id}>
                                            {data.name}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                       
                    </div>
                    )}
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-4 mb-4">
                            {/* Feed Name */}
                            <div>
                                {index === 0 && (
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                        Feed Name <span className="text-danger">*</span>
                                    </label>
                                )}
                                <Select
                                    name={`feed_id_${field.id}`}
                                    style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                                >
                                    <option value="">Select feed</option>
                                    {feedlist?.data.map((data: IFeedListType) => (
                                        <option value={data.id} key={data.id}>
                                            {data.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            {/* Price */}
                            <div>
                                {index === 0 && (
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                        Price
                                    </label>
                                )}
                                <SportsInput
                                    type="text"
                                    name={`dealer_price_${field.id}`}
                                    errors={error}
                                    placeholder="Enter Price"
                                    style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                />
                            </div>

                            {/* Feed Type */}
                            <div>
                                {index === 0 && (
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                        Unit
                                    </label>
                                )}
                                <Select
                                    name={`unit_${field.id}`}
                                    style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                                >
                                    <option value="">Select Feed Unit</option>
                                    <option value="KG">KG</option>
                                    <option value="Gram">Gram</option>
                                    <option value="Litre">Litre</option>
                                    <option value="Ml">Ml</option>
                                    <option value="Piece">Piece</option>
                                    <option value="Ton">Ton</option>
                                </Select>
                            </div>

                            {/* Action */}
                            <div>
                                {index === 0 && (
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                        Action
                                    </label>
                                )}
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleAddField}
                                        className="btn btn-sm btn-success mt-2 mr-2"
                                    >
                                        <FaPlus size={18} className="cursor-pointer text-white" />
                                    </button>
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField(field.id)}
                                            className="btn btn-sm btn-error mt-2"
                                        >
                                            <FaTrash size={18} className="cursor-pointer text-white" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {userRole == "admin" && (
                            <div>
                                {index === 0 && ( // Render label only for the first field
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                       Admin Price
                                    </label>
                                )}
                                <SportsInput
                                    type="text"
                                    name={`admin_price_${field.id}`}
                                    errors={error}
                                    placeholder="Enter Admin Price"
                                    style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                />
                            </div>
                            )}
                        </div>
                    ))}
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
};