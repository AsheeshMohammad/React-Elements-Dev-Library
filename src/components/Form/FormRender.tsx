import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ErrorMessage } from "@hookform/error-message";
import {
  ErrorMessageComponent,
  ImportantMark,
  LabelComponent,
} from "./Form.styles";
import { Controller } from "react-hook-form";
import MultiSelectV1 from "./Select/MultiSelectv1";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DateRangePickerComponent from "./DatePicker/DateRangePicker";
import SingleSelect from "./Select/SingleSelect";
import PasswordField from "./PasswordField";
import dayjs from "dayjs";
import Monthpickerrender from "./DatePicker/Monthpickerrender";
import DatepickerWrapperV2 from "./DatePicker/DatepickerWrapperV2";
import FormRenderFileUpload from "./FileUpload/FormRenderFileUpload";
import SingleSelectNonAutoComplete from "./Select/SingleSelectNonAutoComplete";
import FormActiveSwitch from "./FormActiveSwitch";
export const renderLabel = (
  label: string,
  isRequired?: boolean,
  alignRight?: boolean
) => {
  return (
    <LabelComponent
      container
      style={{ justifyContent: alignRight ? "flex-end" : "normal" }}
    >
      <Box fontSize={"12px"} fontFamily={"Roboto-Reg"}>
        {label}
        {isRequired ? <ImportantMark> *</ImportantMark> : ""}
      </Box>
    </LabelComponent>
  );
};
export function formatDateMonthAndYear(date: any) {
  // Check if date is a string
  if (typeof date !== 'string') {
    throw new TypeError('Expected a string');
  }

  // Split the date string into month and year
  const [month, year] = date.split("/");

  // If the month has only one digit, prepend '0' to it
  const formattedMonth = month.length === 1 ? "0" + month : month;

  // Return the formatted date with day set to '01'
  return `${formattedMonth}/01/${year}`;
}


interface OptionsProps {
  label: string | boolean | number;
  value: string | number;
}

export interface FormSectionPropsItem {
  name: string;
  label: string;
  inputType:
    | "text"
    | "password"
    | "number"
    | "select"
    | "datepicker"
    | "multiselect"
    | "select-v2"
    | "register-number"
    | "decimal"
    | "alpha-numerical"
    | "yearpicker"
    | "dateRangePicker"
    | "monthpicker"
    | "multiselect"
    | "file"
    | "textarea"
    | "phoneNumber"
    | "pincode"
    | "email"
    | "toggleSwitch"
    | "";
  options?: OptionsProps[];
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
  disable?: boolean;
  onChangeFn?: (e: string | number | undefined | null | boolean) => void;
  onBlurFn?: (e: string | number | undefined | null | boolean) => void;
  maxLength?: number;
  minDate?: string;
  maxDate?: string;
  placeholder?: string;
  minRows?: string | number;
  CustomProps?: string;
  numberOfColumns?: number;
  monthSpan?:number;
  variant?:string;
  allowSpecialChars?:boolean
}

export interface FormRenderProps {
  item: FormSectionPropsItem;
  register: any;
  control: any;
  errors: any;
  getValues: any;
  clearErrors: any;
  setValue: any;
}
const RenderForm = (props: FormRenderProps) => {
  switch (props.item?.inputType) {
    case "text":
    case "email":
      return (
        <>
          <Controller
            control={props.control}
            name={props.item.name}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  // error={props.errors}
                  label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                  InputProps={{
                    style: {
                      fontFamily: "Roboto-Reg",
                      border: "none",
                    },
                  }}
                  sx={{
                    fontFamily: "Roboto-Reg",
                    "& .css-1holvmy,.css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root, .css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                      {
                        top: "-10px",
                        // fontSize:'14px !important'
                      },
                    "& .css-2rul56-MuiFormLabel-root-MuiInputLabel-root": {
                      top: "-10px",
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-12ciryo-MuiFormLabel-root-MuiInputLabel-root ": {
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input ":
                      {
                        outline: "none",
                        border: "1px solid #ced4da", // Add this line to set border to none
                      },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input:focus ":
                      {
                        outline: "none",
                        border: "none", // Set border to none when input is focused
                      },
                  }}
                  // classes={{ option: { color: "red !important" } }}
                  value={field.value || ""}
                  size="small"
                  disabled={props.item.disable}
                  onBlur={(e:any)=>{
                    props?.item?.onBlurFn && props?.item?.onBlurFn(e);
                  }}
                  inputProps={{
                    maxLength: props.item.maxLength || 100,
                    onInput: (e: any) => {
                      if (!props?.item?.allowSpecialChars) {
                        const value = e.target.value;
                        e.target.value = value.replace(/[^a-zA-Z0-9 ]/g, "");
                      } // Allow only alphanumeric and space
                      if (
                        e.target.value.length === 1 &&
                        e.target.value === " "
                      ) {
                        e.target.value = "";
                      }
                    },
                  }}
                />
                {props?.item?.helperText && (
                  <span
                    style={{
                      fontFamily: "Roboto-Reg",
                      fontSize: "11px",
                      color: "#3651d3",
                    }}
                  >
                    ({props?.item?.helperText})
                  </span>
                )}
                <ErrorMessageComponent>
                  <ErrorMessage errors={props.errors} name={props.item.name} />
                </ErrorMessageComponent>
              </>
            )}
          />
        </>
      );
    case "register-number":
      return (
        <>
          <Controller
            control={props.control}
            name={props.item.name}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  onBlur={(e:any)=>{
                    props?.item?.onBlurFn && props?.item?.onBlurFn(e);
                  }}
                  label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                  InputProps={{
                    style: {
                      fontFamily: "Roboto-Reg",
                      border: "none",
                    },
                  }}
                  onInput={(e: any) => {
                    e.target.value = e.target.value
                      .replace(/\s/g, "")
                      .replace(
                        /[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-]/g,
                        ""
                      );
                  }}
                  sx={{
                    fontFamily: "Roboto-Reg",
                    "& .css-1holvmy,.css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root, .css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                      {
                        top: "-10px",
                        // fontSize:'14px !important'
                      },
                    "& .css-2rul56-MuiFormLabel-root-MuiInputLabel-root": {
                      top: "-10px",
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-12ciryo-MuiFormLabel-root-MuiInputLabel-root ": {
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input ":
                      {
                        outline: "none",
                        border: "1px solid #ced4da", // Add this line to set border to none
                      },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input:focus ":
                      {
                        outline: "none",
                        border: "none", // Set border to none when input is focused
                      },
                  }}
                  // classes={{ option: { color: "red !important" } }}
                  value={field.value || ""}
                  disabled={props.item.disable}
                />
                {props?.item?.helperText && (
                  <span
                    style={{
                      fontFamily: "Roboto-Reg",
                      fontSize: "11px",
                      color: "#3651d3",
                    }}
                  >
                    ({props?.item?.helperText})
                  </span>
                )}
                <ErrorMessageComponent>
                  <ErrorMessage errors={props.errors} name={props.item.name} />
                </ErrorMessageComponent>
              </>
            )}
          />
        </>
      );
    case "password":
      return (
        <Box position={"relative"}>
          <PasswordField props={props} />
        </Box>
      );
    case "select":
      return (
        <>
          <SingleSelect props={props} />
        </>
      );
    case "select-v2":
      return (
        <>
          <SingleSelectNonAutoComplete props={props} />
        </>
      );
    // case "select-search-api":
    //   return (
    //     <>
    //       <SingleSelectSearchApi props={props} />
    //     </>
    //   );
    case "number":
    case "pincode":
    case "phoneNumber":
      return (
        <>
          <Controller
            control={props.control}
            name={props.item.name}
            render={({ field }) => {
              return (
                <>
                  <TextField
                    {...field}
                    size="small"
                    label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                    value={props.getValues(props.item.name) || ""}
                    defaultValue={props.getValues(props.item.name) || null}
                    onInput={(e: any) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      if(e.target.value===""){
                        e.target.value=null;
                      }
                      props?.item?.onChangeFn &&
                        props?.item?.onChangeFn(e.target.value);
                      props?.clearErrors && props?.clearErrors(props.item.name);
                    }}
                    onBlur={(e:any)=>{
                      props?.item?.onBlurFn && props?.item?.onBlurFn(e);
                    }}
                    sx={{
                      "& .css-1holvmy,.css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root,.css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                        {
                          top: "-10px",
                        },
                    }}
                    inputProps={{
                      pattern: "[0-9]*", // Only allow numbers
                      maxLength: props.item.maxLength || 20,
                    }}
                    disabled={props.item.disable}
                    // onChange={(e)=>props.item?.onChangeFn && props?.item?.onChangeFn(e)}
                  />
                  <ErrorMessageComponent>
                    <ErrorMessage
                      errors={props.errors}
                      name={props.item.name}
                    />
                  </ErrorMessageComponent>
                </>
              );
            }}
          />
        </>
      );
    case "decimal":
      return (
        <>
          <Controller
            name={props.item.name}
            control={props.control}
            disabled={props.item?.disable}
            render={({ field }) => (
              <>
                <TextField
                  type="text"
                  size="small"
                  label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                  {...field}
                  onChange={(e) =>
                    props?.clearErrors && props?.clearErrors(props.item.name)
                  }
                  sx={{
                    "& input": {
                      textAlign: "right",
                    },
                    "& .css-16hdwvj,.css-1idq7r3-MuiFormLabel-root-MuiInputLabel-root":
                      {
                        top: "-5px",
                      },
                  }}
                  onBlur={(e:any)=>{
                    props?.item?.onBlurFn && props?.item?.onBlurFn(e);
                  }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Allow numbers, a single decimal point, and negation in the input
                    e.target.value = e.target.value.replace(/[^0-9.-]/g, "");

                    // Ensure only one decimal point is present
                    const decimalPointCount =
                      e.target.value.split(".").length - 1;
                    if (decimalPointCount > 1) {
                      e.target.value = e.target.value.slice(0, -1);
                    }

                    // Ensure only two digits after the decimal point
                    const parts = e.target.value.split(".");
                    if (parts.length === 2 && parts[1].length > 2) {
                      e.target.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
                    }
                  }}
                  InputProps={{
                    inputProps: {
                      pattern: "[1-9]",
                      maxLength: 7,
                    },
                  }}
                />
                <ErrorMessageComponent>
                  <ErrorMessage errors={props.errors} name={props.item.name} />
                </ErrorMessageComponent>
              </>
            )}
          />
        </>
      );
    // case "alpha-numerical":
    //   return (
    //     <>
    //       <Controller
    //         control={props.control}
    //         name={props.item.name}
    //         render={({ field }) => (
    //           <>
    //             <TextField
    //               {...field}
    //               label={props.item.label}
    //               value={field.value || ""}
    //               onInput={(e: any) => {
    //                 // Allow only numbers and letters
    //                 e.target.value = e.target.value.replace(
    //                   /[^a-zA-Z0-9]/g,
    //                   ""
    //                 );
    //                 props.setValue(props.item.name, e.target.value);
    //               }}
    //               inputProps={{
    //                 pattern: "[a-zA-Z0-9]*", // Only allow numbers and letters
    //               }}
    //               disabled={props.item.disable}
    //             />
    //             <ErrorMessageComponent>
    //               <ErrorMessage errors={props.errors} name={props.item.name} />
    //             </ErrorMessageComponent>
    //           </>
    //         )}
    //       />
    //     </>
    //   );
    // // case "single-number":
    //   return (
    //     <>
    //       {renderLabel(props.item.label, props.item?.mandatory)}
    //       <TextField
    //         type="text"
    //         size={"small"}
    //         disabled={props.item?.disable ? true : false}
    //         onInput={(e: any) => {
    //           e.target.value = e.target.value
    //             .replace(/[^1-9]/g, "")
    //             .slice(0, 1);
    //         }}
    //         InputProps={{
    //           inputProps: {
    //             pattern: "[1-9]",
    //           },
    //         }}
    //         {...props.register(props.item.name, { valueAsNumber: true })}
    //       />
    //       <ErrorMessageComponent>
    //         <ErrorMessage errors={props.errors} name={props.item.name} />
    //       </ErrorMessageComponent>
    //     </>
    //   );

    // case "number-double":
    //   return (
    //     <>
    //       <TextField
    //         type="text"
    //         size={"small"}
    //         label={props.item.label}
    //         disabled={props.item?.disable ? true : false}
    //         parse={(value: string) => {
    //           const parsedValue = parseFloat(value);
    //           return isNaN(parsedValue) ? null : parsedValue;
    //         }}
    //         onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
    //           // Allow numbers, a single decimal point, and negation in the input
    //           e.target.value = e.target.value.replace(/[^0-9.-]/g, "");
    //           e.target.value = e.target.value.replace("-", "");
    //           // Ensure only one decimal point is present
    //           if(e.target.value.includes('-')){
    //             // e.target.value = e.target.value.slice(0, );
    //           }
    //           const decimalPointCount = e.target.value.split(".").length - 1;
    //           if (decimalPointCount > 1) {
    //             e.target.value = e.target.value.slice(0, -1);
    //           }

    //           // Ensure only two digits after the decimal point
    //           const parts = e.target.value.split(".");
    //           if (parts.length === 2 && parts[1].length > 3) {
    //             e.target.value = `${parts[0]}.${parts[1].slice(0, 3)}`;
    //           }
    //         }}
    //         {...props.register(props.item.name, { valueAsNumber: true })}
    //       />
    //       <ErrorMessageComponent>
    //         <ErrorMessage errors={props.errors} name={props.item.name} />
    //       </ErrorMessageComponent>
    //     </>
    //   );
    // case "checkbox":
    //   return (
    //     <>
    //       {renderLabel(props.item.label, props.item?.label ? true : false)}
    //       <Controller
    //         control={props.control}
    //         name={props.item.name}
    //         render={({ field }) => {
    //           return (
    //             <Checkbox
    //               {...field}
    //               checked={field.value}
    //               sx={{ width: "24px", height: "24px" }}
    //             />
    //           );
    //         }}
    //       />
    //     </>
    //   );
    // // case "checkbox-group":
    //   return (
    //     <>
    //       {renderLabel(props.item.label, props.item?.mandatory)}
    //       <FormControl component="fieldset">
    //         <FormGroup row>
    //           {props.item.settingsField.map((settings, i) => {
    //             return (
    //               <Controller
    //                 key={i}
    //                 name={settings.name}
    //                 control={props.control}
    //                 render={({ field }) => {
    //                   return (
    //                     <FormControlLabel
    //                       control={
    //                         <Checkbox {...field} checked={field.value} />
    //                       }
    //                       sx={{
    //                         ".MuiCheckbox-root": {
    //                           padding: "6px 6px 6px 8px",
    //                         },
    //                       }}
    //                       // label={settings.label}
    //                       label={
    //                         <Typography variant="subtitle2" fontSize={"13px"}>
    //                           {settings.label}
    //                         </Typography>
    //                       }
    //                       labelPlacement="end"
    //                     />
    //                   );
    //                 }}
    //               />
    //             );
    //           })}
    //         </FormGroup>
    //       </FormControl>

    //       <ErrorMessageComponent>
    //         <ErrorMessage
    //           errors={props.errors}
    //           name={"PostInvoicegenerationEmail"}
    //         />
    //       </ErrorMessageComponent>
    //     </>
    //   );

    // case "radio":
    //   return (
    //     <>
    //       {renderLabel(props.item.label, props.item?.mandatory)}

    //       <Controller
    //         control={props.control}
    //         name={props.item.name}
    //         render={({ field }) => {
    //           return (
    //             <RadioGroup {...field}>
    //               <Grid container>
    //                 {props.item.options.map((option) => (
    //                   <Box key={option.value}>
    //                     <Grid container alignItems={"center"}>
    //                       <Radio value={option.value} />
    //                       <Box>{option.label}</Box>
    //                     </Grid>
    //                   </Box>
    //                 ))}
    //               </Grid>
    //             </RadioGroup>
    //           );
    //         }}
    //       />

    //       <ErrorMessage
    //         errors={props.errors}
    //         name={props.item.name}
    //         render={({ message }) => (
    //           <ErrorMessageComponent>{message}</ErrorMessageComponent>
    //         )}
    //       />
    //     </>
    //   );
    // case "datepicker":
    //   return (
    //     <>
    //       <DatepickerWrapper props={props} />
    //     </>
    //   );
    case "datepicker":
      return (
        <>
          <DatepickerWrapperV2 props={props} />
        </>
      );
    case "yearpicker":
      return (
        <>
          <Controller
            control={props.control}
            name={props.item.name}
            render={({ field }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      "& .css-1holvmy, .css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                        {
                          top: "-10px",
                        },
                    }}
                    label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                    views={["year"]}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date:any) => field.onChange(date)}
                    // minDate={}
                    slots={{
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      textField: (textFieldProps: any) => (
                        <TextField
                          {...textFieldProps}
                          fullWidth
                          disabled={props.item.disable || false}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
                <ErrorMessageComponent>
                  <ErrorMessage errors={props.errors} name={props.item.name} />
                </ErrorMessageComponent>
              </>
            )}
          />
        </>
      );
    case "dateRangePicker":
      return (
        <>
          <DateRangePickerComponent props={props} />
        </>
      );
    case "monthpicker":
      return (
        <>
          <Monthpickerrender props={props} />
        </>
      );
    case "multiselect":
      return (
        <>
          <MultiSelectV1 props={props} />
        </>
      );
    case "file":
      return <FormRenderFileUpload props={props} />;

    case "textarea":
      return (
        <>
          <Controller
            control={props.control}
            name={props.item.name}
            render={({ field }) => (
              <>
                <TextField
                  multiline
                  size="small"
                  InputProps={{
                    style: {
                      fontFamily: "Roboto-Reg",
                      border: "none",
                    },
                  }}
                  sx={{
                    fontFamily: "Roboto-Reg",
                    "& .css-1holvmy,.css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root, .css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                      {
                        top: "-10px",
                      },
                    "& input": {
                      fontSize: "11px",
                    },
                    "& .css-2rul56-MuiFormLabel-root-MuiInputLabel-root": {
                      top: "-10px",
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-12ciryo-MuiFormLabel-root-MuiInputLabel-root ": {
                      fontFamily: "Roboto-Reg",
                    },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input ":
                      {
                        outline: "none",
                        border: "1px solid #ced4da", // Add this line to set border to none
                      },
                    "& .css-1gq5vhi-MuiInputBase-root-MuiOutlinedInput-root input:focus ":
                      {
                        outline: "none",
                        border: "none", // Set border to none when input is focused
                      },
                    "& .css-1y03twt-MuiInputBase-root-MuiOutlinedInput-root": {
                      padding: "5px 5px", // Set border to none when input is focused
                      fontSize: "11px",
                    },
                  }}
                  minRows={props.item.minRows || 1}
                  // maxRows={2}
                  placeholder={props.item.placeholder || "Type Something..."}
                  {...field}
                  label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                  value={field.value || ""}
                  disabled={props.item.disable}
                  inputProps={{
                    onInput: (e: any) => {
                      if (!props?.item?.allowSpecialChars) {
                        const value = e.target.value;
                        e.target.value = value.replace(/[^a-zA-Z0-9 ]/g, "");
                      } // Allow only alphanumeric and space
                      if (
                        e.target.value.length === 1 &&
                        e.target.value === " "
                      ) {
                        e.target.value = "";
                      }
                    },
                  }}
                />
                <ErrorMessageComponent>
                  <ErrorMessage errors={props.errors} name={props.item.name} />
                </ErrorMessageComponent>
              </>
            )}
          />
        </>
      );
    // case "textarea-normal":
    //   return (
    //     <>
    //       <Controller
    //         control={props.control}
    //         name={props.item.name}
    //         render={({ field }) => (
    //           <>
    //             <input style={{ width: "100%" }} type="textarea" />
    //             <ErrorMessageComponent>
    //               <ErrorMessage errors={props.errors} name={props.item.name} />
    //             </ErrorMessageComponent>
    //           </>
    //         )}
    //       />
    //     </>
    //   );

    // case "onlyAlphabets":
    //   return (
    //     <>
    //       <Box>{renderLabel(props.item.label, props.item?.mandatory)}</Box>
    //       <TextField
    //         type="text"
    //         disabled={props.item?.disable ? true : false}
    //         {...props.register(props.item.name)}
    //         onInput={(e: any) => {
    //           e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    //         }}
    //         size={"small"}
    //       />
    //       <ErrorMessageComponent>
    //         <ErrorMessage errors={props.errors} name={props.item.name} />
    //       </ErrorMessageComponent>
    //     </>
    //   );
    case "toggleSwitch":
      return (
        <>
          <FormActiveSwitch props={props} />
        </>
      );
    // case "percentage-number":
    //   return (
    //     <>
    //       {renderLabel(props.item.label, props.item?.mandatory)}
    //       <TextField
    //         type="text"
    //         size={"small"}
    //         disabled={props.item?.disable ? true : false}
    //         parse={(value: string) => {
    //           const parsedValue = parseFloat(value);
    //           return isNaN(parsedValue) ? null : parsedValue;
    //         }}
    //         onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
    //           // Allow numbers, a single decimal point, and negation in the input
    //           e.target.value = e.target.value.replace(/[^0-9.-]/g, "");

    //           // Ensure only one decimal point is present
    //           const decimalPointCount = e.target.value.split(".").length - 1;
    //           if (decimalPointCount > 1) {
    //             e.target.value = e.target.value.slice(0, -1);
    //           }
    //           const numericValue = parseFloat(e.target.value);
    //           if (numericValue < 0 || numericValue > 100) {
    //             e.target.value = e.target.value.slice(0, -1);
    //           }
    //         }}
    //         {...props.register(props.item.name, { valueAsNumber: true })}
    //       />
    //       <ErrorMessageComponent>
    //         <ErrorMessage errors={props.errors} name={props.item.name} />
    //       </ErrorMessageComponent>
    //     </>
    //   );
    default :
     return <></>
  }
};
export default RenderForm;
