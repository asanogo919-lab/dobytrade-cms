/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProduit } from "../graphql/queries";
import { updateProduit } from "../graphql/mutations";
const client = generateClient();
export default function ProduitUpdateForm(props) {
  const {
    id: idProp,
    produit: produitModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    nom: "",
    description: "",
    prix: "",
  };
  const [nom, setNom] = React.useState(initialValues.nom);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [prix, setPrix] = React.useState(initialValues.prix);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = produitRecord
      ? { ...initialValues, ...produitRecord }
      : initialValues;
    setNom(cleanValues.nom);
    setDescription(cleanValues.description);
    setPrix(cleanValues.prix);
    setErrors({});
  };
  const [produitRecord, setProduitRecord] = React.useState(produitModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProduit.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProduit
        : produitModelProp;
      setProduitRecord(record);
    };
    queryData();
  }, [idProp, produitModelProp]);
  React.useEffect(resetStateValues, [produitRecord]);
  const validations = {
    nom: [{ type: "Required" }],
    description: [{ type: "Required" }],
    prix: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          nom,
          description,
          prix,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateProduit.replaceAll("__typename", ""),
            variables: {
              input: {
                id: produitRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProduitUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nom"
        isRequired={true}
        isReadOnly={false}
        value={nom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nom: value,
              description,
              prix,
            };
            const result = onChange(modelFields);
            value = result?.nom ?? value;
          }
          if (errors.nom?.hasError) {
            runValidationTasks("nom", value);
          }
          setNom(value);
        }}
        onBlur={() => runValidationTasks("nom", nom)}
        errorMessage={errors.nom?.errorMessage}
        hasError={errors.nom?.hasError}
        {...getOverrideProps(overrides, "nom")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nom,
              description: value,
              prix,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Prix"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={prix}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              nom,
              description,
              prix: value,
            };
            const result = onChange(modelFields);
            value = result?.prix ?? value;
          }
          if (errors.prix?.hasError) {
            runValidationTasks("prix", value);
          }
          setPrix(value);
        }}
        onBlur={() => runValidationTasks("prix", prix)}
        errorMessage={errors.prix?.errorMessage}
        hasError={errors.prix?.hasError}
        {...getOverrideProps(overrides, "prix")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || produitModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || produitModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
