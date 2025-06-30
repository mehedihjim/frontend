import { FaPrescription } from "react-icons/fa6"
import { useSinglePrescriptionQuery } from "@/redux/api/prescriptionApi";
import SymptomsComponent from "@/app/doctor/prescriptions/new-prescription-list/component/Symtoms";

export const PrescriptionListView = ({prescription_id}:any) => {
     const { data: prescribeData, isLoading, error } = useSinglePrescriptionQuery(prescription_id);
     console.log("prescribeData", prescribeData);
    if (isLoading) return <p>Loading...</p>;
    const cellStyle = {
        border: "1px solid black",
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-4 text-2xl font-bold border-b">Previous Prescriptions</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-1 mt-5 ">
                    <table className="table w-full bg-orange-50" style={{ width: "100%", border: "1px solid #000" }}>
                        <tbody>
                            <tr>
                                <td className="text-center font-bold text-xl " colSpan={4}>Prescription</td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={cellStyle}>
                                    <h4 className="text-lg font-bold">{prescribeData?.data.doctor_name}</h4>
                                    <h6 className="font-bold">BVC No: {prescribeData?.data.bvc_no ?? ''}</h6>
                                </td>
                                <td colSpan={1} style={cellStyle}>
                                    <h6><strong>Shed No:</strong> {prescribeData?.data.shed_no}</h6>
                                    <h6><strong>Batch No:</strong> {prescribeData?.data.batch_no}</h6>
                                    <h6><strong>Treatement Date:</strong> {prescribeData?.data.treatment_date}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>
                                    <strong>Bird Type:</strong> <span>{prescribeData?.data.bird_type}</span>
                                </td>
                                <td style={cellStyle}>
                                    <strong>Birds in Batch:</strong> <span>{prescribeData?.data.bird_in_batch}</span>
                                </td>
                                <td style={cellStyle}>
                                    <strong>Average Weight:</strong> <span>{prescribeData?.data.average_weight ?? ''}</span>
                                </td>
                                <td style={cellStyle}>
                                    <strong>Age:</strong> <span>{prescribeData?.data.age ?? ''}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={cellStyle}>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                            Disease:
                                        </label>
                                        <p>{prescribeData?.data.details[0].disease ?? ''}</p>
                                    </div>
                                </td>
                                <td colSpan={3} style={cellStyle} className="relative">
                                    <h2 className="text-3xl font-bold text-black absolute bottom-1 left-1"><FaPrescription size={35}/></h2>
                                </td>
                            </tr>
                            <tr className="p-0">
                                <td className="p-0" style={cellStyle}>
                                    <table className="table w-full">
                                        <tbody>
                                            <tr>
                                                <td width={350}>
                                                    <SymptomsComponent symptoms={prescribeData?.data.details[0].symptoms} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td  >
                                                    <strong>Complaints:</strong><br />
                                                    {prescribeData?.data.details[0].complaints}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    <strong>Advice:</strong><br />
                                                   {prescribeData?.data.details[0].advice}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: "top" }} className="p-0">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-slate-500">No.</th>
                                                <th className="text-slate-500 text-center">Medicine</th>
                                                <th className="text-slate-500 text-center">Type</th>
                                                <th className="text-slate-500 text-center">Quantity</th>
                                                <th className="text-slate-500 text-center">Dosage</th>
                                                <th className="text-slate-500 text-center">Duration</th>
                                                <th className="text-slate-500 text-center">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescribeData?.data.medicine.map((medicine: any, index: number) => (
                                                <tr key={index}>
                                                    <td className="p-1">{index + 1}.</td>
                                                    <td className="p-1 text-center">{medicine.medicine_name ?? ''}</td>
                                                    <td className="p-1 text-center">{medicine.medicine_type ?? ''}</td>
                                                    <td className="p-1 text-center">{medicine.qty ?? ''}</td>
                                                    <td className="p-1 text-center">{medicine.dosage ?? ''}</td>
                                                    <td className="p-1 text-center">{medicine.duration ?? ''}  { medicine.duration ? 'Days' : ''}</td>
                                                    <td className="p-1 text-center">{medicine.note ?? ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className="border-none">
                                <td colSpan={3} className="border-b border-r" >
                                    <div className="flex gap-5">
                                       <div className="input-container w-50">
                                            <label className="mb-1 block text-sm font-bold dark:text-white">
                                               Prescribe Date:
                                            </label>
                                           {prescribeData?.data.medicine[0]?.date ?? ''}
                                        </div>
                                        <div className="input-container w-50">
                                            <label className="mb-1 block text-sm font-bold dark:text-white">
                                                Follow Up:
                                            </label>
                                           {prescribeData?.data.followup_date}
                                        </div> 
                                    </div>
                                    
                                </td>
                                <td className="border-b border-dashed "> 
                                    <div className="flex justify-center items-center">
                                       <img src={prescribeData?.data.doctor_sign ?? `https://clipart-library.com/images/Bigrn8nBT.png`} alt="sign" className="size-10 object-center w-auto" /> 
                                    </div>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={cellStyle}>
                                    <label className="mb-1 block text-sm font-bold dark:text-white">Note:</label>
                                   {prescribeData?.data.note}
                                </td>
                                <td className="text-center">
                                    <h3 className="text-xl">Signature</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
        )
}