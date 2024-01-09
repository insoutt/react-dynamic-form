import { useFormContext, FieldValues } from "react-hook-form"
import { cn, getFieldClassname, getValidation } from '../utils/utils';
import { SelectProps } from "../utils/types";
import { useContext, useState } from "react";
import { SimpleFormContext } from "../contexts/simple-form-context";

const FormSelect = <T extends FieldValues>({ label, name, options, validation, props, labelClassName, groupClassName, className, renderFields, children }: SelectProps<T>): JSX.Element => {
    const { register, watch, formState } = useFormContext();
    const {isLoading, validator} = useContext(SimpleFormContext);
    const [isValidating, setValidating] = useState(false);
    const selectedValue = watch(name);
    const validate = (value: string | number) => {
        if(typeof value === 'undefined') return;

        const fn = getValidation(validation, validator);
        
        if(typeof fn === 'undefined') {
            return true;
        }

        setValidating(true);
        return Promise.resolve(fn(value))
        .finally(() => setValidating(false));
    };

    const renderInputs = () => {
        const option = options.find(item => item.value === selectedValue);

        if(!option?.fields || typeof renderFields !== 'function') return;

        return option.fields.map(field => renderFields(field));
    }

    return <>
        <div className={cn(groupClassName || 'form-group')}>
            <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>
            <select id={name} 
                disabled={isLoading || formState.isSubmitting}
                className={getFieldClassname(name, formState, isValidating, className)} 
                {...register(name, {required: {
                    value: true,
                    message: 'Obligatorio'
                }, validate})} 
                {...props}
            >
                <option value="">N/A</option>
                {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
            </select>
            {children}
        </div>
        
        {renderInputs()}
    </>
}


export default FormSelect;