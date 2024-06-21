import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, TextField, Tooltip } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { ErrorMessageComponent } from "../Form.styles";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  autoFocus: false,
  disableAutoFocusItem: true,
};

const extractValuesToArray = (inputString: string) => {
  const valuesArray = inputString?.split(",");
  const trimmedArray = valuesArray?.map((value) => value.trim());
  return trimmedArray;
};

export default function MultiSelectV1({ props }: any) {
  const fieldValue = props.getValues(props.item.name);
  const [personName, setPersonName] = React.useState<string[]>(
    fieldValue
      ? extractValuesToArray(fieldValue)
      : []
  );
  const [searchText, setSearchText] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const options = props.item?.options;
  const [filterOptions, setFilterOptions] = useState([]);
  const textfieldRef:any = React.useRef();
  console.log(options, "Options");

  React.useEffect(() => {
    // setFilterOptions(options);
    if (searchText !== "") {
      setFilterOptions(options.filter((item:any) => item.includes(searchText)));
    } else {
      setFilterOptions(options);
    }
  }, [options, searchText]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value?.split(",") : value);
    props.setValue(
      props.item.name,
      (typeof value === "string" ? value?.split(",") : value).join(",")
    );
  };
  React.useEffect(() => {
    if (selectAll) {
      const allDataMapped = filterOptions.join(",");
      props.setValue(props.item.name, allDataMapped);
    }
  }, [selectAll]);
  function hasExactMatch(array:any, value:any) {
    return array.some((item:any) => item === value);
  }
  useEffect(() => {
    if (fieldValue?.split(",")?.length !== filterOptions?.length) {
      setSelectAll(false);
    } else {
      console.log(fieldValue?.split(","),filterOptions,'filterOptionsfilterOptions');
      if (fieldValue?.split(",").every((value:any) => hasExactMatch(filterOptions, value))) {
        setSelectAll(true);
      }
    }
  }, [filterOptions, fieldValue]);

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{
          "& .css-kichxs-MuiFormLabel-root-MuiInputLabel-root,.css-1holvmy": {
            top: "-10px",
          },
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label">
          {props.item.label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          disabled={props.item.disable}
          value={
            fieldValue
              ? extractValuesToArray(fieldValue)
              : []
          }
          onChange={handleChange}
          onOpen={() => {
            setTimeout(() => {
              if (textfieldRef.current) {
                textfieldRef.current?.focus();
              }
            }, 0);
          }}
          onClose={() => {
            setSearchText("");
            props?.item?.onCloseMenu && props?.item?.onCloseMenu();
          }}
          input={<OutlinedInput label={props.item.label} />}
          renderValue={(selected:any) => (
            <Tooltip
              title={
                extractValuesToArray(fieldValue)?.length >
                  3 &&
                extractValuesToArray(fieldValue)?.join(
                  ", "
                )
              }
            >
              {selected?.length > 3
                ? selected?.length + `  Selected`
                : selected?.join(", ")}
            </Tooltip>
          )}
          MenuProps={MenuProps} // Pass the MenuProps object here
          autoFocus={false}
        >
          {/* {options?.length!==0 ? <> */}
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "0px",
              padding: "7px",
              zIndex: 2,
              height: "33px",
              background: "#fff",
              display: options?.length === 0 ? "none" : undefined,
            }}
          >
            <TextField
              inputRef={textfieldRef}
              autoFocus
              value={searchText}
              sx={{
                width: "100%",
              }}
              placeholder="Search..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </Box>
            <MenuItem
              disabled={filterOptions?.length===0}
              onChange={(e) => setSelectAll(!selectAll)}
              sx={{ zIndex: 0, fontSize: "5px !important",display:options?.length===0 ? 'none' : '' }}
            >
              <Checkbox
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(!selectAll);
                  const selectChanged = !selectAll;
                  if (!selectChanged) {
                    props.setValue(props.item.name, "");
                  }
                }}
              />
              <ListItemText primary={"Select All"} sx={{ fontSize: "5px" }} />
            </MenuItem>
          {filterOptions?.length !== 0 ? (
            filterOptions?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{ zIndex: 0, fontSize: "5px !important" }}
              >
                <Checkbox
                  checked={
                    extractValuesToArray(
                      fieldValue
                    )?.indexOf(name) > -1
                  }
                  size="small"
                />
                <ListItemText primary={name} sx={{ fontSize: "5px" }} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled={true} key={"NA"} value={"NA"}>
              No data Found
            </MenuItem>
          )}
          {/* </> : <MenuItem disabled={true} key={'NA'} value={'NA'}>No data Found</MenuItem>  */}
          {/* } */}
        </Select>
        <ErrorMessage
          errors={props.errors}
          name={props.item.name}
          render={({ message }) => (
            <ErrorMessageComponent>{message}</ErrorMessageComponent>
          )}
        />
      </FormControl>
    </Box>
  );
}
