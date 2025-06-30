import React from "react";
import Image from "next/image";

const LogoSegment = () => {
  return (
    <>
      <div className="mb-2 flex justify-center">
        <div>
          <Image
            className="mt-4"
            src={"/images/logo/poulex-logo.svg"}
            width={350}
            height={75}
            alt="profile"
          />
        </div>
      </div>
      {/* <div className="mb mt-4 flex justify-center">
        <div className="mx-4 text-center text-4xl font-semibold text-sky-800 max-[786px]:text-2xl max-[524px]:text-lg md:mx-0">
          Poulex 2.0
        </div>
      </div> */}
    </>
  );
};

export default LogoSegment;
