"use client";
import * as React from "react";
import { MouseEventHandler, useState, useEffect } from "react";
import axios from "axios";
import styles from "./login.module.scss";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import LogoLong from "../../public/logo-long.svg";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../public/Google.svg";
import { ResponseCookies } from "@edge-runtime/cookies";
import { setCookie } from "nookies";
import { Button } from "@/components/Button/Button";

export default function Login() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState("");

  if (rememberMe) {
    setCookie(null, "rememberMe", "true", {});
  } else {
    setCookie(null, "rememberMe", "false", {});
  }

  let rememberMetoString: string = rememberMe.toString();

  const cookies = new ResponseCookies(new Headers());
  cookies.set("rememberMe", rememberMetoString);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/users/login`, {
        user: {
          email: userInfo.email,
          password: userInfo.password,
        },
      })
      .then((response) => {
        localStorage.setItem("token", `Token ${response.data.user.token}`);
      })
      .catch((error) => {
        console.log("Error:", error);
        setError("Wrong password or e-mail");
      });
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
  };
  if (status === "unauthenticated") {
    return (
      <main className={styles.Auth}>
        <div className={styles.leftSide}>
          <div className={styles.leftSideWrap}>
            <h1>Login</h1>
            <br />
            <FormGroup>
              <TextField 
         
              sx={{
                "& fieldset": { border: 'white' }, width: "100%",
            
              }}
                label="E-mail"
                variant="outlined"
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                id="input_email"
              />
              <br />

              <FormControl variant="outlined"  sx={{
                "& fieldset": { border: 'white' }, width: "100%",
            
              }}>
                <InputLabel htmlFor="outlined-adornment-password"  id="input_pass">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={userInfo.password}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                  }
                />
              </FormControl>
              <div className="error">{error}</div>
              <br />
              <div className={styles.secondBtn}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <Link
                  href="/forgotpassword"
                  passHref
                  className="outline forgotpass"
                >
                  <Button appearance="ghost">Forgot Password?</Button>
                </Link>
              </div>
              <br />
              <Button appearance="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <br />
              <div className={styles.greyLineWrap}>
                <div className={styles.greyLine}></div>
                <span className={styles.lineLabel}>or sign in with</span>
                <div className={styles.greyLine}></div>
              </div>
              <br />
              <Button
                appearance="secondary"
                onClick={() => signIn("google")}
                color="secondary"
                id="googleButtonId"
              >
                <span className={styles.googleButton}>
                  <GoogleIcon />
                  Continue with Google
                </span>
              </Button>
              <br />
              <Link href="/registration" passHref className="outline">
                <Button appearance="ghost">Create an account</Button>
              </Link>
            </FormGroup>
          </div>
        </div>
        <div className={styles.rightSide}>
          <LogoLong />
        </div>
      </main>
    );
  }
}
