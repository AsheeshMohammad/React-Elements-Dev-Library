import { DialogContent, DialogActions, Button, Slide } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import {
  DialogContainer,
  DialogTitleWrapper,
  SubmitButton,
  CancelButton,
  SaveAsDraftButton,
} from "../Global.styles";

interface ViewModal {
  openModal: boolean;

  name: string;

  handleSubmit: () => void;
  handleCancel: () => void;
  handleSaveButton?:()=>void;

  content: JSX.Element;
  width?: string;
  Transition?: "Slide" | "";
  Type?: "Submit" | "";
  styles?: any;
  SubmitButtonName?: string;
  saveButton?:boolean
  submitButton?:boolean
}

const ModalField = ({
  name,
  openModal,
  handleCancel,
  content,
  width = "900px",
  Transition = "",
  handleSubmit,
  styles = {},
  saveButton: isSaveButton=false,
  submitButton=true,
  handleSaveButton=()=>null,
  SubmitButtonName = "Submit",
}: ViewModal) => {
  const TransitionComponent = () => {
    switch (Transition) {
      case "Slide":
        return Slide;
      default:
        return undefined;
    }
  };

  return (
    <DialogContainer
      open={openModal}
      TransitionComponent={TransitionComponent()}
      fullWidth={true}
      aria-labelledby="draggable-dialog-title"
      sx={{
        zIndex: 20,
        "& .css-tlc64q-MuiPaper-root-MuiDialog-paper,.css-mbdu2s": {
          maxWidth: width,
        },
        ...styles,
      }}
    >
      <DialogTitleWrapper>
        <span>{name}</span>

        <CloseIcon sx={{ cursor: "pointer" }} onClick={() => handleCancel()} />
      </DialogTitleWrapper>

      <DialogContent
        style={{ paddingTop: "20px", paddingBottom: 0 }}
        sx={{
          "& .pt-0": {
            paddingTop: 0,
          },
        }}
      >
        {content}
      </DialogContent>

      <DialogActions sx={{ borderTop: "1px solid #e0e0e0", marginTop: 3 }}>
        <div
          style={{
            display: "flex",

            justifyContent: "flex-end",

            gap: "8px",
          }}
        >
          {isSaveButton && <SaveAsDraftButton
            variant="contained"
            size="small"
            onClick={() => handleSaveButton()}
          >
            Save
          </SaveAsDraftButton>}
         {submitButton && <SubmitButton
            variant="contained"
            size="small"
            onClick={() => handleSubmit()}
          >
            {SubmitButtonName}
          </SubmitButton>}
          <CancelButton
            variant="text"
            size="small"
            onClick={() => handleCancel()}
          >
            Cancel
          </CancelButton>
        </div>
      </DialogActions>
    </DialogContainer>
  );
};

export default ModalField;
