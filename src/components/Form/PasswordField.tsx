import React, { useState } from "react";
import { ErrorMessageComponent } from "./Form.styles";
import { ErrorMessage } from "@hookform/error-message";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({ props }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <FormControl fullWidth >
      {" "}
      <Controller
        control={props.control}
        name={props.item.name}
        render={({ field }) => (
          <>
           <Box sx={{position:'relative'}}> <TextField
              type={showPassword ? "text" : "password"}
              {...field}
              label={props.item.label}
              sx={{
                width: "100%",
                "& .css-kichxs-MuiFormLabel-root-MuiInputLabel-root,.css-1holvmy":
                  {
                    top: "-8px",
                  },
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
              }}
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
            >
              {showPassword ? (
                <Visibility sx={{ fontSize: "12px",position:'absolute',top:'22%',right:10 }} />
              ) : (
                <VisibilityOff sx={{ fontSize: "12px",position:'absolute',top:'22%',right:10 }} />
              )}
            </IconButton></Box>
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
