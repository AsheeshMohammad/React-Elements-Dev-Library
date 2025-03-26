import React, { useState } from "react";
import { ErrorMessageComponent } from "./Form.styles";
import { ErrorMessage } from "@hookform/error-message";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { renderLabel } from "./FormRender";

const PasswordField = ({ props,variant }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <FormControl fullWidth>
      {" "}
      <Controller
        control={props.control}
        name={props.item.name}
        render={({ field }) => (
          <>
            <Box sx={{ position: "relative" }}>
              {" "}
                {renderLabel(variant,props)}
              <TextField
                size="small"
                type={showPassword ? "text" : "password"}
                autoComplete={props.item?.InputProps?.autoComplete || 'off'}
                placeholder={props.item.placeholder || ""}
                {...field}
                label={  variant !== "standard" ?`${props.item.label}${props.item.required ? ' *' : ''}`:''}
                sx={{
                  width: "100%",
                  "& .css-kichxs-MuiFormLabel-root-MuiInputLabel-root,.css-1holvmy":
                    {
                      top: "-8px",
                    },
                }}
                inputProps={{
                  maxLength: props.item.maxLength || 100,
                  onInput: (e: any) => {
                    props.item.onInputProps && props.item.onInputProps(e)
                  },
                  onPaste:(e)=>{
                    if(props.item?.doNotAllowPaste){
                      e.preventDefault();
                    }
                  }
                }}
                value={field.value || null}
                disabled={props.item.disable}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width:'25px'
                }}
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? (
                  <Visibility
                    sx={{
                      fontSize: "12px",
                      position: "absolute",
                    }}
                  />
                ) : (
                  <VisibilityOff
                    sx={{
                      fontSize: "12px",
                      position: "absolute",
                    }}
                  />
                )}
              </IconButton>
            </Box>
            <ErrorMessageComponent>
              <ErrorMessage errors={props.errors} name={props.item.name} />
            </ErrorMessageComponent>
          </>
        )}
      />
    </FormControl>
  );
};

export default PasswordField;
