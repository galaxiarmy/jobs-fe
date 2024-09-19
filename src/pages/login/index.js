import { Google } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle } from "../../firebase/auth";
import { coreService } from "../../utils/general";

function Login() {
  const navigate = useNavigate();

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    doSignInWithGoogle()
      .then((res) => {
        coreService.setItem("isLoggedIn", true);
        coreService.setItem("email", res?.email);

        navigate("/home", {
          replace: true,
        });
      })
      .catch((err) => {
        alert("Gagal melakukan login")
      });
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box flexDirection={"column"} gap={2}>
        <Typography fontWeight={"bold"}>Dashboard DansPRO Jobs</Typography>
        <Button variant="contained" onClick={onGoogleSignIn}>
          <Google />  Sign In With Google
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
