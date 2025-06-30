"use client";

export const ShedViewModal = ({ shedViewData, onClose }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-10">
      <div className="w-1/3 rounded bg-white p-4 shadow-lg dark:bg-black">
        <h2 className="mb-4 text-xl font-bold">Shed Details</h2>
        <div className=" block w-full overflow-x-auto rounded">
          <table className="w-full border-collapse items-center bg-transparent">
            <tbody>
              <tr>
                <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                  ID:
                </th>
                <td className="text-sm font-semibold text-sky-950 dark:text-white">
                  {shedViewData?.id}
                </td>
              </tr>
              <tr>
                <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                  Shed:
                </th>
                <td className="text-sm font-semibold text-sky-950 dark:text-white">
                  {shedViewData?.name}
                </td>
              </tr>
              <tr>
                <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                  District:
                </th>
                <td className="text-sm font-semibold text-sky-950 dark:text-white">
                  {shedViewData?.district_name}
                </td>
              </tr>
              <tr>
                <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                  Address:
                </th>
                <td className="text-sm font-semibold text-sky-950 dark:text-white">
                  {shedViewData?.address}
                </td>
              </tr>
            </tbody>
          </table>
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
