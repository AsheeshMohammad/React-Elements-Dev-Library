## How to use the Library
This Library is a reusable component gives intialvalues and validation schema for useForm and you can render Form Field Components without adding any text fields.

```js
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RenderForm, useFormValidatingContext } from "tp-react-elements-dev";
import { FormSectionPropsItem } from "tp-react-elements-dev/dist/components/Form/FormRender";
const App = () => {
  const formArray:FormSectionPropsItem[]= [
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
      name: "date",
      label: "Password",
      inputType: "datepicker",
      required: true,
      errorMessage: "Please select message",
      minDate:'30/06/2024',
      maxDate:'22/07/2024'
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
      required:true,
      inputType: "multiselect",
      options:[]
    },
    {
      name: "daterangepicker",
      label: "Date range Picker",
      required:true,
      inputType: "dateRangePicker",
      monthSpan:1
    },
    {
      name: "status",
      label: "sdf",
      inputType: "toggleSwitch",
      monthSpan:1
    },
    {
      name: "yearpicker",
      label: "Year",
      required:true,
      inputType: "yearpicker",
      monthSpan:1
    },
    {
      name: "monthpicker",
      label: "Month Picker",
      required:true,
      inputType: "monthpicker",
      monthSpan:1
    },
    {
      name: "file",
      label: "File Upload",
      required:true,
      inputType: "file",
      monthSpan:1
    },
  ];
  const { initialValues, validationSchema } = useFormValidatingContext(
    formArray
  );
  const form=useForm({
    defaultValues:initialValues,
    resolver:yupResolver(validationSchema)
  })
  return (
    <RenderForm formArray={formArray} name={"form1"} form={form} numberOfColumns={2} />
  )
}

export default App
```