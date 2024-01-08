import { useForm, SubmitHandler, FormProvider, FieldValues } from "react-hook-form"
import FormField from "./FormField";
import { FormProps } from '../utils/types';
import { cn } from '../utils/utils';
import { SimpleFormContext } from "../contexts/simple-form-context";

const Form = <T extends FieldValues>({fields, validator, className, classNames, isLoading, onSubmit, onClear, submitText, children}: FormProps<T>) => {
    const methods = useForm<T>();
    
    const formValues = methods.watch();

    const isFormClear = () => {
        return Object.values(formValues).every(value => !value);
    };

    const formSubmit: SubmitHandler<T> = (values: T) => {
        console.log(`Submitted`);
        console.log(values);
        onSubmit?.(values);
    };

    const clear = () => {
        methods.reset();
        onClear?.();
    }

    return (
        <SimpleFormContext.Provider value={{
            isLoading: !!isLoading,
            validator,
        }}>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)} className={className}>
                {fields.map(field => (
                    <FormField<T> key={field.name} {...field}/>
                ))}
                
                {typeof children === 'function' 
                    ? children(methods.handleSubmit(formSubmit), clear)
                    : typeof children !=='undefined' ? children : <div className="form-action-buttons">
                            <button className={cn(classNames?.submitButton || 'btn btn-primary')} type="submit">
                                {submitText || 'Submit'}
                            </button>
                            {!isLoading && !isFormClear() && <>
                                <button className={cn(classNames?.clearButton)} onClick={clear}>
                                    Clear
                                </button>
                            </>}
                        </div>}
            </form>
        </FormProvider>
        </SimpleFormContext.Provider>
    )
}
 
export default Form;