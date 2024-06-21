import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react/types-6-0";
import RenderForm, {
  FormRenderProps,
  FormSectionPropsItem,
} from "./FormRender";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import FormRenderWrapper, { FormRenderWrapperProps } from "./FormRenderWrapper";

export default {
  title: "Components/Form",
  component: RenderForm,
} as Meta;

interface formFunctionsProps {
  handleSubmit: any;
  setValue: any;
  watch: any;
  register: any;
  errors: any;
  getValues: any;
  reset: any;
  clearErrors: any;
}
const FormComponent: React.FC<FormRenderWrapperProps> = (props) => {
  const [formFunctions, setFormFunctions] = useState<formFunctionsProps>();
  console.log(formFunctions, "formFunctionsformFunctions");
  const number = formFunctions?.watch("password");
  const name = formFunctions?.watch("userName");
  console.log(name, "numbernumber");
  const submitForm: any = (values:any) => {
    console.log(values, "smsms");
  };
  return (
    <>
      <FormRenderWrapper
        {...props}
        name={"myName"}
        setFormFunctions={setFormFunctions}
      />
      <button onClick={() => formFunctions?.handleSubmit(submitForm)()}>
        Submit
      </button>
      <button onClick={() => formFunctions?.setValue("password", 9292992)}>
        Change
      </button>
    </>
  );
};

const Template: StoryFn<FormRenderWrapperProps> = (args: any) => (
  <FormComponent {...args} />
);

export const RenderFormComponent = Template.bind({});
RenderFormComponent.args = {
  formArray: [
    {
      name: "userName",
      label: "User Name",
      inputType: "text",
      required: true,
      errorMessage: "Please enter",
    },
    {
      name: "password",
      label: "Password",
      inputType: "number",
      required: true,
      errorMessage: "Please enter",
    },
    {
      name: "djj",
      label: "Password",
      inputType: "datepicker",
      required: true,
      errorMessage: "Please select message",
    },
  ],
};
