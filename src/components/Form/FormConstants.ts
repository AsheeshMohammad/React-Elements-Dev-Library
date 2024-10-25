import { FormSectionPropsItem } from "./FormRender";
import * as Yup from "yup";
export interface InitialValues {
  [key: string]: string | number | null | boolean;
}
export interface ValidationShape {
  [key: string]: Yup.Schema<any>;
}

const useFormValidatingContext = (formArray: FormSectionPropsItem[]) => {
  const initialValues: InitialValues = {};
  const validationShape: ValidationShape = {};
  console.log(formArray,'formArrayformArray');
  const renderCustomError=(field:FormSectionPropsItem)=>{
    if (field.customErrorMessage) {
      validationShape[field.name] = validationShape[field.name].test(
        "custom-check",
        field.customErrorMessage, // Use the actual custom message
        (value: any) =>  field.customErrorMessage &&  field.customErrorMessage // No additional validation logic required
      );
    }
  }
  formArray.forEach((field: FormSectionPropsItem) => {
    switch (field.inputType) {
      case "text":
        initialValues[field.name] = "";
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.string()
            .typeError(field.errorMessage)
            .required(field.errorMessage);
          renderCustomError(field)
        }

        renderCustomError(field)
        break;
      case "password":
        initialValues[field.name] = "";
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.string()
            .typeError(field.errorMessage)
            .required(field.errorMessage)
            renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "email":
        initialValues[field.name] = "";
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.string()
            .typeError(`Please enter ${field.label}`)
            .required(field.errorMessage)
            .test("valid-email", `Please enter valid Email`, (value) => {
              return /\@.*\..+/.test(value);
            })
            renderCustomError(field)
        } else {
          validationShape[field.name] = Yup.string()
            .typeError(`Please enter ${field.label}`)
            .test("valid-email", `Please enter valid Email`, (value: any) => {
              // Custom validation to check for at least one period after '@'
              return !value || /\@.*\..+/.test(value);
            })
            renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "file":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.mixed()
            .test("fileOrString", field?.errorMessage, (value) => {
              return (
                value instanceof File ||
                (typeof value === "string" && value.trim() !== "")
              );
            })
            .required(field.errorMessage)
            renderCustomError(field)
        }
        renderCustomError(field)
        break;

      case "number":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.number()
            .nullable()
            .typeError(field.errorMessage)
            .required(field.errorMessage);
            renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "pincode":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.number()
            .nullable()
            .typeError(`Please enter PinCode`)
            .required(field.errorMessage)
            .test(
              "is-six-digits",
              `Please enter a 6-digit PinCode`,
              (value) => {
                if (value && field.variant === "PinCode") {
                  const stringValue = value.toString();
                  return stringValue.length === 6;
                }
                return false;
              }
            );
            renderCustomError(field)
        }
        renderCustomError(field)
        break;
      // case "phoneNumber":
      //   initialValues[field.name] = null;
      //   if (field.required && field.errorMessage) {
      //     validationShape[field.name] = Yup.number()
      //       .nullable()
      //       .typeError(`Please enter Mobile Number`)
      //       .required(field.errorMessage)
      //       .test(
      //         "is-two-digits",
      //         `Please enter a 10-digit Mobile Number`,
      //         (value) => {
      //           if (value) {
      //             const stringValue = value.toString();
      //             return stringValue.length === 2;
      //           }
      //           return false;
      //         }
      //       );
      //       renderCustomError(field)
      //   } else {
      //     validationShape[field.name] = Yup.number()
      //       .nullable()
      //       // .typeError(`Please enter Mobile Number`)
      //       .test(
      //         "is-two-digits",
      //         `Please enter a 10-digit Mobile Number`,
      //         (value: any) => {
      //           return !value || value?.toString().length === 2;
      //         }
      //       );
      //       renderCustomError(field)
      //   }
      //   break;
        
        case "phoneNumber":
          initialValues[field.name] = null;
          if (field.required) {
            validationShape[field.name] = Yup.number()
              .nullable()
              .typeError(`Please enter Mobile Number`)
              .required(field.errorMessage)
              .test(
                "is-two-digits",
                `Please enter a 10-digit Mobile Number`,
                (value) => {
                  if (value) {
                    const stringValue = value.toString();
                    return stringValue.length === 10;
                  }
                  return false;
                }
              )
              renderCustomError(field)
          }
          else{
            validationShape[field.name] = Yup.string()
            .nullable()
            .typeError(``)
            .test(
              "is-two-digits",
              `Please enter a 10-digit Mobile Number`,
              (value) => {
                if (value) {
                  // Custom validation to check for at least one period after '@'
                  const stringValue = value.toString();
                  return stringValue.length === 10;
                }
                return true; // Skip validation if no value is present
              }
            )
            renderCustomError(field)
          }
          break;
        
      case "select":
        initialValues[field.name] = "";
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.string()
            .typeError(`Select ${field.label}`)
            .required(field.errorMessage);
            renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "multiselect":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select atleast one ${field.label}`)
              .required(field.errorMessage);
              renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "datepicker":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
              .required(field.errorMessage);
              renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "yearpicker":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
              .required(field.errorMessage);
              renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "monthpicker":
        initialValues[field.name] = null;
        if (field.required && field.errorMessage) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
              .required(field.errorMessage);
              renderCustomError(field)
        }
        renderCustomError(field)
        break;
      case "toggleSwitch":
        initialValues[field.name] = true;
        renderCustomError(field)
        break;
      case "dateRangePicker":
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const year = today.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - (field.monthSpan ?? 3));

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
        if (field.required && field.errorMessage) {
          validationShape[field.name] = validationShape[field.name] =
            Yup.string()
              .typeError(`Select ${field.label}`)
              .required(field.errorMessage);
              renderCustomError(field)
        }
        renderCustomError(field)
        break;
      default:
        initialValues[field.name] = null; // default value if inputType is not recognized
        if (field.required && field.errorMessage) {
          validationShape[field.name] = Yup.mixed().required(
            field.errorMessage
          );
          renderCustomError(field)
        }
        renderCustomError(field)
        break;
    }
  });
  const validationSchema = Yup.object().shape(validationShape);
  return { validationSchema, initialValues };
};

export default useFormValidatingContext;
