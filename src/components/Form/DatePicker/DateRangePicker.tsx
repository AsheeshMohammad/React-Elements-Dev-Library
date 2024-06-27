import React, { useEffect, useRef } from "react";
import { DateRangePicker, DateRange } from "mui-daterange-picker";
import { Box, Modal, TextField } from "@mui/material";
import "./DateRangePicker.scss";
import dayjs from "dayjs";
const convertDateFormat = (dateStr:string) => {
  const dateParts = dateStr?.split('/');
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];
  return `${year}-${month}-${day}T00:30:00.000Z`;
};


const DateRangePickerComponent = ({ props }: any) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<any>({
    "startDate":convertDateFormat(props.getValues('FromDate')),
    "endDate": convertDateFormat(props.getValues('ToDate'))
});
console.log(convertDateFormat(props.getValues('ToDate')),'Datataa');

  const textRef=useRef<any>(null);
  function formatDate(inputDateString:string) {
    const inputDate = new Date(inputDateString);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
}

  const toggle = () => setOpen(!open);
  useEffect(()=>{
    if(open){
      textRef?.current.focus()
    }
  },[open])
  const extractDate = (inputDateString: string | any) => {
    const inputDate = new Date(inputDateString);
    if (!inputDateString) {
      return "";
    }
    // Extract day, month, and year components
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Months are zero-based
    const year = inputDate.getFullYear();

    // Format the components as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  useEffect(()=>{
    console.log(dateRange,'lkjh');
    
    if(dateRange){
      props.setValue('FromDate',formatDate(dateRange?.startDate))
      props.setValue('ToDate',formatDate(dateRange?.endDate))
    }
  },[dateRange])

  useEffect(()=>{
    if(props.getValues('ToDate')){
      setOpen(false)
    }
  },[props.getValues('ToDate')])
  console.log(props.getValues('ToDate'),'props.getValues');
  
  console.log(props.getValues('FromDate'),props.getValues('FromDate'),'from date range picker');
  
  const value =
  props.getValues('FromDate') && props.getValues('ToDate')
      ? `${props.getValues('FromDate')} - ${props.getValues('ToDate')}`
      : "";
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      className="calender"
      sx={{
        position: "relative",
        width:'100%',
        "& .css-1holvmy, .css-kichxs-MuiFormLabel-root-MuiInputLabel-root": {
          top: "-10px",
        },
      }}
    >
      <TextField
        label={props.item.label}
        value={value || null}
        className="read-only"
        inputRef={textRef}
        sx={{width:'100%','& input':{cursor:'pointer'}}}
        onClick={() => {
          setOpen(true);
        }}
      />
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "20px,",
            background: "transparent",
            left:'auto',
            zIndex: 1000,
            display:'block'
          }}
        >
          <Box
            sx={{
              "& .css-h4y409-MuiList-root,.css-1ontqvh": {
                display: "none",
              },
            }}
          >
            <DateRangePicker
              open={true}
              toggle={toggle}
              initialDateRange={dateRange}
              closeOnClickOutside
              onChange={(range) => setDateRange(range)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DateRangePickerComponent;