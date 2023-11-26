"use client";
import * as React from "react";
import { MouseEventHandler, useState, useEffect } from "react";
import axios from "axios";
import styles from "./registration.module.scss";
import { Button } from "@/components/Button/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Link from "next/link";
import LogoLong from "../../public/logo-long.svg";
import Router from "next/router";
import { useSession } from "next-auth/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../public/Google.svg";
import { CodeRegistration } from "@/components/CodeRegistration/CodeRegistration";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function Registration() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dataSend, setDataSend] = useState(false);

  const [error, setError] = useState("");
  const [errorTerms, setErrorTerms] = useState("");

  const [agreeToTheTerms, setAgreeToTheTerms] = useState<boolean>(true);

  const handleAgreeToTheTerms = (event) => {
    setAgreeToTheTerms(event.target.checked);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (agreeToTheTerms === true) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HOSTBACKEND}/users`,
          {
            user: {
              firstname: firstName,
              lastname: lastName,
              email: email,
              password: password,
              googleId: "",
            },
          }
        );
        console.log(response);
        if (response.data) {
          setDataSend(true);
        }
      } catch (error) {
        console.error(error);
        if (Array.isArray(error.response.data.message)) {
          setError(error.response.data.message.join(", "));
        } else {
          setError(error.response.data.message);
        }
      }
    } else {
      setErrorTerms("Please confirm the terms of use of the Quadrobit system.");
    }
  };
  if (status === "unauthenticated") {
    return (
      <main className={styles.Auth}>
        <div className={styles.leftSide}>
          <div className={styles.leftSideWrap}>
            {dataSend ? (
              <CodeRegistration email={email} password={password} />
            ) : (
              <div>
                <h1>Registration</h1>
                <br />
                <FormGroup>
                  <TextField
                    sx={{ width: "100%" }}
                    label="First name"
                    variant="outlined"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%" }}
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%" }}
                    label="E-mail"
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="error">{error}</div>
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
                  <div className={styles.checkboxTerms}>
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={agreeToTheTerms}
                      onChange={handleAgreeToTheTerms}
                      label=""
                    />
                    <span className={styles.checkboxTermsText}>
                      I agree to
                      <Link href="/registration/terms" passHref target="_blank">
                        {" "}
                        the terms{" "}
                      </Link>
                      of use of the Quadrobit system.
                    </span>
                  </div>
                  <div className="error">{errorTerms}</div>
                  <br />
                  <Button appearance="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
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
                  <Link href="/login" passHref className="outline">
                    <Button appearance="ghost">Login</Button>
                  </Link>
                </FormGroup>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightSide}>
          <LogoLong />
        </div>
      </main>
    );
  }
}
