import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitButton } from "../Global.styles";

export interface ConfirmationDialogProps{
  openConfirmDialog:boolean;
  handleCancel:()=>void;
  onClickSubmit:()=>void;
  text:string;
  Submit?:string;
  Cancel?:string;
}
const ConfirmationDialog = ({openConfirmDialog,handleCancel,onClickSubmit,text,Submit='Submit',Cancel='Cancel'}:ConfirmationDialogProps) => {
  return (
    <Dialog
      open={openConfirmDialog}
      TransitionComponent={Slide}
      fullWidth={true}
      sx={{
        position: "fixed",
        top: "10%",
        left: 0,
        right: 0,
        bottom: "auto",
        "& .css-tlc64q-MuiPaper-root-MuiDialog-paper,.css-mbdu2s": {
          maxWidth: "500px",
        },
        zIndex:40
      }}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        sx={{
          // background: theme.palette.primary.main,
          // color: "#fff",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Roboto",
          fontSize: "14px",
          cursor: "move",
          borderBottom: "1px solid rgb(229 231 235 / 1)",
        }}
      >
        <span>Confirmation Dailog</span>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={() => handleCancel()} />
      </DialogTitle>
      <DialogContent
        style={{ paddingTop: "20px", paddingBottom: 0 }}
        sx={{
          "& .pt-0": {
            paddingTop: 0,
          },
        }}
      >
        <Typography fontFamily={"Roboto-Reg"}>
          {text}
        </Typography>
        <Grid container gap={3}></Grid>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #e0e0e0", marginTop: 3 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <SubmitButton
            variant="contained"
            size="small"
            type="submit"
            onClick={() => onClickSubmit()}
          >
            {Submit}
          </SubmitButton>

          <Button
            variant="text"
            // color="error"
            size="small"
            sx={{
              textTransform: "none",
              color: "#000",
              background: "#ececee",
              ":hover": { background: "#0009", color: "#fff" },
            }}
            onClick={() => handleCancel()}
          >
            {Cancel}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
