import React, { useEffect } from "react";
import RenderForm, { FormSectionPropsItem } from "./FormRender";
import {
  FieldValues,
  Form,
  UseFormReturn,
  useForm,
  useFormContext,
  useFormState,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormComponent, Formitem } from "./Form.styles";
import { Box, useFormControl } from "@mui/material";
import customTheme from "../../theme";
import { ThemeProvider } from "@emotion/react";

export interface FormRenderWrapperProps {
  formArray: FormSectionPropsItem[];
  name: string;
  numberOfColumns?: number;
  form: UseFormReturn<FieldValues, any, undefined>;
  variant?: "standard" | "outlined" | "";
}
const FormRenderWrapper = ({
  formArray,
  name,
  numberOfColumns = 3,
  form,
  variant=''
}: FormRenderWrapperProps) => {
  // const formContext=useFormControl({
  // })
  // useEffect(() => {
  //   // form.reset(initialValues, { resolver: yupResolver(validationSchema) });
  // }, [formArray, validationSchema, initialValues]);

  return (
    <ThemeProvider theme={customTheme}>
      <FormComponent container margin={"auto"}>
        {formArray.map((item, i: number) => {
          return (
            <Formitem
              key={i}
              container
              sx={item.CustomProps}
              noOfColumn={item.numberOfColumns || numberOfColumns}
            >
              <RenderForm
                item={item}
                register={form.register}
                control={form.control}
                errors={form.formState.errors}
                getValues={form.getValues}
                clearErrors={form.clearErrors}
                setValue={form.setValue}
                variant={variant}
              />
            </Formitem>
          );
        })}
      </FormComponent>
    </ThemeProvider>
  );
};

export default FormRenderWrapper;
