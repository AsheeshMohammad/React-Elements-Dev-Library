import TextField from "@mui/material/TextField";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { ErrorMessageComponent } from "../Form.styles";
import { formatDateMonthAndYear } from "../FormRender";
import { ClickAwayListener } from "@mui/base";

const Monthpickerrender = ({ props }:any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [calenderOpen, setCalenderOpen] = useState(false);
  return (
    <Controller
      control={props.control}
      name={props.item.name}
      render={({ field }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ClickAwayListener onClickAway={() => setCalenderOpen(false)}>
              <DatePicker
                ref={ref}
                label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                views={["month","year"]}
                disabled={props.item.disable}
                value={
                  field.value
                    ? dayjs(formatDateMonthAndYear(field.value || null))
                    : null
                }
                slotProps={{
                  textField: {
                    onClick: () => setCalenderOpen(true),
                    // onBlur: () => setCalenderOpen(false),
                  },
                }}
                disableOpenPicker={props.item.disable}
                // onMonthChange={() => setCalenderOpen(false)}
                // onYearChange={() => setCalenderOpen(false)}
                open={calenderOpen}
                defaultValue={field.value}
                onChange={(date:any) => {
                  field.onChange(dayjs(date).format("MM/YYYY"));
                  props.setValue(dayjs(date).format("MM/YYYY"));
                }}
                sx={{
                  "& .css-1holvmy,.css-kichxs-MuiFormLabel-root-MuiInputLabel-root":
                    {
                      top: "-10px",
                    },
                  "& input": {
                    paddingRight: "0px !important",
                  },
                  "& button": {
                    paddingLeft: "0px !important",
                    paddingRight: "0px !important",
                  },
                }}
                // renderInput={(params:any) => (
                //   <TextField
                //     {...params}
                //     fullWidth
                //     disabled={props.item.disable || false}
                //     InputLabelProps={{
                //       shrink: true,
                //     }}
                //     inputProps={{
                //       min: props.item.minDate,
                //     }}
                //   />
                // )}
                // ToolbarComponent={({ date, decreaseMonth, increaseMonth }:any) => (
                //   <div>
                //     <button onClick={decreaseMonth}>&lt;</button>
                //     <span>{date.getMonth() + 1}</span>
                //     <button onClick={increaseMonth}>&gt;</button>
                //   </div>
                // )}
                minDate={props.item.minDate ? dayjs(props.item.minDate,'MM/YYYY') : null}
                maxDate={props.item.maxDate ? dayjs(props.item.maxDate,'MM/YYYY') : null}
              />
            </ClickAwayListener>
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
          <ErrorMessageComponent>
            <ErrorMessage errors={props.errors} name={props.item.name} />
          </ErrorMessageComponent>
        </>
      )}
    />
  );
};

export default Monthpickerrender;
