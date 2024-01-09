import { FieldValues, FormState, Path } from "react-hook-form";
import { FieldValidator, Validator } from "./types";


export function cn(...args: Array<string | undefined>): string {
    if(typeof args === 'undefined') return '';
    return args.filter(Boolean).join(' ').trim();
}

export function getValidation(validation?: string | FieldValidator, validator?: Validator): FieldValidator | undefined {
    if(typeof validation === 'function') {
        
        return validation;
    }
    if(typeof validator !== 'object' || validator === null) {
        return;
    }
    if(typeof validation === 'string') {
        if(typeof validator[validation] === 'undefined') {
            throw new Error(`Validation '${validation}' does not exists in form validator object`)
        }

        return validator[validation];
    }
}

export function getFieldClassname<T extends FieldValues>(name: Path<T>, formState: FormState<T>, isValidating: boolean, className?: string) {
    const classNameAux = className || 'form-control';
    return cn(
        classNameAux, 
        formState.errors[name] && `${classNameAux}-error`,
        isValidating ? `${classNameAux}-validating` : '',
        formState.isValid ? `${classNameAux}-valid` : '',
    );
}