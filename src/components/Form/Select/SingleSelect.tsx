import { ErrorMessage } from "@hookform/error-message";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessageComponent } from "../Form.styles";

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: "11px",
    fontFamily: "Roboto-Reg",
    zIndex: 2000,
  },
  option2: {
    fontSize: "11px",
    fontFamily: "Roboto-Reg",
    zIndex: 2000,
  },
}));

const SingleSelect = ({ props }: any) => {
  const classes = useStyles();
  // const valueRender = props.item.options?.find(
  //   (item) => item.value === props.getValues(props.item.name)
  // );

  const isOptionEqualToValue = (option: any, value: any) =>
    option?.value === value?.value; // Assuming there's a 'value' property in your options

  return (
    <Controller
      control={props.control}
      name={props.item.name}
      render={({ field }) => (
        <>
          <Autocomplete
            {...field}
            value={
              props.getValues(props.item.name)
                ? props.item.options?.find(
                    (item: any) =>
                      item.value === props.getValues(props.item.name)
                  )
                : null
            }
            onChange={(_, newValue) => {
              props.setValue(props.item.name, newValue?.value);
              props?.item?.onChangeFn &&
                props?.item?.onChangeFn(newValue?.value);
              props?.clearErrors && props?.clearErrors(props?.item?.name);
            }}
            onBlur={(e:any)=>{
              props?.item?.onBlurFn && props?.item?.onBlurFn(e);
            }}
            size="small"
            sx={{
              "& .MuiAutocomplete-input": {
                padding: "0px 0px 0px 5px !important",
              },
              "& .css-erkti9-MuiFormLabel-root-MuiInputLabel-root,.css-8edmr2-MuiFormLabel-root-MuiInputLabel-root":
                {
                  top: "-3px",
                },
            }}
            ListboxProps={{
              onScroll: (event: React.SyntheticEvent) => {
                const listboxNode = event.currentTarget;
                if (
                  listboxNode.scrollTop + listboxNode.clientHeight ===
                  listboxNode.scrollHeight
                ) {
                  // loadMoreResults();
                  // console.log(listboxNode,'listboxNodelistboxNode');
                }
              },
            }}
            disabled={props.item.disable}
            options={props.item.options}
            classes={{
              option:
                props.item.size === "extrasmall"
                  ? classes.option
                  : classes.option2,
            }}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 1401,
                },
              },
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => {
              return (
                <Tooltip
                  title={params.inputProps.value && params.inputProps.value}
                >
                  <TextField
                    {...params}
                    placeholder={props.item.Placeholder}
                    label={`${props.item.label}${props.item.required ? ' *' : ''}`}
                  />
                </Tooltip>
              );
            }}
            isOptionEqualToValue={isOptionEqualToValue}
          />
          <ErrorMessageComponent>
            <ErrorMessage errors={props.errors} name={props.item.name} />
          </ErrorMessageComponent>
        </>
      )}
    />
  );
};

export default SingleSelect;
