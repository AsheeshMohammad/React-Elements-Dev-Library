import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, TextField, Tooltip } from "@mui/material";
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
  },
  option2: {
    fontSize: "11px",
  },
}));
const extractValuesToArray = (inputString: string) => {
  const valuesArray = inputString?.split(",");
  const trimmedArray = valuesArray?.map((value: any) => value.trim());
  return trimmedArray;
};
interface MultiSelectProps {
  value: string;
  options: { value: number | string; label: string }[];
  onChangeFn:(e:any)=>void;
  disable?:boolean;
}
export default function MultiSelectFieldComponent({
  value,
  options,
  onChangeFn,
  disable = false,
}: MultiSelectProps) {
  const [personName, setPersonName] = React.useState<string[]>(
    value ? extractValuesToArray(value) : []
  );
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState(options);
  const [selectAll, setSelectAll] = useState(false);
  const textfieldRef = React.useRef<any>();
  const fieldValue = value;
  const mappedIds = filterOptions.map((item: any) => item.value);
  const filterIds = filterOptions.map((item: any) => item.value);
  // console.log(value, "mnnmnmnnn");

  React.useEffect(() => {
    // setFilterOptions(options);
    if (searchText !== "") {
      setFilterOptions(
        options.filter((item: any) =>
          item.label.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilterOptions(options);
    }
  }, [options, searchText]);
  function hasExactMatch(array: any[], value: any) {
    return array.some((item: any) => item === value);
  }
  React.useEffect(() => {
    if (fieldValue?.split(",").length !== filterOptions.length) {
      setSelectAll(false);
    } else {
      console.log(fieldValue?.split(","), 'fieldValue?.split(",")', filterIds);

      if (
        fieldValue
          ?.split(",")
          .every((value: any) => hasExactMatch(filterIds, value))
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
    onChangeFn(
      (typeof value === "string" ? value?.split(",") : value).join(",")
    );
  };
  const selectedOptions = options.filter((item: any) =>
    fieldValue?.split(",").some((value: any) => value === item.value)
  );
  const selectedValues = selectedOptions
    .map((item: any) => item.label)
    .join(" , ");
  // console.log(fieldValue,'sjshshsh');
  console.log(value, "value");

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
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          sx={{
            "& .MuiTypography-root": {
              fontSize: "5px !important",
            },
          }}
          disabled={disable}
          value={value ? extractValuesToArray(value) : []}
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
            // props?.item?.onCloseMenu && props?.item?.onCloseMenu();
          }}
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
                     value
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
                  onChangeFn("");
                } else {
                  const allDataMapped = mappedIds.join(",");
                  console.log(allDataMapped, "allDataMapped");
                  onChangeFn(allDataMapped);
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
            filterOptions.map((option: any) => (
              <MenuItem
                key={option.value}
                value={`${option.value}`}
                sx={{ zIndex: 0, fontSize: "11px !important" }}
              >
                <Checkbox
                  checked={fieldValue
                    ?.split(",")
                    .some((value: any) => value === option.value)}
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
      </FormControl>
    </Box>
  );
}
