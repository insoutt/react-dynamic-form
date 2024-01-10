import { createContext } from "react";
import { Validator } from "../utils";

interface SimpleFormContextInterface {
    isLoading: boolean;
    validateOnSubmit: boolean;
    validator?: Validator;
}

export const SimpleFormContext = createContext<SimpleFormContextInterface>({
    isLoading: false,
    validateOnSubmit: false,
});