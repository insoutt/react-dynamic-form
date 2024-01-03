import { FieldValidator, Validator } from "./types";


export function cn(...args: Array<string | undefined>): string {
    if(typeof args === 'undefined') return '';
    return args.filter(Boolean).join(' ').trim();
}

export function parseValidation (validation?: string | FieldValidator, validator?: Validator): FieldValidator | undefined {
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