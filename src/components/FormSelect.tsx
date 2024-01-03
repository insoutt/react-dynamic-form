import { useFormContext, FieldValues } from "react-hook-form"
import { cn } from '../utils/utils';
import { SelectProps } from "../utils/types";


const FormSelect = <T extends FieldValues>({ label, name, options, validation, props, labelClassName, groupClassName, className, renderFields }: SelectProps<T>): JSX.Element => {
    const { register, watch } = useFormContext();
    const selectedValue = watch(name);

    const renderInputs = () => {
        const option = options.find(item => item.value === selectedValue);

        if(!option?.fields || typeof renderFields !== 'function') return;

        return <>
            {option.fields.map(field => renderFields(field))}
        </>
    }

    return <>
        <div className={cn(groupClassName || 'form-group')}>
            <label className={labelClassName || 'form-label'} htmlFor={name}>{label}</label>
            <select id={name} {...register(name, {required: {
                value: true,
                message: 'Obligatorio'
            }, validate: validation})} className={cn(className || 'form-control')} {...props}>
                <option value="">N/A</option>
                {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
            </select>
        </div>

        {renderInputs()}
    </>
}


export default FormSelect;