"use client";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./resetpassword.module.scss";
import { Button } from "@/components/Button/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Logo from "../../public/logo_full_white.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function Resetpassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorPassConfirm, setErrorPassConfirm] = useState("");
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const token = router.query.token;

  // Passwords modal show/down input
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleMouseDownPasswordConfirm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  console.log(token);
  function handleSubmit() {
    if (password == passwordConfirm) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_HOSTBACKEND}/resetpassword?token=${token}`,
          {
            user: {
              password: password,
              passwordResetToken: token,
            },
          }
        )
        .then((response) => {
          setIsSent(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setErrorPassConfirm("Passwords don't match");
  }

  return (
    <main className={styles.Auth}>
      <div className={styles.leftSide}>
        <div className={styles.leftSideWrap}>
          {isSent ? (
            <div className={styles.passwordChanged}>
              <h1>The password was changed</h1>

              <br />
              <Link href="/login" passHref>
                <Button appearance="primary">Back</Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1>Reset password</h1>

              <p> Enter new password</p>
              <FormGroup>
                <br />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <br />

                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPasswordConfirm ? "text" : "passwordConfirm"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                  />
                </FormControl>
                <div className="error">{errorPassConfirm}</div>
                <br />
                <Button appearance="primary" onClick={handleSubmit}>
                  Submit
                </Button>
                <br />
              </FormGroup>
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightSide}>
        <Logo />
      </div>
    </main>
  );
}
