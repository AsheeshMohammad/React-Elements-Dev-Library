import styled from "@emotion/styled";
import { Button, Dialog, DialogTitle, Grid, Typography } from "@mui/material";

export const AddButtonFloat = styled(Button)(({ theme }) => ({
  // borderRadius: "0.25rem",
  border: 0,
  color: "#fff",
  position: "absolute",
  textAlign: "center",
  padding: " 5px 12px",
  fontSize: "13px",
  height: "30px",
  right: "-38px",
  textTransform: "none",
  zIndex: 2,
  borderRadius: "10px 0px 0px 10px",
  // background: "#0acf97",
  // background: "#F4694Bt",
//   background: theme.callColors.themeButtonColor,
  ":hover": {
    right: "0px",
    // background: "#0acf97",
    // background: "#F4694B",
    // background: theme.callColors.themeButtonColor,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
//   background: theme.callColors.themeButtonColor,
  ":hover": {
    // background: theme.callColors.themeButtonColor,
  },
}));
export const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#000",
  background: "#ececee",
  ":hover": { background: "#0009", color: "#fff" },
}));
export const SaveAsDraftButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "12px",
  background: "orange",
  ":hover": { background: "orange" },
}));
export const PageHeader = styled(Typography)(({ theme }) => ({
  // fontFamily: "Roboto-Med",
}));
export const ReportsItem = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "noOfColumn",
})<any>(({ theme, noOfColumn }) => ({
  // width: `calc(100%/${noOfColumn})`,
  flexDirection: "column",
  marginBottom: theme.spacing(1),
  minWidth: "10%",
  paddingLeft: "0px",
  zIndex: 2,
  paddingRight: "0px",
  border: "1px solid #0003",
  fontSize: "12px",
  padding: "6px",
  // fontFamily: "Roboto",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  "& :hover": {
    cursor: "pointer",
  },
}));

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  position: "fixed",
  top: -16,
  left: 0,
  right: 0,
  bottom: "auto",
  "& .css-tlc64q-MuiPaper-root-MuiDialog-paper,.css-mbdu2s": {
    maxWidth: "900px",
  },
}));
export const DialogTitleWrapper = styled(DialogTitle)(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "14px",
  cursor: "move",
  // fontFamily: "Roboto",
  borderBottom: "1px solid rgb(229 231 235 / 1)",
}));
