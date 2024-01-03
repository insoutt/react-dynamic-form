import { createContext } from "react";
import { Validator } from "../utils";

interface SimpleFormContextInterface {
    isLoading: boolean;
    validator?: Validator;
}

export const SimpleFormContext = createContext<SimpleFormContextInterface>({
    isLoading: false,
});