import { PiHashBold } from "react-icons/pi";

interface respiratory_systemProps {
    respiratory_system:{
            trachea?: string[];
            lungs?: string[];
            heart?: string[];
            air_sacs?: string[];
        }  
};

const RespiratorySystem : React.FC<respiratory_systemProps> = ({ respiratory_system }) => {
    return (
        <>
            <h6 className="border-b text-lg font-bold mt-2 mb-2 flex"> <PiHashBold size={25} className=" mr-2 text-red-600" />Respiratory System</h6>                 
            {respiratory_system.trachea && (
                <>
                    <strong>Trachea:</strong> {respiratory_system.trachea.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {respiratory_system.lungs && (
                <>
                    <strong>Lungs:</strong> {respiratory_system.lungs.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {respiratory_system.heart && (
                <> 
                    <strong>Heart:</strong> {respiratory_system.heart.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            {respiratory_system.air_sacs && (
                <>
                    <strong>Air Sacs:</strong> {respiratory_system.air_sacs.map((item, index) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}   
        </>
    );
};

export default RespiratorySystem;