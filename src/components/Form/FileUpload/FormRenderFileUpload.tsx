import { ErrorMessage } from "@hookform/error-message";
import { Box, TextField } from "@mui/material";
import { ErrorMessageComponent } from "../Form.styles";
import { useEffect } from "react";
import { FormRenderProps, renderLabel } from "../FormRender";

const FormRenderFileUpload = ({ props }: {props : FormRenderProps}) => {
  const getDocument: Document = document;
  useEffect(() => {
    if (
      props.getValues(props.item.name) === null ||
      props.getValues(props.item.name) === undefined
    ) {
      const element = document.getElementById(props.item.name);
      console.log(element, "elementelement");
      if (element) {
        (element as HTMLInputElement).value = ""; // Ensure it's an input element
      }
    }
  }, [props.getValues(props.item.name)]);

  return (
    <>
      <Box paddingLeft={"4px"}>
        {props.item?.label && (
          <Box sx={{ fontSize: "10px;" }}>
            {renderLabel(props.item?.label, props.item?.required)}
          </Box>
        )}
        <TextField
          type="file"
          id={props.item.name}
          inputProps={{
            accept:
              props.item.fileType === "excel"
                ? ".xls, .xlsx"
                : props.item.fileType === "pdf"
                  ? ".pdf"
                  : props.item.fileType === "all"
                    ? ".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.doc,.docx"
                    : "",
          }}
          onChange={(event) => {
            const file = event.target.files[0];
            const fileName = file ? file.name : null;
            const allowedExtensions:{excel:string[],pdf:string[],all:string[]} = {
              excel: ["xls", "xlsx"],
              pdf: ["pdf"],
              all: ["pdf", "jpg", "jpeg", "png", "xls", "xlsx", "doc", "docx"],
            };
            const fileExtension = fileName
              ? fileName.split(".").pop().toLowerCase()
              : null;
            const validExtensions =
              props.item.fileType === "excel"
                ? allowedExtensions.excel
                : props.item.fileType === "pdf"
                  ? allowedExtensions.pdf
                  : allowedExtensions.all;
            if (
              props.item?.fileType &&
              fileExtension &&
              !validExtensions.includes(fileExtension)
            ) {
              props.item?.handleFileError && props.item?.handleFileError(
                `Please upload ${allowedExtensions[props.item.fileType].join(",")} Files only`
              );
              event.target.value = ""; // Clear the file input
              return;
            }

            // Proceed if valid
            props.setValue(props.item?.name, file);
            props.setValue(props.item?.name + "Name", fileName);
            // props?.item?.onChangeFn({
            //   [props.item.name]: file,
            //   [props.item.name + "Name"]: fileName,
            // });
            // props.setValue(props.item?.name, file);
            // props.setValue(props.item?.name + "Name", fileName);
            // props?.item?.onChangeInput({
            //   [props.item.name]: file,
            //   [props.item.name + "Name"]: fileName,
            // });
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
