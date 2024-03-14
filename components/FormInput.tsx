import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";

interface FormInputProps {
  formLabel: string;
  isRequired: boolean;
  inputTsx: JSX.Element;
}

const FormInput: React.FC<FormInputProps> = ({
  formLabel,
  isRequired,
  inputTsx,
}) => {
  return (
    <>
      <FormItem>
        <FormLabel>
          {formLabel}
          {isRequired && <span className="ml-1 text-red-700">*</span>}
        </FormLabel>
        <FormControl>{inputTsx}</FormControl>
        <FormMessage className="px-3 py-2 text-gray-50 bg-red-500 rounded-md" />
      </FormItem>
    </>
  );
};

export default FormInput;
