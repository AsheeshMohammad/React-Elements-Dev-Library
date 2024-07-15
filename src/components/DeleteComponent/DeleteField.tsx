import { Tooltip, Typography, Grid } from "@mui/material";
import ConfirmationDialog from "../ModalField/ConfirmationDialog";
import { useState } from "react";
export interface DeleteFieldProps {
  onClickFn: () => void;
  tooltip: string;
  text: string;
}
const DeleteField = ({ onClickFn, tooltip = "Delete", text }: DeleteFieldProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleCancel=()=>{
    setOpenDialog(false)
  }
  return (
    <>
      <Tooltip
        title={<Typography sx={{ fontSize: "8px" }}>{tooltip}</Typography>}
      >
        <Grid
          sx={{ ":hover": { cursor: "pointer" } }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <i
            className="flaticon-trash"
            style={{
              lineHeight: 1,
              fontSize: "11px",
              color: "red",
              marginTop: "10px",
            }}
          ></i>
        </Grid>
      </Tooltip>
      <ConfirmationDialog
        openConfirmDialog={openDialog}
        handleCancel={handleCancel}
        onClickSubmit={()=>{
            handleCancel();
            onClickFn();
        }}
        text={text}
      />
    </>
  );
};

export default DeleteField;
