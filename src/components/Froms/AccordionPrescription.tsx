// components/Accordion.tsx
import React, { useState } from 'react';

// Define types for your data
type PrescriptionDetail = {
  id: number;
  disease_description: string;
  images: string[];
  symptoms?: {
    head?: string[];
    dropping?: string[];
  };
};

type BatchData = {
  id: number;
  batch_no: string;
  shed_no: string;
  doctor_name: string;
  treatment_date: string;
  bird_type: string;
  bird_in_batch: number;
  age: number;
  details: PrescriptionDetail[];
};

type AccordionProps = {
  data: BatchData; // Expecting a single BatchData object
};

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className="border-b">
      <button
        onClick={toggleAccordion}
        className="w-full text-left p-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        Batch: {data.batch_no} - Shed: {data.shed_no}
      </button>
      {open && (
        <div className="p-4 bg-gray-100">
          <div className="space-y-2">
            <div><strong>Doctor:</strong> {data.doctor_name}</div>
            <div><strong>Treatment Date:</strong> {data.treatment_date}</div>
            <div><strong>Bird Type:</strong> {data.bird_type}</div>
            <div><strong>Bird in Batch:</strong> {data.bird_in_batch}</div>
            <div><strong>Age:</strong> {data.age} days</div>
            {data.details.map((detail) => (
              <div key={detail.id} className="mt-4">
                <h4 className="font-semibold">Disease Description:</h4>
                <p>{detail.disease_description}</p>
                <div className="mt-2">
                  <strong>Symptoms:</strong>
                  <ul className="list-disc pl-5">
                    {detail.symptoms?.head?.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                    {detail.symptoms?.dropping?.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <strong>Images:</strong>
                  <div className="space-x-2">
                    {detail.images.map((img, idx) => (
                      <img key={idx} src={img} alt="Prescription Image" className="w-32 h-32 object-cover rounded" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
