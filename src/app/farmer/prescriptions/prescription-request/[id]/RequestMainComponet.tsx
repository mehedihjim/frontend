"use client";

import RequestForm from "./RequestForm";

const RequestMainComponet = ({batch_id}: any) => {
    return (
        <>
          <div className="container mx-auto p-4">
          <h1 className="mb-4 text-2xl font-bold border-b pb-2">Prescription Request</h1> 
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full ">
                <RequestForm batch_id={batch_id} />
             {/* Form section */}
           
            </div>
            {/* <div className="w-full sm:w-1/2">
           
            </div> */}
          </div> 
          </div>
          {/* <DeleteConfrim
            titel="Expense"
            itemToSelect={itemDeleteToSelect}
            handleItemRemove={handleItemRemove}
            closeDeleteShedModal={closeDeleteShedModal}
            />
          {itemView && (
              <ExpenseView
              singleIncome={itemView}
              onClose={() => setItemView(null)}
              />
            )} */}
        </>
      );
};

export default RequestMainComponet;