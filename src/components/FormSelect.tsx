import { useFormContext, FieldValues } from "react-hook-form"
import FormField from "./FormField";
import { cn } from '../utils/utils';
import { SelectProps } from "../utils/types";


const FormSelect = <T extends FieldValues>({ label, name, options, validation, props, fieldProps }: SelectProps<T>): JSX.Element => {
    const { register, watch } = useFormContext();
    const selectedValue = watch(name);

    const renderInputs = () => {
        const option = options.find(item => item.value === selectedValue);

        if(!option?.fields) return;

        return <>
            {option.fields.map(field => (
                <FormField<T> 
                    key={field.name} 
                    {...field} 
                    classNames={fieldProps?.classNames}
                />
            ))}
        </>
    }

    return <>
        <div className={cn(fieldProps?.classNames?.group || 'form-group')}>
            <label className={fieldProps?.classNames?.label || 'form-label'} htmlFor={name}>{label}</label>
            <select id={name} {...register(name, {required: {
                value: true,
                message: 'Obligatorio'
            }, validate: validation})} className={cn(fieldProps?.classNames?.select || fieldProps?.classNames?.field || 'form-control')} {...props}>
                <option value="">N/A</option>
                {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
            </select>
        </div>

        {renderInputs()}
    </>
}


export default FormSelect;