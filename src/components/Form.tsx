import { useForm, SubmitHandler, FormProvider, FieldValues } from "react-hook-form"
import FormField from "./FormField";
import { FormProps } from '../utils/types';
import { cn } from '../utils/utils';

const Form = <T extends FieldValues>({fields, classNames, resetButton, submitButton, onSubmit}: FormProps<T>) => {
    const methods = useForm<T>();
    
    const formSubmit: SubmitHandler<T> = (values: T) => {
        console.log(`Submitted`);
        console.log(values);
        onSubmit?.(values);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)}>
                {fields.map(field => (
                    <FormField<T> key={field.name} {...field}/>
                ))}
                <div className="buttons-group">
                    {resetButton ? resetButton(methods.reset)  : <button className={cn(classNames.clearButton)} onClick={() => methods.reset()}>
                        Clear
                    </button>}
                    {submitButton ? submitButton(methods.handleSubmit(formSubmit))  : <button className={cn(classNames.submitButton)} type="submit">
                        Submit
                    </button>}
                </div>
            </form>
        </FormProvider>
    )
}
 
export default Form;