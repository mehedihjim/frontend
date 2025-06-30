"use client";

import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetFeedlistQuery } from "@/redux/api/feedlistApi";
import {
  useCreateFeedStockMutation,
  useGetFeedStockListByDealerIdQuery,
} from "@/redux/api/feedStockApi";
import { useAppSelector } from "@/redux/hooks";
import { IFeedStockData, IItem, UserType } from "@/types/common";
import { formatItems } from "@/utils/format_items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const FeedAddForm = () => {
  const { unregister } = useForm();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const dealer_id = user?.id;
  const role = user?.user_type;

  const { data, isLoading } = useGetFeedlistQuery({});
  const { data: feedStockList, isLoading: feedStockListLoading } =
    useGetFeedStockListByDealerIdQuery(dealer_id);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);
  const [dropDownData, setDropDownData] = useState<IItem[]>([]);
  const [addFeedStock] = useCreateFeedStockMutation();

  // Making Sure Dropdown has Only feed that Dealer hasn't already added
  // Get all feed_id values from feedStockList
  const feedIdsToRemove = new Set(
    feedStockList?.data?.map((item: any) => item.feed_id),
  );
  // Filter out items in data1 where id is in feedIdsToRemove
  const filteredData = data?.data.filter(
    (item: any) => !feedIdsToRemove.has(item.id),
  );
  useEffect(() => {
    if (data?.data) {
      setDropDownData([...filteredData]);
    }
  }, [data]);

  let validationSchema;
  // Base schema
  const baseSchema = z.object({
    comment: z.string().optional(),
  });

  // Dynamic schema properties
  const dynamicSchema = data?.data.reduce((acc: any, item: IItem) => {
    acc["sportsName-" + item.id] = z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().nullable(),
    );
    acc["sportsPrice-" + item.id] = z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().nullable(),
    );
    acc["sportsUnit-" + item.id] = z.string();
    return acc;
  }, {});

  // Convert dynamic properties to ZodObject
  const dynamicZodSchema = z.object(dynamicSchema);

  // Merge the base schema with the dynamic schema
  validationSchema = baseSchema.merge(dynamicZodSchema);
  if (isLoading) {
    return (
      <div className="flex h-2/3 place-items-center justify-center">
        <span className="loading loading-bars loading-lg inline-block h-96"></span>
      </div>
    );
  }
  let defaultValue: Record<string, number | string> = {
    comment: "",
  }; // Initialize defaultValue
  data?.data.forEach((element: IItem) => {
    defaultValue = {
      ...defaultValue,
      ["sportsName-" + element.id]: "",
      ["sportsPrice-" + element.id]: "",
      ["sportsUnit-" + element.id]: "",
    };
  });
  let defaultValues;

  defaultValues = {
    ...defaultValue,
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values, "form values");

    try {
      const formattedItems: IFeedStockData = formatItems(
        values,
        true,
        selectedItems,
      );
      const { feeds } = formattedItems;
      if (!feeds?.length) {
        toast.error("Please select at least one item!!");
        return;
      }

      delete formattedItems.comment;

      const payload = {
        dealer_id: dealer_id,
        ...formattedItems,
      };

      const res = await addFeedStock(payload).unwrap();
      if (res.success) {
        // router.push(`/${role}/applications`);
        toast.success(res?.message || "Requisition submitted successfully!!");
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
    const selectedItem = data?.data.find((item: IItem) => item.id == e);
    //remove the selected item from the dropdown
    setSelectedValue("");
    setDropDownData(dropDownData.filter((item) => item.id !== e));
    setSelectedItems([...selectedItems, selectedItem]);
  };
  const handleRemoveInput = (id: number) => {
    unregister(`sportsName-${id}`);
    unregister(`sportsPrice-${id}`);
    unregister(`sportsUnit-${id}`);
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
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <div className="mb-2 mt-6 rounded bg-white p-3 p-5 shadow dark:bg-boxdark">
          <div className="table-headline mb-4 dark:text-white">
            Add Feed Items and Set Price
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
              <option selected value="">
                Select Feed <span className="text-danger">*</span>
              </option>
              {dropDownData.map((item: IItem) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {
            <div className="grid grid-cols-1 gap-4">
              {selectedItems &&
                selectedItems.map((item: IItem) => (
                  <div key={item.id} className="flex gap-1 md:gap-2">
                    <div className="w-75">
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        {item.name} Qty <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="number"
                        name={"sportsName" + "-" + item.id}
                        style="input input-bordered dark:focus:border-slate-500 dark:border-sky-950 w-full max-w-xs bg-white dark:bg-black"
                      />
                    </div>
                    <div className="w-75">
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        {item.name} price <span className="text-danger">*</span>
                      </label>
                      <SportsInput
                        type="number"
                        name={"sportsPrice" + "-" + item.id}
                        style="input input-bordered dark:focus:border-slate-500 dark:border-sky-950 w-full max-w-xs bg-white dark:bg-black"
                      />
                    </div>
                    <div className="w-75">
                      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                        {item.name} Unit <span className="text-danger">*</span>
                      </label>
                      <Select
                        name={"sportsUnit" + "-" + item.id}
                        style="select select-bordered w-full max-w-xs bg-white dark:bg-black"
                      >
                        <option value=""></option>
                        <option value="KG">KG</option>
                        <option value="Gram">Gram</option>
                        <option value="Liter">Liter</option>
                        <option value="Ml">mL</option>
                        <option value="Piece">Piece</option>
                        <option value="Ton">Ton</option>
                        <option value="Maund">Maund</option>
                      </Select>
                    </div>
                    <div className="relative ms-1 w-25">
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

export default FeedAddForm;
