// import { FormControl, TextField } from "@mui/material";
// import { useRef, useState } from "react";
// import {
//   OptionsBox,
//   Options,
//   ArrowDown,
//   ErrorMessageComponent,
// } from "../Form.styles";
// import { ErrorMessage } from "@hookform/error-message";

// const SingleSelectForPagination = ({ props }) => {
//   const textRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   console.log(props.getValues('MaterialCode'),'props.getValues(props.item.name)');
  
//   return (
//     <FormControl fullWidth sx={{ position: "relative" }}>
//       <TextField
//         ref={textRef}
//         label={props.item.label}
//         value={props.getValues(props.item.name)}
//         onClick={() => setMenuOpen(true)}
//         onBlur={() => setMenuOpen(false)}
//       />
//       <ArrowDown />
//       <OptionsBox
//         sx={{
//           display: !menuOpen && "none",
//         }}
//       >
//         {props.item.options.map((item) => (
//           <Options onClick={()=>{props.setValue(props.item.name,'LAhg')}}>{item.label}</Options>
//         ))}
//       </OptionsBox>
//       <ErrorMessageComponent>
//         <ErrorMessage errors={props.errors} name={props.item.name} />
//       </ErrorMessageComponent>
//     </FormControl>
//   );
// };

// export default SingleSelectForPagination;
