const Error = ({ message }: { message?: string }) => {
  return (
    <div>
      <div className="text-center text-xl text-red dark:text-red">
        {message || " An error occurred. Please try again later."}
      </div>
    </div>
  );
};

export default Error;
