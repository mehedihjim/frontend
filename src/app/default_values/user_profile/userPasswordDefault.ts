// Default value object for Zod validation
const userPasswordDefaultValues = () => {
  return {
    current_password: "",
    password: "",
    confirm_password: "",
  };
};

export default userPasswordDefaultValues;
