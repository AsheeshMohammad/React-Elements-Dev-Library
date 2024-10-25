import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorMessageComponent } from "../Form.styles";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: "11px", // Adjust the font size as needed
    fontFamily: "Roboto-Reg",
    zIndex: 2000,
  },
  option2: {
    fontSize: "11px",
    fontFamily: "Roboto-Reg",
    zIndex: 2000,
  },
}));
const SingleSelectNonAutoComplete = ({ props }: any) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth sx={{ position: "relative" }} key={props.item.name}>
      <InputLabel id="demo-simple-select-label">{props.item.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // {...props.register(props.item.name)}
        value={props.getValues(props.item.name)}
        label={`${props.item.label}${props.item.required ? " *" : ""}`}
        onChange={(e) => props.setValue(props.item.name, e.target.value)}
        onBlur={(e: any) => {
          props?.item?.onBlurFn && props?.item?.onBlurFn(e);
        }}
        // classes={{
        //   option:
        //     props.item.size === "extrasmall" ? classes.option : classes.option2,
        // }}
      >
        {props.item.options.map((item: any) => (
          <MenuItem
            sx={{
              fontSize: "11px", // Adjust the font size as needed
              fontFamily: "Roboto-Reg",
              zIndex: 2000,
            }}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessageComponent>
        <ErrorMessage errors={props.errors} name={props.item.name} />
      </ErrorMessageComponent>
    </FormControl>
  );
};

export default SingleSelectNonAutoComplete;
