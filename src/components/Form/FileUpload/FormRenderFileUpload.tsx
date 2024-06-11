import { ErrorMessage } from "@hookform/error-message";
import { Box, TextField } from "@mui/material";
import { ErrorMessageComponent } from "../Form.styles";
import { useEffect } from "react";

const FormRenderFileUpload = ({props}:any) => {

  // const getDocument:any=document;
  // useEffect(()=>{
  //   if(props.getValues(props.item.name)===null || props.getValues(props.item.name)==undefined){
  //     // getDocument.getElementById(props.item.name)?.value=''
  //   }
  // },[props.getValues(props.item.name)])
  return (
    <>
      <Box paddingLeft={"4px"}>
        <TextField
          type="file"
          id={props.item.name}
          inputProps={{ accept: props.item.fileType==='excel' ? ".xls, .xlsx" : '' }}
          onChange={(event:any) => {
            const file = event.target?.files[0];
            const fileName = file ? file.name : null;
            props.setValue(props.item?.name, file);
            props.setValue(props.item?.name + "Name", fileName);
            props.item.onChangeInput({
              [props.item.name]: file,
              [props.item.name + "Name"]: fileName,
            });
          }}
          sx={{ width: "100%" }}
        />
      </Box>
      <ErrorMessageComponent>
        <ErrorMessage errors={props.errors} name={props.item.name} />
      </ErrorMessageComponent>
    </>
  );
};

export default FormRenderFileUpload;
