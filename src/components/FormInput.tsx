import { useFormContext, FieldValues } from "react-hook-form"
import { cn } from "../utils/utils";
import { InputProps } from "../utils/types";


const FormInput = <T extends FieldValues>({ label, name, type, helpText, className, validation, props, groupClassName, labelClassName }: InputProps<T>): JSX.Element => {
    const { register } = useFormContext();
    const validate = typeof validation !== 'string' ? validation : undefined;

    return <div className={cn(groupClassName || 'form-group')}>
        {label && <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>}
        <input id={name} {...register(name, { validate })} type={type} className={cn(className || 'form-control')} {...props} />
    </div>
  }

  export default FormInput;