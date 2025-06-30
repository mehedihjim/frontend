import React from 'react';
import { PiHashBold } from 'react-icons/pi';
interface disgestive_systemProps {
    disgestive_system: {
        beak?: string[];
        esophagus?: string[];
        crop?: string[];
        proventriculus?: string[];
        gizzard?: string[];
        liver?: string[];
        gall_bladder?: string[];
        ceca?: string[];
        tonsils?: string[];
        cloaca?: string[];
        cavity_layer?: string[];  
    },
     
}

const DisgestiveSystem : React.FC<disgestive_systemProps> = ({ disgestive_system }) => {
    return (
        <>
            <h6 className="border-b text-lg font-bold mt-2 mb-2 flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Digestive System</h6>                 
            {disgestive_system.beak && (
                <>
                    <strong>Beak:</strong> {disgestive_system.beak.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.esophagus && (
                <>
                    <strong>Esophagus:</strong> {disgestive_system.esophagus.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.crop && (
                <>
                    <strong>Crop:</strong> {disgestive_system.crop.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.proventriculus && (
                <>
                    <strong>Proventriculus:</strong> {disgestive_system.proventriculus.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.gizzard && (
                <>
                    <strong>Gizzard:</strong> {disgestive_system.gizzard.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.liver && (
                <>
                    <strong>Liver:</strong> {disgestive_system.liver.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.gall_bladder && (
                <>
                    <strong>Gall Bladder:</strong> {disgestive_system.gall_bladder.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.ceca && (
                <>
                    <strong>Ceca:</strong> {disgestive_system.ceca.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.tonsils && (
                <>
                    <strong>Tonsils:</strong> {disgestive_system.tonsils.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.cloaca && (
                <>
                    <strong>Cloaca:</strong> {disgestive_system.cloaca.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {disgestive_system.cavity_layer && (
                <>
                    <strong>Cavity Layer:</strong> {disgestive_system.cavity_layer.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
        </>
)};

export default DisgestiveSystem;
