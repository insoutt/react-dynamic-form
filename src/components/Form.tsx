import { useForm, SubmitHandler, FormProvider, FieldValues } from "react-hook-form"
import FormField from "./FormField";
import { FormProps } from '../utils/types';
import { cn } from '../utils/utils';
import { SimpleFormContext } from "../contexts/simple-form-context";

const Form = <T extends FieldValues>({fields, validator, beforeSubmit, afterSubmit, className, classNames, isLoading, onSubmit, onClear, submitText, clearText, loadingText, hideClearButton, validateOnSubmit, children}: FormProps<T>) => {
    const methods = useForm<T>();
    
    const formValues = methods.watch();
    const {isSubmitting} = methods.formState;
    const isFormBusy = isLoading || isSubmitting;


    const isFormClear = () => {
        return Object.values(formValues).every(value => !value);
    };

    const formSubmit: SubmitHandler<T> = async (values: T) => {
        console.log(`Submitted`);
        console.log(values);

        if(typeof beforeSubmit === 'function' && !beforeSubmit(values)) {
            const before = beforeSubmit(values);
            if(!before) {
                return;
            }
            values = before
        }

        if(validateOnSubmit) {
            // Call validation when validateOnSubmit is true
            const isValid = await methods.trigger();
            if (!isValid) {
                return;
            }
        }

        onSubmit?.(values);
        afterSubmit?.(values);
    };

    const clear = () => {
        methods.reset();
        onClear?.();
    }

    return (
        <SimpleFormContext.Provider value={{
            isLoading: !!isFormBusy,
            validateOnSubmit: !!validateOnSubmit,
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
                            <button className={cn(classNames?.submitButton || 'btn btn-primary')} type="submit" disabled={isFormBusy}>
                                {isFormBusy ? loadingText : submitText || 'Submit'}
                            </button>
                            {!hideClearButton && !isFormBusy && !isFormClear() && <>
                                <button className={cn(classNames?.clearButton)} onClick={clear}>
                                    {clearText || 'Clear'}
                                </button>
                            </>}
                        </div>}
            </form>
        </FormProvider>
        </SimpleFormContext.Provider>
    )
}
 
export default Form;