import { Box, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";

function InputField({ value, setValue, title, placeholder, icon }) {
  return (
    <Box width={"100%"}>
      <Typography fontWeight={"bold"}>{title}</Typography>
      <OutlinedInput
        size="small"
        sx={{
          minHeight: "40px",
          width: "100%",
        }}
        value={value}
        onChange={(e) => {
          setValue(e?.target?.value);
        }}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        placeholder={placeholder}
      />
    </Box>
  );
}

export default InputField;
