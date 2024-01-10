import { useFormContext, FieldValues } from "react-hook-form"
import { cn, getFieldClassname, parseValidation } from "../utils/utils";
import { InputProps } from "../utils/types";
import { useContext, useState } from "react";
import { SimpleFormContext } from "../contexts/simple-form-context";


const FormInput = <T extends FieldValues>({ label, name, type, className, validation, props, groupClassName, labelClassName, children }: InputProps<T>): JSX.Element => {
    const { register, formState } = useFormContext();
    const {isLoading, validator, validateOnSubmit} = useContext(SimpleFormContext);
    const [isValidating, setValidating] = useState(false);
   
    const validate = async (value: string | number) => {
        setValidating(true);
        const validationResponse = await parseValidation(value, formState, validateOnSubmit, validation, validator);
        setValidating(false);
        return validationResponse;
    };

    return <div className={cn(groupClassName || 'form-group')}>
        {label && <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>}
        <input id={name} 
            type={type} 
            disabled={isLoading || formState.isSubmitting}
            className={getFieldClassname(name, {
                    formState, 
                    isValidating, 
                    validateOnSubmit, 
                    className
                })
            } 
            {...register(name, { validate })} 
            {...props} 
        />
        {children}
    </div>
  }

  export default FormInput;