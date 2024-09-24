import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryFn } from "@storybook/react/types-6-0";
import RenderForm, {
  FormRenderProps,
  FormSectionPropsItem,
} from "./FormRender";
import {
  Form,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
  useFormContext,
} from "react-hook-form";
import FormRenderWrapper, { FormRenderWrapperProps } from "./FormRenderWrapper";
import useFormValidatingContext from "./FormConstants";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const [password, setPassword] = useState<
    string | number | boolean | null | undefined
  >("");
  const formArray2: FormSectionPropsItem[] = [
    {
      name: "userName",
      label: "User Name",
      inputType: "text",
      required: true,
      errorMessage: "Please enter",
      customErrorMessage: password === "render" ? "Hii" : null,
    },
    {
      name: "number",
      label: "Number",
      inputType: "select",
      options:[],
      required: true,
      errorMessage: "Please enter Number",
      InputProps: {
        autoComplete: "new-password",
      },
      customErrorMessage: Number(password)>120 ? "Number is exceeding" : null,
    },
    {
      name: "date",
      label: "Password",
      inputType: "datepicker",
      required: true,
      errorMessage: "Please select message",
      minDate: "30/06/2024",
      maxDate: "22/07/2024",
    },
    {
      name: "password1",
      label: "Password New",
      inputType: "password",
      required: true,
      errorMessage: "Please select message",
    },
    {
      name: "daterange",
      label: "Password",
      required: true,
      inputType: "multiselect",
      options: [],
    },
    {
      name: "daterangepicker",
      label: "Date range Picker",
      required: true,
      inputType: "dateRangePicker",
      monthSpan: 1,
    },
    {
      name: "status",
      label: "",
      inputType: "toggleSwitch",
      monthSpan: 1,
    },
    {
      name: "yearpicker",
      label: "Year",
      required: true,
      inputType: "yearpicker",
      monthSpan: 1,
    },
    {
      name: "monthpicker",
      label: "Month Picker",
      required: true,
      inputType: "monthpicker",
      monthSpan: 1,
    },
    {
      name: "file",
      label: "File Upload",
      required: true,
      inputType: "file",
      monthSpan: 1,
    },
    {
      name: "filse",
      label: "PASSSWORD",
      required: true,
      inputType: "password",
      monthSpan: 1,
      errorMessage: "Please enter pass",
    },
    {
      name: "filse",
      label: "PASSSWORD",
      inputType: "phoneNumber",
      monthSpan: 1,
    },
  ];
  const { initialValues, validationSchema } = useFormValidatingContext(
    // props.formArray
    formArray2
  );
  var form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const data = form.watch("filse");
  console.log(data, "password");
  const pass=form.watch('number');
  useEffect(() => {
    setPassword(pass)
  }, [form.getValues()]);
  console.log(form.formState.errors,'kjshgshj');
  
  const submitForm: any = (values: any) => {
    console.log(values, "smsms");
  };
  return (
    <>
      <FormRenderWrapper formArray={formArray2} name={"myName"} form={form} />
      <button onClick={() => form?.handleSubmit(submitForm)()}>Submit</button>
      <button onClick={() => form?.setValue("password", "Asheesh")}>
        Change
      </button>
      <button onClick={() => form?.setValue("status", false)}>
        set status
      </button>
      <button onClick={() => form?.setValue("status", true)}>
        Active set status
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
      customErrorMessage: "Hii",
    },
    {
      name: "password",
      label: "Password",
      inputType: "number",
      required: true,
      errorMessage: "Please enter",
      InputProps: {
        autoComplete: "new-password",
      },
    },
    {
      name: "date",
      label: "Password",
      inputType: "datepicker",
      required: true,
      errorMessage: "Please select message",
      minDate: "30/06/2024",
      maxDate: "22/07/2024",
    },
    {
      name: "password1",
      label: "number New",
      inputType: "phoneNumber",
      // required: true,
      // errorMessage: "Please select message",
    },
    {
      name: "daterange",
      label: "Passwordwww",
      required: true,
      inputType: "multiselect",
      options: [
        {
          label:'Hii',
          value:'lkjh'
        }
      ],
    },
    {
      name: "daterangepicker",
      label: "Date range Picker",
      required: true,
      inputType: "dateRangePicker",
      monthSpan: 1,
    },
    {
      name: "status",
      label: "",
      inputType: "toggleSwitch",
      monthSpan: 1,
    },
    {
      name: "yearpicker",
      label: "Year",
      required: true,
      inputType: "yearpicker",
      monthSpan: 1,
    },
    {
      name: "monthpicker",
      label: "Month Picker",
      required: true,
      inputType: "monthpicker",
      monthSpan: 1,
    },
    {
      name: "file",
      label: "File Upload",
      required: true,
      inputType: "file",
      monthSpan: 1,
    },
    {
      name: "filse",
      label: "PASSSWORD",
      required: true,
      inputType: "password",
      monthSpan: 1,
      errorMessage: "Please enter pass",
    },
  ],
  numberOfColumns: 3,
};
