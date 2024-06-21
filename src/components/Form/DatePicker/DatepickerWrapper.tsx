// import { useRef, useState } from 'react';
// import { Controller } from 'react-hook-form';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { ErrorMessage } from '@hookform/error-message';
// import { ErrorMessageComponent } from '../Form.styles';

// const DatepickerWrapper = ({ props }) => {
//   const inputTextRef = useRef<HTMLInputElement>();
//   const [open, setOpen] = useState(false);
//   const handleToggle = () => {
//     if (!open) {
//       inputTextRef.current?.blur();
//     }
//     setOpen(!open);
//   };
//   return (
//     <Controller
//       control={props.control}
//       name={props.item.name}
//       render={({ field }) => (
//         <>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label={props.item.label}
//               value={field.value}
//               open={open}
//               className="read-only"
//               format="DD/MM/YYYY"
//               disabled={props.item.disable || false}
//               onChange={date => {
//                 field.onChange(date);
//               }}
//               onOpen={handleToggle}
//               onClose={handleToggle}
//               slotProps={{
//                 textField: {
//                   style: { input: { cursor: 'pointer' } },
//                   onClick: () => handleToggle(),
//                   inputRef: inputTextRef,
//                   onFocus: () => inputTextRef.current?.blur()
//                 }
//               }}
//               sx={{
//                 '& .css-lqj8pz-MuiFormLabel-root-MuiInputLabel-root,.css-zy8vme,.css-1holvmy':{
//                   top: '-10px !important'
//                 }
//               }}
//               minDate={props?.item?.minDate || null}
//               maxDate={props?.item?.maxDate || null}
//             />
//           </LocalizationProvider>
//           {props?.item?.helperText && (
//             <span
//               style={{
//                 fontFamily: "Roboto-Reg",
//                 fontSize: "11px",
//                 color: "#3651d3",
//               }}
//             >
//               ({props?.item?.helperText})
//             </span>
//           )}
//           <ErrorMessageComponent>
//             <ErrorMessage errors={props.errors} name={props.item.name} />
//           </ErrorMessageComponent>
//         </>
//       )}
//     />
//   );
// };

// export default DatepickerWrapper;
import React from 'react'

const DatepickerWrapper = () => {
  return (
    <div>DatepickerWrapper</div>
  )
}

export default DatepickerWrapper
