import { PiHashBold } from "react-icons/pi";

const Postmortem = ({postmortem}:any) => {
  return (<>
    <h6 className="border-b text-lg font-bold  flex mt-2 mb-2"> <PiHashBold size={25} className=" mr-2 text-red-600" />Reproductive System</h6>                 
                {postmortem.reproductive_system.ovary && (
                    <>
                        <strong>Ovary:</strong> {postmortem.reproductive_system.ovary.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
                )}
                {postmortem.reproductive_system.vagina && (
                    <>
                        <strong>Vagina:</strong> {postmortem.reproductive_system.vagina.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
                )}
                {postmortem.reproductive_system.infundibulum && (
                    <> 
                        <strong>Infundibulum:</strong> {postmortem.reproductive_system.infundibulum.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
                )}
                {postmortem.reproductive_system.testis && (
                    <>
                        <strong>Testis:</strong> {postmortem.reproductive_system.testis.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
                )}
                   
                {postmortem.reproductive_system.system && (
                    <>
                        <strong>System:</strong> {postmortem.reproductive_system.system.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
                )}
            <h6 className="border-b text-lg font-bold  flex mt-2 mb-2"> <PiHashBold size={25} className=" mr-2 text-red-600" />Lymphatic System</h6> 
            {postmortem.lymphatic_system.bursa_of_fabricius && (
                    <>
                        <strong>Bursa of Fabricius:</strong> {postmortem.lymphatic_system.bursa_of_fabricius.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
            )}
            {postmortem.lymphatic_system.spleen && (
                <>
                    <strong>Spleen:</strong> {postmortem.lymphatic_system.spleen.map((item:any, index:number) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            
            <h6 className="border-b text-lg font-bold  flex mt-2 mb-2"> <PiHashBold size={25} className=" mr-2 text-red-600" />Excretory System</h6> 
            {postmortem.excretory_system.kidney && (
                    <>
                        <strong>Kidney:</strong> {postmortem.excretory_system.kidney.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
            )}
            {postmortem.excretory_system.ureter && (
                <>
                    <strong>Ureter:</strong> {postmortem.excretory_system.ureter.map((item:any, index:number) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            <h6 className="border-b text-lg font-bold  flex mt-2 mb-2"> <PiHashBold size={25} className=" mr-2 text-red-600" />Nervous System</h6> 
            {postmortem.nervous_system.brachial && (
                    <>
                        <strong>Brachial:</strong> {postmortem.nervous_system.brachial.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
            )}
            {postmortem.nervous_system.nerve && (
                <>
                    <strong>Nerve:</strong> {postmortem.nervous_system.nerve.map((item:any, index:number) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}
            <h6 className="border-b text-lg font-bold  flex mt-2 mb-2"> <PiHashBold size={25} className=" mr-2 text-red-600" />Myology System</h6> 
            {postmortem.myology_system.breast_Leg_Muscles && (
                    <>
                        <strong>Breast Leg Muscles:</strong> {postmortem.myology_system.breast_Leg_Muscles.map((item:any, index:number) => (
                            <span key={index}>{item}, </span>
                        ))} <br />
                    </>
            )}
            {postmortem.myology_system.egg && (
                <>
                    <strong>Egg:</strong> {postmortem.myology_system.egg.map((item:any, index:number) => (
                        <span key={index}>{item}, </span>
                    ))} <br />
                </>
            )}

  </>);
};

export default Postmortem;