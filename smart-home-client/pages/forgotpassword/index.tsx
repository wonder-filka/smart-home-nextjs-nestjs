"use client";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./forgotpassword.module.scss";
import { Button } from "@/components/Button/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Logo from "../../public/logo_full_white.svg";
import Link from "next/link";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/forgotpassword`, {
        user: {
          email: email,
        },
      })
      .then((response) => {
        if (response) {
          console.log("true");
          setIsSent(true);
        }
      })
      .catch((error) => {
        setError("Email is not exist");
      });
  }

  return (
    <main className={styles.Auth}>
      <div className={styles.leftSide}>
        <div className={styles.leftSideWrap}>
          {isSent ? (
            <div className={styles.emailSent}>
              <h1>The password reset email has been sent to your inbox.</h1>
              <br />
              <Link href="/login" passHref>
                <Button appearance="primary">Back</Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1>Forgot password</h1>
              <p>Enter your e-mail</p>
              <FormGroup>
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
                <Button appearance="primary" onClick={handleSubmit}>
                  Submit
                </Button>
                <br />

                <Link href="/login" passHref>
                  <Button appearance="ghost">Login</Button>
                </Link>
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
