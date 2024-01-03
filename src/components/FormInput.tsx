import { useFormContext, FieldValues } from "react-hook-form"
import { cn, parseValidation } from "../utils/utils";
import { InputProps } from "../utils/types";
import { useContext } from "react";
import { SimpleFormContext } from "../contexts/simple-form-context";


const FormInput = <T extends FieldValues>({ label, name, type, className, validation, props, groupClassName, labelClassName }: InputProps<T>): JSX.Element => {
    const { register, formState: { errors } } = useFormContext();
    const {isLoading, validator} = useContext(SimpleFormContext);
    const validate = parseValidation(validation, validator);
    const classNameAux = className || 'form-control';

    return <div className={cn(groupClassName || 'form-group')}>
        {label && <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>}
        <input id={name} 
            type={type} 
            disabled={isLoading}
            className={cn(classNameAux, errors[name] && `${classNameAux}-error`)} 
            {...register(name, { validate })} 
            {...props} 
        />
    </div>
  }

  export default FormInput;