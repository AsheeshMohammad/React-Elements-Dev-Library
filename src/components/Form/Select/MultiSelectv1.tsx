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
import { ErrorMessageComponent } from "../Form.styles";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
  autoFocus: false,
  disableAutoFocusItem: true,
};
const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: "10px", // Adjust the font size as needed
    fontFamily: "Roboto-Reg",
  },
  option2: {
    fontSize: "11px",
    fontFamily: "Roboto-Reg",
  },
}));
const extractValuesToArray = (inputString: string) => {
  const valuesArray = inputString?.split(",");
  const trimmedArray = valuesArray?.map((value:any) => value.trim());
  return trimmedArray;
};

export default function MultiSelectV1({ props }: any) {
  const [personName, setPersonName] = React.useState<string[]>(
    props.getValues(props.item.name)
      ? extractValuesToArray(props.getValues(props.item.name))
      : []
  );
  const [searchText, setSearchText] = useState("");
  const options = props.item?.options;
  const [filterOptions, setFilterOptions] = useState(props.item.options);
  const [selectAll, setSelectAll] = useState(false);
  const textfieldRef = React.useRef<any>();
  const fieldValue = props.getValues(props.item.name);
  const mappedIds = filterOptions.map((item:any) => item.value);
  const filterIds = filterOptions.map((item:any) => item.value);
  // console.log(props.getValues(props.item.name), "mnnmnmnnn");

  React.useEffect(() => {
    // setFilterOptions(options);
    if (searchText !== "") {
      setFilterOptions(
        options.filter((item:any) =>
          item.label.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilterOptions(options);
    }
  }, [options, searchText]);

  // React.useEffect(() => {
  //   if (selectAll) {
  //     const allDataMapped = mappedIds.join(",");
  //     console.log(allDataMapped,'allDataMapped');
  //     props.setValue(props.item.name, allDataMapped);
  //   }
  // }, [selectAll]);
  function hasExactMatch(array:any[], value:any) {
    return array.some((item:any) => item === value);
  }
  React.useEffect(() => {
    if (fieldValue?.split(",").length !== filterOptions.length) {
      setSelectAll(false);
    } else {
      console.log(fieldValue?.split(","), 'fieldValue?.split(",")', filterIds);

      if (
        fieldValue?.split(",").every((value:any) => hasExactMatch(filterIds, value))
      ) {
        setSelectAll(true);
      }
    }
  }, [filterOptions, fieldValue]);

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
  const selectedOptions = options.filter((item: any) =>
    fieldValue?.split(",").some((value:any) => value === item.value)
  );
  const selectedValues = selectedOptions
    .map((item: any) => item.label)
    .join(" , ");
  // console.log(fieldValue,'sjshshsh');
  console.log(
    props.getValues(props.item.name),
    "props.getValues(props.item.name)"
  );

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
        {props.item.label}{props.item.required ? ' *' : ''}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          sx={{
            "& .MuiTypography-root": {
              fontSize: "5px !important",
            },
          }}
          disabled={props.item.disable}
          value={
            props.getValues(props.item.name)
              ? extractValuesToArray(props.getValues(props.item.name))
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
          renderValue={(selected) => (
            <Tooltip title={selectedValues}>
              {selectedOptions.length > 3
                ? selectedOptions.length + " Selected"
                : selectedValues}
            </Tooltip>
          )}
          MenuProps={MenuProps} // Pass the MenuProps object here
          autoFocus={false}
        >
          {/* {options.length!==0 ? <> */}
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "0px",
              padding: "7px",
              zIndex: 2,
              height: "33px",
              background: "#fff",
              display: options.length === 0 ? "none" : undefined,
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
          {/* {filterOptions.length !== 0 ? (
            filterOptions?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{ zIndex: 0, fontSize: "11px !important" }}
              >
                <Checkbox
                  checked={
                    extractValuesToArray(
                      props.getValues(props.item.name)
                    )?.indexOf(name) > -1
                  }
                  size="small"
                />
                <ListItemText primary={name} sx={{ fontSize: "11px" }} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled={true} key={"NA"} value={"NA"}>
              No data Found
            </MenuItem>
          )} */}
          <MenuItem
            disabled={filterOptions.length === 0}
            sx={{ zIndex: 0, fontSize: "5px !important" }}
          >
            <Checkbox
              size="small"
              checked={selectAll}
              onChange={(e) => {
                setSelectAll(!selectAll);
                const selectChanged = !selectAll;
                if (!selectChanged) {
                  props.setValue(props.item.name, "");
                } else {
                  const allDataMapped = mappedIds.join(",");
                  console.log(allDataMapped, "allDataMapped");
                  props.setValue(props.item.name, allDataMapped);
                }
              }}
            />
            <ListItemText
              primary={"Select All"}
              sx={{
                fontSize: "5px !important",
                "& span": {
                  fontSize: "12px !important",
                },
              }}
            />
          </MenuItem>
          {filterOptions.length !== 0 ? (
            filterOptions.map((option:any) => (
              <MenuItem
                key={option.value}
                value={`${option.value}`}
                sx={{ zIndex: 0, fontSize: "11px !important" }}
              >
                <Checkbox
                  checked={fieldValue
                    ?.split(",")
                    .some((value:any) => value === option.value)}
                  size="small"
                />
                <ListItemText
                  primary={option.label}
                  sx={{
                    fontSize: "5px !important",
                    "& span": {
                      fontSize: "12px !important",
                    },
                  }}
                />
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
