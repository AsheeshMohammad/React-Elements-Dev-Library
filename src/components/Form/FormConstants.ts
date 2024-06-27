import { FormSectionPropsItem } from "./FormRender";
import * as Yup from "yup";
export interface InitialValues {
  [key: string]: string | number | null;
}
export interface ValidationShape {
  [key: string]: Yup.Schema<any>;
}

const useFormValidatingContext = (formArray: FormSectionPropsItem[]) => {
  const initialValues: InitialValues = {};
  const validationShape: ValidationShape = {};
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
        initialValues[field.name] = "";
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
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select atleast one ${field.label}`)
              .required(field.errorMessage);
        }
        break;
      case "datepicker":
        initialValues[field.name] = null;
        if (field.required) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
              .required(field.errorMessage);
        }
        break;
      case "dateRangePicker":
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const year = today.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        const dayBeforeThreeMonths = String(threeMonthsAgo.getDate()).padStart(
          2,
          "0"
        );
        const monthBeforeThreeMonths = String(
          threeMonthsAgo.getMonth() + 1
        ).padStart(2, "0"); // January is 0!
        const yearBeforeThreeMonths = threeMonthsAgo.getFullYear();

        const formattedDateForThreeMonths = `${dayBeforeThreeMonths}/${monthBeforeThreeMonths}/${yearBeforeThreeMonths}`;

        initialValues["FromDate"] = formattedDateForThreeMonths;
        initialValues["ToDate"] = formattedDate;
        if (field.required) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
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
  return { validationSchema, initialValues };
};

export default useFormValidatingContext;
