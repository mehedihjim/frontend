import batchPriceSetupValidation from "@/app/valodators/batch/batchPriceSetupValidation";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import { useBatchSellingPriceSetMutation } from "@/redux/api/batchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const PriceForm = ({id,refetch,old_price}:any) => {
    const [error, setError] = useState({});
    const[priceSetApi] = useBatchSellingPriceSetMutation();
    const handleSubmit = async (values: FieldValues) => {
        const playload = {
            id:id,
            data:values
        };
        try {
          const res = await priceSetApi(playload).unwrap();
          if (res) {
            setError({});
            refetch();
            toast.success(res?.message || "Selling Price created successfully");
            // const routePrefix = "/admin/ready-batch/approved-list"; // Define the route prefix
            // window.location.href = `${routePrefix}`;
          } else {
            toast.error(res?.message);
            setError(res?.data || res?.error || "Something went wrong!");
          }
        } catch (err: any) {
          setError(err.errors);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-6">
        <SportsFrom
        resolver={zodResolver(batchPriceSetupValidation)}
        isReset={false}
        onSubmit={handleSubmit}
      >
        <div className="mb-2 mt-6 rounded bg-white p-3 shadow dark:bg-boxdark">
         
          <h2 className="text-md font-bold text-gray-800 mb-2 border p-2 rounded bg-yellow-200">
            Present Selling Price: <span className="text-red-700">{old_price}</span> TK
          </h2>
        <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Update Selling Price (Per KG) <span className="text-danger">*</span>
              </label>
              <SportsInput
                type="number"
                name="selling_price"
                errors={error}
                placeholder="Enter Selling Price"
                // value={singleBatchData?.chick_price}
                style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
              />
            </div>
        
        </div>

        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="btn btn-sm rounded border-none bg-red-700 text-white hover:bg-red-800"
          >
            Update Price
          </button>
        </div>
      </SportsFrom>
      </div >
    )
}