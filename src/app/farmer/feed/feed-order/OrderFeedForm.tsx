"use client";
import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useCreateFeedOrderMutation } from "@/redux/api/feedOrderApi";
import { useGetFeedStockListByDealerIdQuery } from "@/redux/api/feedStockApi";
import { useGetUsersByTypeQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { formatOrderFeedItems } from "@/utils/format_order_feed_items";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const OrderFeedForm = ({ batch_id }: any) => {
  const { unregister } = useForm();
  const router = useRouter();

  const [selectedFeedSeller, setSelectedFeedSeller] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [dropDownData, setDropDownData] = useState<any[]>([]);

  const [createFeedOrder] = useCreateFeedOrderMutation();
  const { data: feedSellerData, isLoading: feedSellerLoding } =
    useGetUsersByTypeQuery("feed-seller");
  const {
    data: feedStockList,
    isLoading: feedStockListLoading,
    refetch,
  } = useGetFeedStockListByDealerIdQuery(selectedFeedSeller, {
    skip: !selectedFeedSeller, // Skip the query if empty string
  });

  useEffect(() => {
    if (feedStockList?.data) {
      setDropDownData([...feedStockList.data]);
    }
  }, [feedStockList]);

  let validationSchema;
  // Base schema
  const baseSchema = z.object({
    batch_id: z.string().optional(),
    farmer_id: z.string().optional(),
    dealer_id: z.string().optional(),
  });

  // Dynamic schema properties
  const dynamicSchema = feedStockList?.data.reduce((acc: any, item: any) => {
    acc["sportsName-" + item.id] = z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().nullable(),
    );
    acc["sportsPrice-" + item.id] = z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().nullable(),
    );
    return acc;
  }, {});

  // Convert dynamic properties to ZodObject
  const dynamicZodSchema = z.object(dynamicSchema);

  // Merge the base schema with the dynamic schema
  validationSchema = baseSchema.merge(dynamicZodSchema);

  let defaultValue: Record<string, number | string> = {
    comment: "",
  }; // Initialize defaultValue
  feedStockList?.data.forEach((element: any) => {
    defaultValue = {
      ...defaultValue,
      ["sportsName-" + element.id]: "",
      ["sportsPrice-" + element.id]: "",
    };
  });
  let defaultValues;

  defaultValues = {
    ...defaultValue,
  };

  const handleSetFeedSeller = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFeedSeller(e.target.value);
    refetch();
    console.log(selectedFeedSeller, "change option feed seller");
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values, "form values");

    const formattedItems: any = formatOrderFeedItems(
      values,
      feedStockList,
      true,
      selectedItems,
    );

    console.log(formattedItems, "formatted items");
    let payload = {
      batch_id,
      dealer_id: selectedFeedSeller,
      ...formattedItems,
    };
    console.log(payload, "payload");
    try {
      const res = await createFeedOrder(payload).unwrap();
      if (res.success) {
        toast.success(res?.message || "Feed Ordered!!");
        setTimeout(() => {
          router.push(`/farmer/feed/previous-feed-orders`);
        }, 1000);
      } else {
        toast.error(res?.message || "Something went wrong!!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!!");
    }
  };

  const changeHandler = (e: number) => {
    if (!e) return;
    const selectedItem = feedStockList?.data.find((item: any) => item.id == e);
    //remove the selected item from the dropdown
    setSelectedValue("");
    setDropDownData(dropDownData.filter((item) => item.id !== e));
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleRemoveInput = (id: number) => {
    unregister(`sportsName-${id}`);
    unregister(`sportsPrice-${id}`);
    const selectedItem = selectedItems.find((item) => item.id === id);
    setSelectedItems(selectedItems.filter((item) => item.id !== id));

    if (selectedItem) {
      const alldropDownData = [...dropDownData, selectedItem];
      // sort the dropdown data
      alldropDownData.sort((a, b) => a.id - b.id);
      setDropDownData(alldropDownData);
    }
  };

  return (
    <>
      <SportsFrom
        isReset={false}
        // resolver={zodResolver(validationSchema)}
        // defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <div className="mb-2 mt-6 rounded bg-white p-3 p-5 shadow dark:bg-boxdark">
          <div className="pb-5">
            <label
              htmlFor="sports"
              className="mb-1  block text-sm font-medium text-black dark:text-white"
            >
              Select Feed Seller <span className="text-danger">*</span>
            </label>
            <select
              name="dealer_id"
              className="select select-bordered w-full max-w-xs bg-white dark:bg-black"
              onChange={handleSetFeedSeller}
            >
              <option value="">Select Feed Seller</option>
              {feedSellerData?.data.map((feedSeller: any) => (
                <option value={feedSeller?.id} key={feedSeller?.id}>
                  {feedSeller?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-5">
            <label
              htmlFor="sports"
              className="mb-1  block text-sm font-medium text-black dark:text-white"
            >
              Select Feed <span className="text-danger">*</span>
            </label>
            <select
              value={selectedValue}
              onChange={(e) => {
                const target = e.target as HTMLSelectElement;
                changeHandler(Number(target.value));
              }}
              className="select input-bordered w-full max-w-xs bg-white dark:border-sky-950 dark:bg-black dark:focus:border-slate-500"
              name="sports"
              id="sports"
            >
              {selectedFeedSeller && feedStockList?.data?.length > 0 && (
                <>
                  <option value="">
                    Select Feed <span className="text-danger">*</span>
                  </option>
                  {dropDownData.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.feed_name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedItems &&
                selectedItems.map((item: any) => (
                  <div key={item.id} className="flex gap-1 md:gap-2">
                    <div className="w-full">
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        {item.feed_name} Qty{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <SportsInput
                          type="number"
                          name={"sportsName" + "-" + item.id}
                          style="input input-bordered dark:focus:border-slate-500 dark:border-sky-950 w-full max-w-xs bg-white dark:bg-black"
                        />
                        <small className="text-nowrap font-semibold text-orange-500">
                          {item?.price} tk / {item?.unit}
                        </small>
                      </div>
                    </div>
                    <div className="relative mb-2 ms-1 w-25">
                      <button
                        type="button"
                        onClick={() => handleRemoveInput(item.id)}
                        className="btn btn-outline btn-error btn-sm absolute bottom-0 left-1/2 -translate-x-1/2 transform hover:text-white md:left-1/4"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          }
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-sm rounded border-none bg-red-700 text-white hover:bg-red-800"
          >
            Submit
          </button>
        </div>
      </SportsFrom>
    </>
  );
};

export default OrderFeedForm;
