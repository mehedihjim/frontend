import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  mode?: any;
  resolver?: any;
  isReset?: boolean;
  defaultValues?: Record<string, any>;
};
type TSportsFromProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  setInputValues?: (reset: any, methods: ReturnType<typeof useForm>) => void;
} & TFormConfig;

const SportsFrom = ({
  children,
  onSubmit,
  mode,
  resolver,
  defaultValues,
  isReset = true,
  setInputValues,
}: TSportsFromProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  if (mode) {
    formConfig.mode = mode;
  }
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    isReset && reset();
  };

  // Expose the reset method to the parent component
  if (setInputValues) {
    setInputValues(reset, methods); // ✅ pass both
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default SportsFrom;
