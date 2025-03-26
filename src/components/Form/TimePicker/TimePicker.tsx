import * as React from "react";
import { useForm, Controller } from "react-hook-form"; // ✅ Import Controller
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { FormRenderProps, renderLabel } from "../FormRender";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorMessageComponent } from "../Form.styles";

/**
 * Parses a time string ("HH:mm:ss.SSSSSSS") into a Day.js object
 */
function parseCustomTime(timeString) {
  if (!timeString) return null; // Return null if empty
  const [timePart, msPart] = timeString.split(".");
  const [hours, minutes, seconds] = timePart.split(":").map(Number);
  const milliseconds = msPart ? parseFloat(`0.${msPart}`).toFixed(3) * 1000 : 0;
  return dayjs()
    .hour(hours)
    .minute(minutes)
    .second(seconds)
    .millisecond(milliseconds);
}

/**
 * Formats a Day.js object into "HH:mm:ss.SSSSSSS"
 */
function formatDayjsToCustomTime(date) {
  if (!date || !date.isValid()) return "";
  const milliseconds = date.millisecond().toString().padEnd(7, "0");
  return `${date.format("HH:mm:ss")}.${milliseconds}`;
}

export default function TimePickerFieldWrapper({
  props,
}: {
  props: FormRenderProps;
}) {
  const value = props.getValues(props.item.name);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="time"
        control={props.control}
        render={({ field }) => (
          <>
            {" "}
            {renderLabel(props.variant, props)}
            <TimePicker
              {...field}
              value={value ? parseCustomTime(value) : null}
              onChange={(newTime) => {
                props.setValue(
                  props.item.name,
                  formatDayjsToCustomTime(newTime)
                );
                props.item.onChangeFn && props.item.onChangeFn(formatDayjsToCustomTime(newTime))
              }}
              label={props.variant === "standard" ? "" : props.item.label}
              disabled={props.item.disable}
              slotProps={{ textField: { readOnly: true, size: "small" } }} // Prevent manual typing
            />
          </>
        )}
      />
      <ErrorMessageComponent>
        <ErrorMessage errors={props.errors} name={props.item.name} />
      </ErrorMessageComponent>
    </LocalizationProvider>
  );
}
