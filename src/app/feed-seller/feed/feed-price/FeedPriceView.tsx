"use client";
export const FeedPriceView = ({ feedPriceView, onClose, userType }: any) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-10">
            <div className="w-1/3 rounded bg-white p-4 shadow-lg dark:bg-black">
                <div className="mt-6 overflow-x-auto">
                    <div className="mb-6 text-center text-2xl font-semibold border-b text-sky-950 dark:text-white">
                        Feed Price View
                    </div>
                    <div className="block w-full overflow-x-auto rounded">
                        <table className="w-full border-collapse items-center bg-transparent">
                            <tbody>
                                <tr>
                                    <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                        ID:
                                    </th>
                                    <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                        {feedPriceView?.id}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                        Name:
                                    </th>
                                    <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                        {feedPriceView?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                        Price:
                                    </th>
                                    <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                        {feedPriceView?.dealer_price}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                        Unit:
                                    </th>
                                    <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                        {feedPriceView?.unit}
                                    </td>
                                </tr>
                                {userType === "admin" && (
                                    <> <tr>
                                        <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                            Admin Price:
                                        </th>
                                        <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                            {feedPriceView?.price}
                                        </td>
                                    </tr>
                                        <tr>
                                            <th className="pe-6 text-end text-base font-semibold text-sky-950 dark:text-sky-200">
                                                Seller Name:
                                            </th>
                                            <td className="text-sm font-semibold text-sky-950 dark:text-white">
                                                {feedPriceView?.seller_name}
                                            </td>
                                        </tr>
                                        
                                    </>
                                )}
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