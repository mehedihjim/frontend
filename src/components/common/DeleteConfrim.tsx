import { BsExclamationCircle } from "react-icons/bs"

export const DeleteConfrim = ({ itemToSelect, handleItemRemove, closeDeleteShedModal,titel }: any) => {
    return (
        <dialog id="delete_shed_modal" className="modal">
            <div className="modal-box bg-white dark:bg-black">
                <div className="mt-6 flex flex-col items-center text-center">
                    <div className="text-lg font-bold">
                        <BsExclamationCircle
                            size={70}
                            className="text-rose-700 dark:text-rose-500"
                        />
                    </div>
                    <p className="mt-2 py-4 text-lg font-medium">
                        Are you sure you want to delete this {titel}?
                    </p>
                </div>
                <div className="modal-action">
                    <div>
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex gap-1">
                            <button
                                onClick={closeDeleteShedModal}
                                type="button"
                                className="rounded-1 btn btn-sm border-0 bg-rose-800 text-white hover:bg-rose-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleItemRemove(itemToSelect as number)}
                                className="rounded-1 btn btn-sm border-0 bg-sky-900 text-white hover:bg-green-800"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )

}

