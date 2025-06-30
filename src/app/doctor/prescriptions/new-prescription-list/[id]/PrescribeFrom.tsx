"use client";

import Select from "@/components/Froms/Select";
import SportsFrom from "@/components/Froms/SportsFrom";
import SportsInput from "@/components/Froms/SportsInput";
import SportsTextArea from "@/components/Froms/SportsTextArea";
import { usePrescribeMedicineStoreMutation, useSinglePrescriptionQuery } from "@/redux/api/prescriptionApi";
import Image from "next/image";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { BiCut, BiPlus, BiSolidFile, BiSolidSave, BiSolidTrashAlt } from "react-icons/bi";
import SymptomsComponent from "../component/Symtoms";
import DisgestiveSystem from "../component/disgestive_system";
import RespiratorySystem from "../component/RespiratorySystem";
import { toast } from "sonner";
import Postmortem from "../component/postmortem";
import { FaFilePrescription, FaPrescription } from "react-icons/fa6";

export const PrescribeFrom = ({ pres_id }: any) => {
    const { data: prescribeData, isLoading, error } = useSinglePrescriptionQuery(pres_id);
    const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
        null,
    );
     const [err, setError] = useState({});
     const [createPrescription] = usePrescribeMedicineStoreMutation();
    const handleSubmit = async (values: FieldValues) => {
        let data = {...values,items:[...medicineArray],prescription_id:prescribeData.data.id,prescription_details_id:prescribeData.data.details[0].id}
        try {
            const res = await createPrescription(data).unwrap();
            if (res) {
              setError("");
              if (resetForm) {
                resetForm({
                    date:'',
                    followup_date:'',
                    advice:'',
                    disease:'',
                    note:''
                });
              }
              toast.success(res?.message || "Shed created successfully");
            } else {
              toast.error(res?.message);
              setError(res?.data || res?.error || "Something went wrong!");
            }
          } catch (err: any) {
            setError(err.errors);
          }
    };

    const [formData, setFormData] = useState({
        medicine_name: '',
        medicine_type: '',
        qty: '',
        dosage: '',
        duration: '',
        note: ''
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [medicineArray, setMedicineArray] = useState<any[]>([]);

    const addMedicine = () => {
        const newMedicine = {
            medicine_name: formData.medicine_name,
            medicine_type: formData.medicine_type,
            qty: formData.qty,
            dosage: formData.dosage,
            duration: formData.duration,
            note: formData.note
        };

        setMedicineArray([...medicineArray, newMedicine]);
        setFormData({
            medicine_name: '',
            medicine_type: '',
            qty: '',
            dosage: '',
            duration: '',
            note: ''
        });
    };

    const removeMedicine = (index: number) => {
        setMedicineArray(medicineArray.filter((_, i) => i !== index));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data!</div>;
    }
    const cellStyle = {
        border: "1px solid black",
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 border-b-2 border-dashed pb-2 border-green-600 flex"><FaFilePrescription className="text-red-700" size={30} /> Prescription</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-1 mt-3">
                <div className="collapse collapse-arrow  bg-white border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title flex font-bold bg-gradient-to-r from-orange-700 to-orange-400 text-white"><BiCut size={25} className="border rounded-lg mr-2" /> Postmortem</div>
                    <div className="collapse-content">
                        <DisgestiveSystem disgestive_system={prescribeData?.data.details[0].disgestive_system} />
                        <RespiratorySystem respiratory_system={prescribeData?.data.details[0].respiratory_system} />
                        <Postmortem postmortem={prescribeData?.data.details[0]} />
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold flex  bg-gradient-to-r from-blue-700 to-blue-400 text-white"><BiSolidFile size={25} className="border rounded-lg mr-2" />Images & Details</div>
                    <div className="collapse-content ">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {prescribeData?.data.details[0].images.map((image: any, index: number) => (
                                <div key={index} className="relative">
                                    <a href={image} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={image}
                                            alt={image}
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-64 rounded-lg"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 mt-4 mb-4">
                            <h4 className="text-xl border-b font-bold">Disease Details</h4>
                            <p className="text-justify text-black">{prescribeData?.data.details[0].disease_description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table section */}
            <SportsFrom
                //   resolver={zodResolver(prescriptionValidation)}
                //   defaultValues={batchCreateDefaultValues(singleBatchData)}
                onSubmit={handleSubmit}
                isReset={true}
                setInputValues={(reset) => setResetForm(() => reset)}
            >
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
                                            Disease
                                        </label>
                                        <SportsInput
                                            type="text"
                                            name="disease"
                                            errors={err}
                                            placeholder="Enter Disease"
                                            style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                        />
                                    </div>
                                </td>
                                <td colSpan={3} style={cellStyle} className="relative">
                                    <h2 className="text-3xl font-bold text-black absolute bottom-1 left-1"><FaPrescription size={40}/></h2>
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

                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    <strong>Advice:</strong><br />
                                                    <SportsTextArea
                                                        name="advice"
                                                        rows={3}
                                                        errors={err}
                                                        placeholder="Advice"
                                                        style="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td colSpan={3} style={cellStyle}>

                                    <div className="grid gap-5 grid-cols-4">
                                        <div className="col-span-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Medicine Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="medicine_name"
                                                    value={formData.medicine_name}
                                                    placeholder="Enter Medicine Name"
                                                    onChange={handleInputChange}
                                                    className="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Type <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    name="medicine_type"
                                                    value={formData.medicine_type}
                                                    onChange={handleInputChange}
                                                    className="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="Capsule">Capsule</option>
                                                    <option value="Syrup">Syrup</option>
                                                    <option value="Injection">Injection</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="text"
                                                    name="qty"
                                                    value={formData.qty}
                                                    placeholder="Enter Quantity"
                                                    onChange={handleInputChange}
                                                    className="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Dosage <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    name="dosage"
                                                    value={formData.dosage}
                                                    onChange={handleInputChange}
                                                    className="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                                                >
                                                    <option value="">Select Dosage</option>
                                                    <option value="0+0+0">0+0+0</option>
                                                    <option value="0+0+1">0+0+1</option>
                                                    <option value="0+1+0">0+1+0</option>
                                                    <option value="1+0+0">1+0+0</option>
                                                    <option value="0+1+1">0+1+1</option>
                                                    <option value="1+0+1">1+0+1</option>
                                                    <option value="1+1+0">1+1+0</option>
                                                    <option value="1+1+1">1+1+1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    value={formData.duration}
                                                    placeholder="Enter comment"
                                                    onChange={handleInputChange}
                                                    className="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                    Note
                                                </label>
                                                <input
                                                    type="text"
                                                    name="note"
                                                    value={formData.note}
                                                    placeholder="Enter Note"
                                                    onChange={handleInputChange}
                                                    className="input input-sm input-bordered w-full max-w-full bg-white dark:bg-black md:input-md"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right mt-5 mb-2">
                                        <a
                                            className="btn bg-green-600 btn-sm text-white d-flex"
                                            onClick={addMedicine}
                                        >
                                            <BiPlus size={25} /> Add Medicine
                                        </a>
                                    </div>

                                    <hr />
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-slate-600">Medicine</th>
                                                <th className="text-slate-600">Type</th>
                                                <th className="text-slate-600">Quantity</th>
                                                <th className="text-slate-600">Dosage</th>
                                                <th className="text-slate-600">Duration</th>
                                                <th className="text-slate-600">Note</th>
                                                <th className="text-slate-600">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicineArray?.map((item:any, index:any) => (
                                                <tr key={index}>
                                                    <td className="p-1">{item.medicine_name}</td>
                                                    <td className="p-1">{item.medicine_type}</td>
                                                    <td className="p-1">{item.qty}</td>
                                                    <td className="p-1">{item.dosage}</td>
                                                    <td className="p-1">{item.duration}</td>
                                                    <td className="p-1">{item.note}</td>
                                                    <td className="p-1">
                                                        <button className="btn bg-red-600 btn-sm text-white" onClick={()=>removeMedicine(index)}><BiSolidTrashAlt /></button>
                                                    </td>
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
                                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                               Prescribe Date:
                                            </label>
                                            <SportsInput
                                                type="date"
                                                name="date"
                                                errors={err}
                                                placeholder="dd/mm/yyyy"
                                                style="input input-date-light input-bordered w-50 bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                                            />
                                        </div>
                                        <div className="input-container w-50">
                                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                                Follow Up:
                                            </label>
                                            <SportsInput
                                                type="date"
                                                name="followup_date"
                                                errors={err}
                                                placeholder="dd/mm/yyyy"
                                                style="input input-date-light input-bordered w-50 bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                                            />
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
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">Note:</label>
                                    <SportsTextArea
                                        name="note"
                                        rows={1}
                                        errors={err}
                                        placeholder="Enter note"
                                        style="textarea textarea-bordered w-full max-w-full bg-white dark:bg-black md:textarea-md"
                                    />
                                </td>
                                <td className="text-center">
                                    <h3 className="text-xl">Signature</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center mt-5 mb-2">
                        <button type="submit" className="btn bg-red-600 text-white d-flex btn-wide"><BiSolidSave size={25} /> Save Prescription</button>
                    </div>
                </div>
            </SportsFrom>
        </div>
    );
};