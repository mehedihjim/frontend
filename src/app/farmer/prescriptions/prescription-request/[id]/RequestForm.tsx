"use client";

import SportsFrom from "@/components/Froms/SportsFrom";
import { useSingleBatchQuery } from "@/redux/api/batchApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Select from "@/components/Froms/Select";
import { toast } from "sonner";
import SportsInput from "@/components/Froms/SportsInput";
import { useGetUsersByTypeQuery } from "@/redux/api/userApi";
import { IUser } from "@/types/user.type";
import { BiCut, BiSolidExtension, BiSolidFile } from "react-icons/bi";
import SportsTextArea from "@/components/Froms/SportsTextArea";
import { IoMdPhotos } from "react-icons/io";
import ProfilePhotoUploader from "@/components/Froms/SportsProfileUpload";
import { LuUpload } from "react-icons/lu";
import CheckboxInput from "@/components/Froms/CheckBoxInput";
import CheckboxGroup from "@/components/Froms/CheckboxGroup";
import { formDataPayload } from "@/utils/modifyPayload";
import { useStorePrescriptionMutation } from "@/redux/api/prescriptionApi";
import { PiHashBold } from "react-icons/pi";
import prescriptionValidation from "@/app/valodators/prescription/prescriptionValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const RequestForm = ({ batch_id }: any) => {
    const [resetProps, setResetProps] = useState<boolean>(false);
    const [resetForm, setResetForm] = useState<((values: any) => void) | null>(
        null,
    );
    const { data: batchData, isLoading, refetch } = useSingleBatchQuery(batch_id);
    const { data: doctorData, isLoading: doctorLoding } = useGetUsersByTypeQuery('doctor');
    const [createApi] = useStorePrescriptionMutation();
    const [error, setError] = useState({});
    const [submitType, setSubmitType] = useState<string>("create");
    const user = useAppSelector((state) => state.auth.user);
    const handleSubmit = async (values: FieldValues) => {
        const data = { ...values, batch_id: batchData?.data.id };
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );
        const playload = formDataPayload(filteredData);
        try {
            const res = await createApi(playload).unwrap();
            if (res) {
                if (resetForm) {
                    resetForm({
                        doctor_id: "",
                        date: "",
                        disease_description: "",
                    });
                }
                setError("");
                setResetProps(true);
                toast.success(res?.message || "Prescription created successfully");
            } else {
                toast.error(res?.message);
                setError(res?.data || res?.error || "Something went wrong!");
            }
        } catch (err: any) {
            setError(err.errors);
        }
    };
    //disgestive_system
    const Beak = [
        { label: "Congestion", value: "Congestion" },
        { label: "Cough", value: "Cough" },
    ];
    const digestive_esophagus = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Necrotic Foci", value: "Necrotic Foci" },
    ];
    const digestive_crop = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
        { label: "Presence of Foreign Particles", value: "Presence of Foreign Particles" },
    ];
    const digestive_proventriculus = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
        { label: "Softness of Epithelial Linings", value: "Softness of Epithelial Linings" },
    ];
    const digestive_gizzard = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
        { label: "Necrotic Foci", value: "Necrotic Foci" },
        { label: "Presence of Foreign Particles", value: "Presence of Foreign Particles" },
    ];
    const digestive_intestine = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
        { label: "Elongation", value: "Elongation" },
        { label: "Presence of Worm", value: "Presence of Worm" },
        { label: "Gaseous Material", value: "Gaseous Material" },
    ];
    const digestive_liver = [
        { label: "Enlarged", value: "Enlarged" },
        { label: "Necrotic Foci", value: "Necrotic Foci" },
        { label: "Fragile", value: "Fragile" },
        { label: "Soft Thin Layer on Liver", value: "Soft Thin Layer on Liver" },
        { label: "Color Change(Pale/Yellow/Greenish)", value: "Color Change(Pale/Yellow/Greenish)" },
    ];
    const digestive_gall_bladder = [
        { label: "Enlarged/Swollen", value: "Enlarged/Swollen" },
        { label: "Discoloration of Bile", value: "Discoloration of Bile" },
    ];
    const digestive_ceca = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
    ];
    const digestive_tonsils = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
    ];
    const digestive_cloaca = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Egg Stacking", value: "Egg Stacking" },
    ];
    const digestive_cavity_layer = [
        { label: "Dark Coveries", value: "Dark Coveries" },
        { label: "Hazy Thorecia", value: "Hazy Thorecia" },
    ];

    //Respiratory System
    const respiratory_trachea = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Mucosal Congestion", value: "Mucosal Congestion" },
        { label: "Caseous Exudation", value: "Caseous Exudation" },
        { label: "Caseous Plugs", value: "Caseous Plugs" },
    ];
    const respiratory_heart = [
        { label: "Heart Coveries", value: "Heart Coveries" },
        { label: "Pin Point Hemorrhage on Fatty Layer", value: "Pin Point Hemorrhage on Fatty Layer" },
    ];
    const respiratory_lungs = [
        { label: "Cough", value: "Cough" },
        { label: "Mucosal Congestion", value: "Mucosal Congestion" },
        { label: "Clotted Blood", value: "Clotted Blood" },
        { label: "Nodule", value: "Nodule" },
        { label: "Fluid Accumulation", value: "Fluid Accumulation" },
        { label: "Dark", value: "Dark" },
    ];
    const respiratory_air_sacs = [
        { label: "Caseous Mass", value: "Caseous Mass" },
        { label: "Nodule", value: "Nodule" },
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Congestion", value: "Congestion" },
        { label: "Cloudy & Foamy Materials", value: "Cloudy & Foamy Materials" },
    ];
    //Reproductive System
    const reproductive_ovary = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Tumor", value: "Tumor" },
    ];
    const reproductive_oviduct = [
        { label: "Caseous Mass", value: "Caseous Mass" },
        { label: "Clotted Blood", value: "Clotted Blood" },
        { label: "Edema", value: "Edema" },
    ];
    const reproductive_infundibulum = [
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Clotted Blood", value: "Clotted Blood" },
    ];
    const reproductive_vagina = [
        { label: "Fragile/Broken Egg", value: "Fragile/Broken Egg" },
        { label: "Prolapse of Vagina", value: "Prolapse of Vagina" },
        { label: "Presence of Foreign Particles", value: "Presence of Foreign Particles" },
    ];
    const reproductive_testis = [
        { label: "Tumor", value: "Tumor" },
        { label: "Uneven Size of Testis", value: "Uneven Size of Testis" },
    ];
    const reproductive_system = [
        { label: "Fragile/Broken Egg", value: "Fragile/Broken Egg" },
        { label: "Clotted Blood", value: "Clotted Blood" },
    ];
    //Lymphatic System
    const lymphatic_bursa_of_fabricius = [
        { label: "Enlarged", value: "Enlarged" },
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Caseous Mass", value: "Caseous Mass" },
        { label: "Gelatinous Fluid Around The Bursa", value: "Gelatinous Fluid Around The Bursa" },
    ];
    const lymphatic_spleen = [
        { label: "Enlarged", value: "Enlarged" },
        { label: "Hemorrhage", value: "Hemorrhage" },
        { label: "Glistening", value: "Glistening" },
        { label: "Tumor", value: "Tumor" },
        { label: "Damage", value: "Damage" },
    ];
    // Excretory System ...
    const excretory_kidney = [
        { label: "Swollen", value: "Swollen" },
        { label: "Pale", value: "Pale" },
        { label: "Congestion", value: "Congestion" },
    ];
    const excretory_ureter = [
        { label: "Hemorrhage", value: "Hemorrhage" },
    ];
    // Nervous System
    const nervous_nerve = [
        { label: "Irregular Thick Layer of Schiatic Nerve", value: "Irregular Thick Layer of Schiatic Nerve" },
        { label: "Enlarged, Edematous & Loss of Striation of Schiatic Muscle", value: "Enlarged, Edematous & Loss of Striation of Schiatic Muscle" },
    ];
    // Myology ..............
    const myology_breast_Leg_Muscles = [
        { label: "Swollen", value: "Swollen" },
        { label: "Pale", value: "Pale" },
        { label: "Congestion", value: "Congestion" },
        { label: "Discoloration of Muscle", value: "Discoloration of Muscle" },
        { label: "Blood", value: "Blood" },
    ];
    const myology_egg = [
        { label: "Soft Shell Egg", value: "Soft Shell Egg" },
        { label: "Egg Drop", value: "Egg Drop" },
        { label: "Irregular Shape", value: "Irregular Shape" },
        { label: "Thin Shelled Egg", value: "Thin Shelled Egg" },
    ];

    // symptoms ......
    const symptoms_beak = [
        { label: "Nodule", value: "Nodule" },
        { label: "Black", value: "Black" },
    ];
    const symptoms_wattle = [
        { label: "Swollen", value: "Swollen" },
        { label: "Pale", value: "Pale" },
        { label: "Congested", value: "Congested" },
        { label: "Tumor", value: "Tumor" },
        { label: "Nodule", value: "Nodule" },
        { label: "Black", value: "Black" },
    ];
    const symptoms_comb = [
        { label: "Nodule", value: "Nodule" },
        { label: "Pale", value: "Pale" },
        { label: "Black", value: "Black" },
        { label: "Tumor", value: "Tumor" },
        { label: "Swollen", value: "Swollen" },
    ];
    const symptoms_eye = [
        { label: "Swollen", value: "Swollen" },
        { label: "Congested", value: "Congested" },
        { label: "Discharge", value: "Discharge" },
        { label: "Conjunctivitis", value: "Conjunctivitis" },
        { label: "Nodule", value: "Nodule" },
    ];
    const symptoms_ear = [
        { label: "Swollen", value: "Swollen" },
        { label: "Discharge", value: "Discharge" },
    ];
    const symptoms_head = [
        { label: "Shaking", value: "Shaking" },
        { label: "Enlarged & Swollen", value: "Enlarged & Swollen" },
        { label: "Congested", value: "Congested" },
        { label: "Tremor", value: "Tremor" },
    ];
    const symptoms_feather = [
        { label: "Ruffled", value: "Ruffled" },
        { label: "Contaminated With Fecal Materials", value: "Contaminated With Fecal Materials" },
        { label: "Feather Falling", value: "Feather Falling" },
    ];
    const symptoms_dropping = [
        { label: "Droppings With Blood", value: "Droppings With Blood" },
        { label: "Greenish Droppings", value: "Greenish Droppings" },
        { label: "White Milky Runny", value: "White Milky Runny" },
        { label: "Brown Runny Droppings", value: "Brown Runny Droppings" },
        { label: "Clear/Watery Runny Droppings", value: "Clear/Watery Runny Droppings" },
        { label: "Yellow & Foamy Droppings", value: "Yellow & Foamy Droppings" },
        { label: "Diarrhoea", value: "Diarrhoea" },
    ];
    const symptoms_respiratory_system = [
        { label: "Coughing", value: "Coughing" },
        { label: "Nasal Discharge", value: "Nasal Discharge" },
        { label: "Railing", value: "Railing" },
        { label: "Gasping", value: "Gasping" },
        { label: "Sneezing", value: "Sneezing" },
        { label: "Difficult Breathing", value: "Difficult Breathing" },
    ];
    const symptoms_nervous_system = [
        { label: "Trembling", value: "Trembling" },
        { label: "Ataxia", value: "Ataxia" },
        { label: "Falling", value: "Falling" },
        { label: "Recumbency", value: "Recumbency" },
        { label: "Paralysis", value: "Paralysis" },
        { label: "Circling", value: "Circling" },
        { label: "Blindness", value: "Blindness" },
    ];
    const symptoms_locomotor_system = [
        { label: "Leg Weakness Posture", value: "Leg Weakness Posture" },
        { label: "Leg Trembling", value: "Leg Trembling" },
        { label: "Crooked Toes", value: "Crooked Toes" },
    ];
    const symptoms_alimentary = [
        { label: "Inappetence", value: "Inappetence" },
        { label: "Decresed Weight Gain", value: "Decresed Weight Gain" },
        { label: "Increased FCR", value: "Increased FCR" },
    ];
    const symptoms_abdominal_skin = [
        { label: "Black", value: "Black" },
    ];


    return (

        <div className="mb-6 mt-6">
            <div className="table-headline mb-6 dark:text-white">
                Create Prescription
            </div>
            <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                <div className="mt-3 grid grid-cols-1 md:grid-cols-1">
                    <div className="col-span-2 ">
                        <h4 className="font-bold text-lg border-b border-stroke dark:border-strokedark">Batch Information</h4>
                        <table className="table ">
                            <tr>
                                <td className="font-bold" width={200}>Shad Name</td>
                                <td>{batchData?.data.shed_name}</td>
                            </tr>
                            <tr>
                                <td className="font-bold" width={200}>Batch No</td>
                                <td>{batchData?.data.batch_number}</td>
                            </tr>
                            <tr>
                                <td className="font-bold" width={200}>Hen Type</td>
                                <td>{batchData?.data.hen_type}</td>
                            </tr>
                            <tr>
                                <td className="font-bold" width={200}>Hen Count</td>
                                <td>{batchData?.data.chick_number}</td>
                            </tr>
                            <tr>
                                <td className="font-bold" width={200}>Age</td>
                                <td>{batchData?.data.batch_number}</td>
                            </tr>
                            {/* <tr>
                        <td className="font-bold" width={200}>Average Weight</td>
                        <td>{batchData?.data.batch_number}</td>
                    </tr> */}
                            <tr>
                                <td className="font-bold" width={200}>Start Date</td>
                                <td>{batchData?.data.start_date}</td>
                            </tr>

                        </table>
                    </div>

                </div>
            </div>

            <SportsFrom
                //   resolver={zodResolver(prescriptionValidation)}
                //   defaultValues={batchCreateDefaultValues(singleBatchData)}
                onSubmit={handleSubmit}
                isReset={true}
                setInputValues={(reset) => setResetForm(() => reset)}
            >


                <div className="rounded-md p-4 shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px] mt-5">
                    <h4 className="font-bold text-lg border-b border-stroke dark:border-strokedark mb-3">Description of the disease</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Doctor <span className="text-danger">*</span>
                            </label>
                            <Select
                                name="doctor_id"
                                style="select select-bordered w-full max-w-full bg-white dark:bg-black select-sm md:select-md"
                            >
                                <option defaultValue="">Select Doctor</option>
                                {doctorData?.data.map((data: IUser) => (
                                    <option value={data.id} key={data.id}>
                                        {data.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="input-container">
                            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                Date <span className="text-danger">*</span>
                            </label>
                            <SportsInput
                                type="date"
                                name="date"
                                errors={error}
                                placeholder="dd/mm/yyyy"
                                style="input input-date-light input-bordered w-full max-w-full bg-white dark:bg-black dark:input-date-dark input-sm md:input-md"
                            />
                             <SportsInput
                                type="hidden"
                                name="batch_id"
                                value={batchData?.data.id}
                              />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 md:grid-cols-1 mt-3">
                        <div className="collapse collapse-arrow  bg-white border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title flex font-bold bg-gradient-to-r from-orange-700 to-orange-400 text-white"><BiCut size={25} className="border rounded-lg mr-2" /> Postmortem</div>
                            <div className="collapse-content">
                                <h6 className="border-b text-lg font-bold  flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Digestive System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Beak:</h6>
                                    <CheckboxGroup
                                        name="digestive_beak[]"
                                        options={Beak}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Esophagus:</h6>
                                    <CheckboxGroup
                                        name="digestive_esophagus[]"
                                        options={digestive_esophagus}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Crop:</h6>
                                    <CheckboxGroup
                                        name="digestive_crop[]"
                                        options={digestive_crop}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Proventriculus:</h6>
                                    <CheckboxGroup
                                        name="digestive_proventriculus[]"
                                        options={digestive_proventriculus}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Gizzard:</h6>
                                    <CheckboxGroup
                                        name="digestive_gizzard[]"
                                        options={digestive_gizzard}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Intestine:</h6>
                                    <CheckboxGroup
                                        name="digestive_intestine[]"
                                        options={digestive_intestine}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Liver:</h6>
                                    <CheckboxGroup
                                        name="digestive_liver[]"
                                        options={digestive_liver}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Gall Bladder:</h6>
                                    <CheckboxGroup
                                        name="digestive_gall_bladder[]"
                                        options={digestive_gall_bladder}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Ceca:</h6>
                                    <CheckboxGroup
                                        name="digestive_ceca[]"
                                        options={digestive_ceca}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Tonsils:</h6>
                                    <CheckboxGroup
                                        name="digestive_tonsils[]"
                                        options={digestive_tonsils}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Cloaca:</h6>
                                    <CheckboxGroup
                                        name="digestive_cloaca[]"
                                        options={digestive_cloaca}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Cavity Layer:</h6>
                                    <CheckboxGroup
                                        name="digestive_cavity_layer[]"
                                        options={digestive_cavity_layer}
                                        style="my-custom-style"
                                    />
                                </div>
                                <h6 className="border-b text-lg font-bold mt-4 mb-4  flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Respiratory System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Trachea:</h6>
                                    <CheckboxGroup
                                        name="respiratory_trachea[]"
                                        options={respiratory_trachea}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Heart:</h6>
                                    <CheckboxGroup
                                        name="respiratory_heart[]"
                                        options={respiratory_heart}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Lungs:</h6>
                                    <CheckboxGroup
                                        name="respiratory_lungs[]"
                                        options={respiratory_lungs}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Air Sacs:</h6>
                                    <CheckboxGroup
                                        name="respiratory_air_sacs[]"
                                        options={respiratory_air_sacs}
                                        style="my-custom-style"
                                    />
                                </div>
                                <h6 className="border-b text-lg font-bold mt-4 mb-4  flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Reproductive System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Ovary:</h6>
                                    <CheckboxGroup
                                        name="reproductive_ovary[]"
                                        options={reproductive_ovary}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Oviduct:</h6>
                                    <CheckboxGroup
                                        name="reproductive_oviduct[]"
                                        options={reproductive_oviduct}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Infundibulum/Magnum/Isthmus:</h6>
                                    <CheckboxGroup
                                        name="reproductive_infundibulum[]"
                                        options={reproductive_infundibulum}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Uterus/Vagina:</h6>
                                    <CheckboxGroup
                                        name="reproductive_vagina[]"
                                        options={reproductive_vagina}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Testis:</h6>
                                    <CheckboxGroup
                                        name="reproductive_testis[]"
                                        options={reproductive_testis}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Reproductive System:</h6>
                                    <CheckboxGroup
                                        name="reproductive_system[]"
                                        options={reproductive_system}
                                        style="my-custom-style"
                                    />
                                </div>
                                <h6 className="border-b text-lg font-bold mt-4 mb-4 flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Lymphatic System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Bursa of Fabricius:</h6>
                                    <CheckboxGroup
                                        name="lymphatic_bursa_of_fabricius[]"
                                        options={lymphatic_bursa_of_fabricius}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Spleen:</h6>
                                    <CheckboxGroup
                                        name="lymphatic_spleen[]"
                                        options={lymphatic_spleen}
                                        style="my-custom-style"
                                    />
                                </div>
                                <h6 className="border-b text-lg font-bold mt-4 mb-4  flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Excretory System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Kidney:</h6>
                                    <CheckboxGroup
                                        name="excretory_kidney[]"
                                        options={excretory_kidney}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Ureter:</h6>
                                    <CheckboxGroup
                                        name="excretory_ureter[]"
                                        options={excretory_ureter}
                                        style="my-custom-style"
                                    />
                                </div>

                                <h6 className="border-b text-lg font-bold mt-4 mb-4 flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Nervous System</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Sciatic / Brachial Nerve:</h6>
                                    <CheckboxGroup
                                        name="nervous_nerve[]"
                                        options={nervous_nerve}
                                        style="my-custom-style"
                                    />
                                </div>

                                <h6 className="border-b text-lg font-bold mt-4 mb-4 flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Myology</h6>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Breast & Leg Muscles:</h6>
                                    <CheckboxGroup
                                        name="myology_breast_Leg_Muscles[]"
                                        options={myology_breast_Leg_Muscles}
                                        style="my-custom-style"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base basis-auto">Egg:</h6>
                                    <CheckboxGroup
                                        name="myology_egg[]"
                                        options={myology_egg}
                                        style="my-custom-style"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-white border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold flex  bg-gradient-to-r from-green-700 to-green-400 text-white"><BiSolidExtension size={25} className="border rounded-lg mr-2" />Symptoms</div>
                            <div className="collapse-content">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Beak:</h6>
                                    <CheckboxGroup
                                        name="symptoms_beak[]"
                                        options={symptoms_beak}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Wattle:</h6>
                                    <CheckboxGroup
                                        name="symptoms_wattle[]"
                                        options={symptoms_wattle}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Comb:</h6>
                                    <CheckboxGroup
                                        name="symptoms_comb[]"
                                        options={symptoms_comb}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Eye:</h6>
                                    <CheckboxGroup
                                        name="symptoms_eye[]"
                                        options={symptoms_eye}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Ear:</h6>
                                    <CheckboxGroup
                                        name="symptoms_ear[]"
                                        options={symptoms_ear}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Head:</h6>
                                    <CheckboxGroup
                                        name="symptoms_head[]"
                                        options={symptoms_head}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Feather:</h6>
                                    <CheckboxGroup
                                        name="symptoms_feather[]"
                                        options={symptoms_feather}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Dropping:</h6>
                                    <CheckboxGroup
                                        name="symptoms_dropping[]"
                                        options={symptoms_dropping}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Respiratory System:</h6>
                                    <CheckboxGroup
                                        name="symptoms_respiratory_system[]"
                                        options={symptoms_respiratory_system}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Nervous System:</h6>
                                    <CheckboxGroup
                                        name="symptoms_nervous_system[]"
                                        options={symptoms_nervous_system}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Locomotor System:</h6>
                                    <CheckboxGroup
                                        name="symptoms_locomotor_system[]"
                                        options={symptoms_locomotor_system}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Alimentary:</h6>
                                    <CheckboxGroup
                                        name="symptoms_alimentary[]"
                                        options={symptoms_alimentary}
                                        style="my-custom-style"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
                                    <h6 className="font-bold text-base sm:text-lg basis-auto">Abdominal Skin:</h6>
                                    <CheckboxGroup
                                        name="symptoms_abdominal_skin[]"
                                        options={symptoms_abdominal_skin}
                                        style="my-custom-style"
                                    />
                                </div>


                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-white border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold flex  bg-gradient-to-r from-blue-700 to-blue-400 text-white"><BiSolidFile size={25} className="border rounded-lg mr-2" />Disease Details</div>
                            <div className="collapse-content ">
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 md:grid-cols-2 mt-3">
                                    <div className="mb-3">
                                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                            Disease Description <span className="text-danger">*</span>
                                        </label>
                                        <SportsTextArea
                                            name="disease_description"
                                            rows={4}
                                            placeholder="Write your description ..."
                                            style="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-sky-800 active:border-sky-800 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky-800"
                                        ></SportsTextArea>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                            <div className="flex flex-row place-items-center">
                                                {/* <CgAttachment /> */}
                                                <IoMdPhotos size={18} />
                                                &nbsp; Add Photos
                                            </div>
                                        </label>
                                        <div
                                            id="FileUpload"
                                            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-sky-900 bg-gray px-4 py-4 dark:border-sky-200 dark:bg-meta-4 sm:py-7.5"
                                        >
                                            <ProfilePhotoUploader
                                                name="images"
                                                multiple
                                                style="absolute inset-0 z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                                resetFiles={resetProps}
                                            />
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                    <LuUpload />
                                                </span>
                                                <p>
                                                    <span className="text-primary dark:text-sky-200">
                                                        Click to upload{" "}
                                                    </span>
                                                    or{" "}
                                                    <span className="text-primary dark:text-sky-200">
                                                        drag and drop
                                                    </span>
                                                </p>
                                                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                {/* <p>(max, 800 X 800px)</p> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            type="submit"
                            className="btn btn-sm top-6 rounded border-none bg-red-700 text-white hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
                        >
                            {submitType === "create" ? "Create Prescription" : "Edit Batch"}
                        </button>
                    </div>

                </div>
            </SportsFrom>
        </div>
    );
};

export default RequestForm;