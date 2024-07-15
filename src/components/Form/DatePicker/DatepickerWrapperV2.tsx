import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorMessageComponent } from "../Form.styles";
import dayjs from "dayjs";

const DatepickerWrapperV2 = ({ props }: any) => {
  const inputTextRef = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (!open) {
      inputTextRef.current?.blur();
    }
    setOpen(!open);
  };
  return (
    <Controller
      control={props.control}
      name={props.item.name}
      render={({ field }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={`${props.item.label}${props.item.required ? ' *' : ''}`}
              value={
                typeof field.value === "string"
                  ? dayjs(field.value, "DD/MM/YYYY")
                  : (field.value === null || field.value === undefined) && null
              }
              open={open}
              className="read-only"
              format="DD/MM/YYYY"
              disabled={props.item.disable || false}
              onChange={(date:any) => {
                field.onChange(dayjs(date).format("DD/MM/YYYY"));
                props?.item?.onChangeFn && props?.item?.onChangeFn();
              }}
              onOpen={handleToggle}
              onClose={handleToggle}
              slotProps={{
                textField: {
                  // style: { input: { cursor: "pointer" } },
                  onClick: () => handleToggle(),
                  inputRef: inputTextRef,
                  // onFocus: () => inputTextRef.current?.blur(),
                },
              }}
              sx={{
                "& .css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root,.css-zy8vme,.css-1holvmy,.css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                  {
                    top: "-10px !important",
                  },
                "& input:hover": {
                  cursor: "pointer",
                },
              }}
              minDate={props?.item?.minDate ? dayjs(props?.item?.minDate,'DD/MM/YYYY') : null}
              maxDate={props?.item?.maxDate ? dayjs(props?.item?.maxDate,'DD/MM/YYYY') : null}
            
            />
          </LocalizationProvider>
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
          {!props?.getValues(props.item.name) && (
            <ErrorMessageComponent>
              <ErrorMessage errors={props.errors} name={props.item.name} />
            </ErrorMessageComponent>
          )}
        </>
      )}
    />
  );
};

export default DatepickerWrapperV2;
