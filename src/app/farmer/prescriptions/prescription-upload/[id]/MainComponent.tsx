import PresForm from "./PresForm";
import { PresTable } from "./PresTable";


const MainComponent = ({batchId}: any) => {

   return (
           <>
             <div className="container mx-auto p-4">
             <h1 className="mb-4 text-2xl font-bold border-b pb-2">Prescription Management</h1> 
             <div className="flex flex-col gap-6 sm:flex-row justify-center">
               <div className="w-full sm:w-1/2">
               
                {/* Form section */}
                <PresForm batch_id={batchId} />
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

export default MainComponent;