"use client";

const Forbidden = () => {
  const handleGoBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <section className="dark:bg-gray-900 flex h-screen place-items-center bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <div className="ms-1 h-auto max-w-full text-center">
                <h1
                className="text-9xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 mb-4"
                >
                    403
                </h1>

              {/* <Image src={notFound} alt="not found" height={325} width={325} /> */}
            </div>
            {/* <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1> */}
            <p className="mb-4 text-3xl font-bold tracking-tight text-orange-500 dark:text-white md:text-4xl">
                Forbidden
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg font-light">
                You do not have permission to view this page. Please contact your administrator. 
            </p>
            <button
              onClick={handleGoBack}
              className="btn rounded-xl border-0 bg-sky-800 text-white hover:bg-sky-900"
            >
              {" "}
              Go Back
            </button>
            {/* <a
              href="#"
              className="bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              Back to Homepage
            </a> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Forbidden;
