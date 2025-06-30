// Default value object for Zod validation
const batchCreateDefaultValues = (data: any) => {
    return {
      name: data?.name || "",
      shed_id: data?.shed_id || "",
      batch_number: data?.batch_number || "",
      hen_type: data?.hen_type || "",
      chick_number: data?.chick_number || "",
      chick_price: data?.chick_price || "",
      start_date: data?.start_date || "",
    };
  };
  
  export default batchCreateDefaultValues;
  