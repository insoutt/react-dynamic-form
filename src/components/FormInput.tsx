import { useFormContext, FieldValues } from "react-hook-form"
import { cn, parseValidation } from "../utils/utils";
import { InputProps } from "../utils/types";
import { useContext } from "react";
import { SimpleFormContext } from "../contexts/simple-form-context";


const FormInput = <T extends FieldValues>({ label, name, type, helpText, className, validation, props, groupClassName, labelClassName }: InputProps<T>): JSX.Element => {
    const { register } = useFormContext();
    const {isLoading, validator} = useContext(SimpleFormContext);
    const validate = parseValidation(validation, validator);

    return <div className={cn(groupClassName || 'form-group')}>
        {label && <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>}
        <input id={name} 
            {...register(name, { validate })} 
            type={type} 
            disabled={isLoading}
            className={cn(className || 'form-control')} {...props} 
        />
    </div>
  }

  export default FormInput;