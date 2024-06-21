import React, { useEffect } from "react";
import RenderForm, { FormSectionPropsItem } from "./FormRender";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormComponent, Formitem } from "./Form.styles";

export interface FormRenderWrapperProps{
  formArray: FormSectionPropsItem[];
  name: string;
  setFormFunctions: any;
  numberOfColumns?:number
}
const FormRenderWrapper = ({
  formArray,
  name,
  setFormFunctions,
  numberOfColumns=3
}: FormRenderWrapperProps) => {
  const initialValues: any = {};
  const validationShape: any = {};
  formArray.forEach((field: FormSectionPropsItem) => {
    switch (field.inputType) {
      case "text":
        initialValues[field.name] = "";
        if (field.required) {
          validationShape[field.name] = Yup.string()
            .typeError(`Select ${field.label}`)
            .required(field.errorMessage);
        }
        break;
      case "number":
        initialValues[field.name] = null;
        if (field.required) {
          validationShape[field.name] = Yup.number()
            .nullable()
            .typeError(`Enters ${field.label}`)
            .required(field.errorMessage);
        }
        break;
      case "password":
        initialValues[field.name] = '';
        if (field.required) {
          validationShape[field.name] = Yup.number()
            .nullable()
            .typeError(`Enters ${field.label}`)
            .required(field.errorMessage);
        }
        break;
      case "select":
        initialValues[field.name] = "";
        if (field.required) {
          validationShape[field.name] = Yup.string()
            .typeError(`Select ${field.label}`)
            .required(field.errorMessage);
        }
        break;
      case "multiselect":
        initialValues[field.name] = null;
        if (field.required) {
          validationShape[field.name] = validationShape[field.name] = Yup.string()
          .typeError(`Select atleast one ${field.label}`)
          .required(field.errorMessage);
        }
        break;
      default:
        initialValues[field.name] = null; // default value if inputType is not recognized
        if (field.required) {
          validationShape[field.name] = Yup.mixed().required(
            field.errorMessage
          );
        }
        break;
    }
  });
  const validationSchema = Yup.object().shape(validationShape);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    setFormFunctions({
      handleSubmit,
      setValue,
      clearErrors,
      watch,
      control,
      getValues,
      reset,
    });
  }, [
    handleSubmit,
    setFormFunctions,
    setValue,
    watch,
    register,
    control,
    errors,
    getValues,
    reset,
    clearErrors,
  ]);

  return <FormComponent container  margin={"auto"}>{
    formArray.map((item,i:number) => {
    return (
      <Formitem  key={i} container sx={item.CustomProps} noOfColumn={item.numberOfColumns || numberOfColumns}>
        <RenderForm
          item={item}
          register={register}
          control={control}
          errors={errors}
          getValues={getValues}
          clearErrors={clearErrors}
          setValue={setValue}
        />
      </Formitem>
    );
  })}
  </FormComponent>
};

export default FormRenderWrapper;
