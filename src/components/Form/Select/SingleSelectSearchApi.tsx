import { ErrorMessage } from "@hookform/error-message";
import {
  Autocomplete,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessageComponent, OptionRender } from "../Form.styles";
import { FormRenderProps } from "../FormRender";

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: "11px", // Adjust the font size as needed
    
  },
  option2: {
    fontSize: "14px",
    
  },
}));

const SingleSelectSearchApi = ({ props }: { props: FormRenderProps }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState<string>("");
  const [optionsFetched, setOptionsFetched] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(
    props.getValues(props.item.name),
    "props.getValues(props.item.name)"
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (props?.item?.autoFIll && props.getValues(props.item.name)) {
      setSearchValue(props.getValues(props.item.name));
      setOptionsFetched([]);
    } else if (props.getValues(props.item.name)) {
      setSearchValue(props.getValues(props.item.name));
    }
    // if(searchValue!==''){
    setIsLoading(true);
    props.item.AxiosInstance.get(
      props.item.ApiInstance + `&${props.item.searchInstance}=${searchValue}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${props.item.tokenInstance}`,
        },
      }
    )
      .then((res) => {
        setOptionsFetched(res.data);
        setIsLoading(false);
        props.item.setLoadedPaginationOptions &&
          props.item.setLoadedPaginationOptions(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return () => controller.abort();
    // }
  }, [
    searchValue,
    props.getValues(props.item.name),
    props.item.ApiInstance,
    props?.item?.autoFIll,
    props?.item?.tokenInstance
  ]);
  useEffect(() => {
    if (props.item?.ApiInstanceReferal) {
      setSearchValue("");
    }
  }, [props.item?.ApiInstanceReferal]);
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
                ? optionsFetched?.find(
                    (item) => item?.value === props.getValues(props.item.name)
                  )
                : null
            }
            onChange={(_, newValue) => {
              // field.onChange(newValue);
              props.setValue(props.item.name, newValue?.value);
              props?.item?.onChangeFn &&
                props?.item?.onChangeFn(newValue?.value);
              props?.clearErrors && props?.clearErrors(props.item.name);
            }}
            size="small"
            sx={{
              "& .MuiAutocomplete-input": {
                padding: "0px 0px 0px 5px !important",
              },
              "& .css-erkti9-MuiFormLabel-root-MuiInputLabel-root ": {
                top: "-5px",
              },
            }}
            disabled={props.item.disable}
            options={optionsFetched}
            classes={{
              option:
                props.item.size === "extrasmall"
                  ? classes.option
                  : classes.option2,
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => {
              return (
                <Tooltip
                  title={params.inputProps.value && params.inputProps.value}
                >
                  <TextField
                    {...params}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    placeholder={props.item.placeholder}
                    label={props.item.label}
                  />
                </Tooltip>
              );
            }}
            PaperComponent={({ children }) => (
              <div
                style={{
                  background: "#fff",
                }}
              >
                {isLoading ? (
                  <Stack padding={2} spacing={1}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </Stack>
                ) : (
                  children
                )}
              </div>
            )}
            isOptionEqualToValue={isOptionEqualToValue}
          />
          {props?.item?.helperText && (
            <span
              style={{
                
                fontSize: "11px",
                color: "#3651d3",
              }}
            >
              ({props?.item?.helperText})
            </span>
          )}
          <ErrorMessageComponent>
            <ErrorMessage errors={props.errors} name={props.item.name} />
          </ErrorMessageComponent>
        </>
      )}
    />
  );
};

export default SingleSelectSearchApi;
