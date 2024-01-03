import { FieldValues, Path } from "react-hook-form";

// Form
export interface FormProps<T extends FieldValues> {
    fields: FieldProps<T>[];
    classNames: FormClassNames;
    validator?: Record<string, FieldValidator> 
    submitButton?: (submit: () => void) => React.ReactNode
    clearButton?: (reset: () => void) => React.ReactNode
    onSubmit?: (values: T) => void
    onClear?: () => void
}

interface FormClassNames{
    select?: string
    input?: string
    field?: string
    group?: string
    label?: string
    submitButton?: string
    clearButton?: string
}

type FormBaseFieldProps = {
    classNames?: FormClassNames;
    validator?: Record<string, FieldValidator> 
};
// End Form

// FormField
export type FieldValidator = (value: string | number) => boolean | string | Promise<boolean | string>;

interface FieldBaseAttributes<T extends FieldValues> {
    label?: string;
    helpText?: string;
    name: Path<T>;
    type: InputType | 'select';
    className?: string;
    groupClassName?: string;
    labelClassName?: string;
    validation?: string | FieldValidator
}

interface FieldBaseProps {
    placeholder?: string
    defaultValue?: string
    disabled?: boolean
}

type Fields<T extends FieldValues> = InputProps<T> | SelectProps<T>;

export type FieldProps<T extends FieldValues> = FormBaseFieldProps & Fields<T>;
// End FormField

// FormInput
export interface InputProps<T extends FieldValues> extends FieldBaseAttributes<T> {
    type: InputType;
    props?: FieldBaseProps
}

export type InputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'checkbox' | 'radio' | 'file' | 'hidden' | 'range' | 'color' | 'search' | 'tel' | 'url';
//End FormInput

// FormSelect
export type SelectProps<T extends FieldValues> = {
    type: 'select';
    options: SelectOption<T>[];
    props?: FieldBaseProps;
    renderFields?: (field: FieldProps<T>) => React.ReactNode
} & FieldBaseAttributes<T>;

type SelectOption<T extends FieldValues> = {
    value: string | number;
    text: string;
    fields?: FieldProps<T>[];
}
// End FormSelect
