import { useFormContext, FieldValues } from "react-hook-form"
import { cn, getFieldClassname, getValidation } from "../utils/utils";
import { InputProps } from "../utils/types";
import { useContext, useState } from "react";
import { SimpleFormContext } from "../contexts/simple-form-context";


const FormInput = <T extends FieldValues>({ label, name, type, className, validation, props, groupClassName, labelClassName, children }: InputProps<T>): JSX.Element => {
    const { register, formState } = useFormContext();
    const {isLoading, validator} = useContext(SimpleFormContext);
    const [isValidating, setValidating] = useState(false);
   
    const validate = (value?: string | number) => {
        if(typeof value === 'undefined') return;

        const fn = getValidation(validation, validator);
        
        if(typeof fn === 'undefined') {
            return true;
        }

        setValidating(true);
        return Promise.resolve(fn(value))
        .finally(() => setValidating(false));
    };

    return <div className={cn(groupClassName || 'form-group')}>
        {label && <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>}
        <input id={name} 
            type={type} 
            disabled={isLoading || formState.isSubmitting}
            className={getFieldClassname(name, formState, isValidating, className)} 
            {...register(name, { validate })} 
            {...props} 
        />
        {children}
    </div>
  }

  export default FormInput;