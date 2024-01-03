import { useForm, SubmitHandler, FormProvider, FieldValues } from "react-hook-form"
import FormField from "./FormField";
import { FormProps } from '../utils/types';
import { cn } from '../utils/utils';

const Form = <T extends FieldValues>({fields, validator, classNames, clearButton, submitButton, onSubmit, onClear}: FormProps<T>) => {
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
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)}>
                {fields.map(field => (
                    <FormField<T> key={field.name} {...field} validator={validator}/>
                ))}
                <div className="form-action-buttons">
                    {!isFormClear() && <>{clearButton ? clearButton(clear)  : <button className={cn(classNames?.clearButton)} onClick={() => clear()}>
                        Clear
                    </button>}</>}
                    {submitButton ? submitButton(methods.handleSubmit(formSubmit))  : <button className={cn(classNames?.submitButton)} type="submit">
                        Submit
                    </button>}
                </div>
            </form>
        </FormProvider>
    )
}
 
export default Form;