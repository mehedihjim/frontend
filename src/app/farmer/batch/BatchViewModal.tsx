"use client";
export const BatchViewModal = ({ singleBatchData, onClose }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-10">
      <div className="w-1/3 rounded bg-white p-4 shadow-lg dark:bg-black">
        <div className="mt-6 overflow-x-auto">
          <div className="mb-6 text-center text-2xl font-semibold text-sky-950 dark:text-white">
            Batch Information
          </div>
          <div className="block w-full overflow-x-auto rounded">
            <table className="w-full border-collapse items-center bg-transparent">
              <tbody>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    ID:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.id}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Shed:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.shed_name}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Batch Number:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.batch_number}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Hen Type:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.hen_type}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Chicken Number:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.chick_number}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Chicken Price:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.chick_price}
                  </td>
                </tr>
                <tr>
                  <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                    Start Date:
                  </th>
                  <td className="text-sm font-semibold text-sky-950 dark:text-white">
                    {singleBatchData?.start_date}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-action">
          <div>
            {/* if there is a button in form, it will close the modal */}
            <div className="flex gap-1">
              <button
                onClick={onClose}
                type="button"
                className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};