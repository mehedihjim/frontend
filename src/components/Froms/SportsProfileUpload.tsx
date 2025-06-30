import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";

type TProfilePhotoProps = {
  name: string;
  label?: string;
  style?: string;
  errors?: { [key: string]: string };
  multiple?: boolean;
  resetFiles?: boolean;
};

export default function ProfilePhotoUploader({
  name,
  style = "",
  errors,
  multiple = false,
  resetFiles = false,
}: TProfilePhotoProps) {
  const { control } = useFormContext();
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const newFiles = Array.from(e.target.files || []);

    const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newFileURLs]);
    setFiles((prev) => [...prev, ...newFiles]);
    onChange(multiple ? [...files, ...newFiles] : newFiles[0]);
  };

  const handleRemoveFile = (
    index: number,
    onChange: (...event: any[]) => void,
  ) => {
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  // Reset the file input state when resetFiles changes
  useEffect(() => {
    if (resetFiles) {
      setFilePreviews([]);
      setFiles([]);
    }
  }, [resetFiles]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        return (
          <>
            <input
              {...field}
              type="file"
              value={value?.fileName}
              className={error ? `${style} border-red` : style}
              onChange={(e) => handleFileChange(e, onChange)}
              // onChange={(e) => {
              //   const files = (e?.target as HTMLInputElement).files;
              //   onChange(multiple ? files : files?.[0]);
              // }}
              multiple={multiple}
              accept="image/*"
            />
            {(errors?.[name] || error) && (
              <div>
                <span className="text-red">
                  {error?.message ||
                    JSON.parse(JSON.stringify(errors?.[name] as string))}
                </span>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-4">
              {filePreviews.map((preview, index) => (
                <div key={index} className="relative h-24 w-24">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-16 w-24 rounded object-cover"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 bg-red-500 absolute right-1 top-1 z-10 rounded-full bg-white p-1"
                    onClick={() => handleRemoveFile(index, onChange)}
                  >
                    <FaTrash color="red" />
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      }}
    />
  );
}
