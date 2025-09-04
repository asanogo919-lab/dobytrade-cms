/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProduitUpdateFormInputValues = {
    nom?: string;
    description?: string;
    prix?: number;
};
export declare type ProduitUpdateFormValidationValues = {
    nom?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    prix?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProduitUpdateFormOverridesProps = {
    ProduitUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nom?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    prix?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProduitUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProduitUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    produit?: any;
    onSubmit?: (fields: ProduitUpdateFormInputValues) => ProduitUpdateFormInputValues;
    onSuccess?: (fields: ProduitUpdateFormInputValues) => void;
    onError?: (fields: ProduitUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProduitUpdateFormInputValues) => ProduitUpdateFormInputValues;
    onValidate?: ProduitUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProduitUpdateForm(props: ProduitUpdateFormProps): React.ReactElement;
