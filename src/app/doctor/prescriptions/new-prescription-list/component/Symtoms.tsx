import React from "react";

interface SymptomsProps {
  symptoms: {
    beak?: string[];
    head?: string[];
    comb?: string[];
    leg?: string[];
    wattle?: string[];
    eye?: string[];
    ear?: string[];
    feather?: string[];
    dropping?: string[];
    respiratory_system?: string[];
    locomotor_system?: string[];
    nervous_system?: string[];
    alimentary?: string[];
    abdominal_skin?: string[];
  };
}

const SymptomsComponent: React.FC<SymptomsProps> = ({ symptoms }) => {
  return (
    <div>
      <strong className="border-b">Symptoms:</strong> <br />
      {symptoms?.beak && (
        <>
          <strong>Beak:</strong>{" "}
          {symptoms.beak.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.head && (
        <>
          <strong>Head:</strong>{" "}
          {symptoms.head.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.comb && (
        <>
          <strong>Comb:</strong>{" "}
          {symptoms.comb.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.leg && (
        <>
          <strong>Leg:</strong>{" "}
          {symptoms.leg.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.wattle && (
        <>
          <strong>Wattle:</strong>{" "}
          {symptoms.wattle.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.eye && (
        <>
          <strong>Eye:</strong>{" "}
          {symptoms.eye.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.ear && (
        <>
          <strong>Ear:</strong>{" "}
          {symptoms.ear.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.feather && (
        <>
          <strong>Feather:</strong>{" "}
          {symptoms.feather.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.dropping && (
        <>
          <strong>Dropping:</strong>{" "}
          {symptoms.dropping.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.respiratory_system && (
        <>
          <strong>Respiratory System:</strong>{" "}
          {symptoms.respiratory_system.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.locomotor_system && (
        <>
          <strong>Locomotor System:</strong>{" "}
          {symptoms.locomotor_system.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.nervous_system && (
        <>
          <strong>Nervous System:</strong>{" "}
          {symptoms.nervous_system.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.alimentary && (
        <>
          <strong>Alimentary:</strong>{" "}
          {symptoms.alimentary.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
      {symptoms?.abdominal_skin && (
        <>
          <strong>Abdominal Skin:</strong>{" "}
          {symptoms.abdominal_skin.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}{" "}
          <br />
        </>
      )}
    </div>
  );
};

export default SymptomsComponent;
