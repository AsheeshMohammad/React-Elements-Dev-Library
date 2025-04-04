import { ErrorMessage } from "@hookform/error-message";
import { Box, TextField } from "@mui/material";
import { ErrorMessageComponent } from "../Form.styles";
import { useEffect } from "react";
import { FormRenderProps, renderLabel } from "../FormRender";

const FormRenderMultiFileUpload = ({
  props,
  variant,
}: {
  props: FormRenderProps;
  variant: "standard" | "outlined" | "";
}) => {
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
      <Box paddingLeft={"4px"} sx={{ ...props.item.sx }}>
        {props.item?.label && (
          <Box sx={{ fontSize: "10px;" }}>{renderLabel(variant, props)}</Box>
        )}
        <TextField
          type="file"
          id={props.item.name}
          inputProps={{
            multiple: true,
            accept:
              props.item.fileType === "excel"
                ? ".xls,.xlsx"
                : props.item.fileType === "pdf"
                  ? ".pdf"
                  : props.item.fileType === "image"
                    ? ".jpg,.jpeg,.png"
                    : props.item.fileType === "all"
                      ? ".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.doc,.docx"
                      : "",
          }}
          onChange={(event) => {
            const file = event.target.files;
            const fileName =
              file && file.length > 0
                ? Array.from(file)
                    .map((item) => item.name)
                    .join(",")
                : null;
            console.log(file, "filefile", file.length, fileName);
            const allowedExtensions: {
              excel: string[];
              pdf: string[];
              image: string[];
              all: string[];
            } = {
              excel: ["xls", "xlsx"],
              pdf: ["pdf"],
              image: ["jpg", "jpeg", "png"],
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
                  : props.item.fileType === "image"
                    ? allowedExtensions.image
                    : allowedExtensions.all;

            if (
              props.item?.fileType &&
              fileExtension &&
              !validExtensions.includes(fileExtension)
            ) {
              props.item?.handleFileError &&
                props.item?.handleFileError(
                  `Please upload ${allowedExtensions[props.item.fileType].join(",")} Files only`
                );
              event.target.value = ""; // Clear the file input\
              props.setValue(props.item?.name, null);
              props.setValue(props.item?.name + "Name", "");
              return;
            } else if (event.target.files[event.target.files.length-1].size > 20000000) {
              props.item?.handleFileError &&
                props.item?.handleFileError(
                  `File size should be less than 20MB`
                );
                event.target.files = null; // Clear the file input
                props.setValue(props.item?.name, null);
                props.setValue(props.item?.name + "File", []);
              return;
            }
            const fileArray = Array.from(file);
            console.log(fileArray,'fileArrayfileArray');
            
            props.setValue(props.item?.name, fileName);
            props.setValue(props.item?.name + "File", fileArray);
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

export default FormRenderMultiFileUpload;
