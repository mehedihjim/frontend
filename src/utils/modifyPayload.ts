export const formDataPayload = (values: any) => {
  // First Draft
  // const obj = { ...values };
  // // const file = obj["file"];
  // delete obj["file"];
  // const formData = new FormData();
  // Object.keys(obj).map((key) => {
  //   formData.append(key, obj[key]);
  // });
  // // formData.append("file", file as Blob);
  // return formData;

  const obj = { ...values };
  const formData = new FormData();

  const appendFormData = (data: any, rootKey: string | null = null) => {
    if (data instanceof File || data instanceof Blob) {
      formData.append(rootKey!, data);
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        appendFormData(item, `${rootKey}[${index}]`);
      });
    } else if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        if (rootKey) {
          appendFormData(data[key], `${rootKey}.${key}`);
        } else {
          appendFormData(data[key], key);
        }
      });
    } else {
      formData.append(rootKey!, data);
    }
  };

  appendFormData(obj);

  return formData;
};
