// types.ts

export interface PrescriptionDetail {
    id: number;
    prescription_id: number;
    digestive_system: {
      beak: string[] | null;
      esophagus: string[] | null;
      crop: string[] | null;
      proventriculus: string[] | null;
      gizzard: string[] | null;
      liver: string[] | null;
      gall_bladder: string[] | null;
      ceca: string[] | null;
      tonsils: string[] | null;
      cloaca: string[] | null;
      cavity_layer: string[] | null;
    };
    respiratory_system: {
      trachea: string[] | null;
      heart: string[] | null;
      lungs: string[] | null;
      air_sacs: string[] | null;
    };
    reproductive_system: {
      ovary: string[] | null;
      oviduct: string[] | null;
      infundibulum: string[] | null;
      vagina: string[] | null;
      testis: string[] | null;
      system: string[] | null;
    };
    lymphatic_system: {
      bursa_of_fabricius: string[] | null;
      spleen: string[] | null;
    };
    excretory_system: {
      kidney: string[] | null;
      ureter: string[] | null;
    };
    nervous_system: {
      brachial: string[] | null;
      nerve: string[] | null;
    };
    myology_system: {
      breast_Leg_Muscles: string[] | null;
      egg: string[] | null;
    };
    symptoms: {
      beak: string[] | null;
      wattle: string[] | null;
      comb: string[] | null;
      eye: string[] | null;
      ear: string[] | null;
      head: string[] | null;
      feather: string[] | null;
      dropping: string[] | null;
      respiratory_system: string[] | null;
      nervous_system: string[] | null;
      locomotor_system: string[] | null;
      alimentary: string[] | null;
      abdominal_skin: string[] | null;
    };
    disease_description: string;
    images: string[];
  }
  
  export interface BatchData {
    id: number;
    batch_id: number;
    shed_no: string;
    farmer_id: number;
    farmer_name: string;
    district_id: number;
    district_name: string;
    batch_no: string;
    doctor_id: number;
    doctor_name: string;
    doctor_sign: string | null;
    bvc_no: string | null;
    treatment_date: string;
    bird_type: string;
    bird_in_batch: number;
    avg_weight: number | null;
    age: number;
    advice: string | null;
    disease: string | null;
    followup_date: string | null;
    note: string | null;
    created_by: number;
    row_status: string;
    details: PrescriptionDetail[];
    medicine: string[];
  }
  