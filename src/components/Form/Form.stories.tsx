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
import axios from "axios";

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
      name: "Editor", 
      label: "Editor",
      inputType: "multifile",
      label1:'Yes',
      fileType:"excel",
      required:true,
      errorMessage:'please select atleast one record'
    },
    {
      name: "Editor", 
      label: "Editor",
      inputType: "dateRangePicker",
      label1:'Yes'
    },
    {
      name: "EditorRich", 
      label: "Editor",
      inputType: "rich-text-editor",
      label1:'Yes'
    },
    {
      name: "TimePickers", 
      label: "Editor",
      inputType: "timepicker",
      label1:'Yes',
      required:true,
      errorMessage:'Please enter',
      minTime:'01:00:00.0000000',
      maxTime:'05:00:00.0000000'
    },
    {
      name: "TimePicker", 
      label: "Editor",
      inputType: "radio-group",
      label1:'Yes',
      required:true,
      settings:[
        {
          name:'red',
          label:'red'
        },
        {
          name:'nn',
          label:'yes'
        },
      ]
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
  const data = form.watch("Editor");
  const data2 = form.watch("EditorFile");
  const TimePickers = form.watch("TimePickers");
  const TimePicker = form.watch("TimePicker");
  console.log(data, "password",data2,TimePickers,TimePicker);
  const pass = form.watch("number");
  useEffect(() => {
    setPassword(pass);
  }, [form.getValues()]);
  const submitForm: any = (values: any) => {
    console.log(values, "smsms");
    form.reset(initialValues);
  };
  return (
    <>
      <FormRenderWrapper formArray={formArray2} name={"myName"} form={form} variant="standard"/>
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
      <button onClick={() => form?.reset(initialValues)}>
        Reset
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
      inputType: "textarea",
      required: true,
      errorMessage: "Please enter",
      customErrorMessage: "Hii",
      minRows: 5,
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
          label: "Hii",
          value: "lkjh",
        },
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
