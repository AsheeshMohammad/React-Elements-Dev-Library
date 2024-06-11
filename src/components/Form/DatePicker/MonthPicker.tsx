import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MonthPicker = ({props}:any) => {
  const [selectedMonths, setSelectedMonths] = useState<any>([]);

  const handleMonthChange = (date:any) => {
    // Handle the selected months
    setSelectedMonths((prevSelectedMonths:any) => {
      const monthIndex = date.getMonth();

      if (prevSelectedMonths.includes(monthIndex)) {
        // If month is already selected, remove it
        return prevSelectedMonths?.filter((month:any) => month !== monthIndex);
      } else {
        // If month is not selected, add it
        return [...prevSelectedMonths, monthIndex];
      }
    });
  };

  return (
    <Controller
      control={props.control}
      name={props.item.name}
      render={({ field }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={field.value}
              onChange={handleMonthChange}
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
              slots={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                textField: (textFieldProps:any) => <TextField
                {...textFieldProps}
                fullWidth
                disabled={props.item.disable || false}
                InputLabelProps={{
                  shrink: true,
                }}
                error={props.errors}
                inputProps={{
                  min: props.item.minDate,
                }}
              />
              }}
              // ToolbarComponent={({ date, decreaseMonth, increaseMonth }:any) => (
              //   <div>
              //     <button onClick={decreaseMonth}>&lt;</button>
              //     <span>{date.getMonth() + 1}</span>
              //     <button onClick={increaseMonth}>&gt;</button>
              //   </div>
              // )}
            />
          </LocalizationProvider>

          {/* Display selected months */}
          <FormGroup>
            {Array.from({ length: 12 }).map((_, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedMonths.includes(index)}
                    onChange={() => handleMonthChange(new Date(2000, index, 1))}
                    color="primary"
                  />
                }
                label={(new Date(2000, index, 1)).toLocaleDateString(undefined, { month: 'short' })}
              />
            ))}
          </FormGroup>
        </>
      )}
    />
  );
};

export default MonthPicker;
