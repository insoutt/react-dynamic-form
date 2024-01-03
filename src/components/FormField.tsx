import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { FieldValues, useFormContext } from "react-hook-form"
import { useEffect } from "react";
import { cn } from "../utils/utils";
import { FieldProps } from "../utils/types";

const FormField = <T extends FieldValues>(props: FieldProps<T>): JSX.Element => {

    const { unregister, formState: {errors} } = useFormContext();

    useEffect(() => {
        return () => {
            console.log('UnMount', props.label);
            unregister(props.label);
        }
    }, []);

    const renderField = () => {
        switch (props.type) {
            case 'select':
                return (
                    <FormSelect<T> 
                        {...props}
                        options={props.options}
                        validation={props.validation}
                        className={cn(props.classNames?.input || props.classNames?.field)} 
                        groupClassName={cn(props.classNames?.group)}
                        labelClassName={cn(props.classNames?.label)}
                        renderFields={(fieldProps) => <FormField<T> key={fieldProps.name} {...fieldProps}/>}
                    />
                );
            default:
                return (
                    <FormInput<T> 
                        {...props} 
                        validation={props.validation}
                        className={cn(props.classNames?.input || props.classNames?.field)} 
                        groupClassName={cn(props.classNames?.group)}
                        labelClassName={cn(props.classNames?.label)}
                    />
                );
        }
    }

    const getErrorMessage = (): string | null => {
        const message = errors[props.name]?.message;
        return (typeof message === 'string') ? message : null;
    }

    return (<>
        {renderField()}
        {getErrorMessage() !== null && <p role="alert">{getErrorMessage()}</p>}
        {props.helpText && <span className="help-text">{props.helpText}</span>}
    </>)
};
  
export default FormField;