import { createContext } from "react";
import { FormClassNames, Validator } from "../utils";

interface SimpleFormContextInterface {
    isLoading: boolean;
    validateOnSubmit: boolean;
    validator?: Validator;
    classNames?: FormClassNames;
}

export const SimpleFormContext = createContext<SimpleFormContextInterface>({
    isLoading: false,
    validateOnSubmit: false,
});