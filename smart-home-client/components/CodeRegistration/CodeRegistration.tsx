"use client";

import React, { useState, useRef, useEffect, MouseEventHandler } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/Button/Button";
import style from "./CodeRegistration.module.scss";
import { CodeRegistrationProps } from "./CodeRegistration.props";
import axios from "axios";
import { signIn } from "next-auth/react";

export const CodeRegistration = ({
  email,
  password,
  children,
  className,
  ...props
}: CodeRegistrationProps): JSX.Element => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeExport, setCodeExport] = useState(Number);
  const [isConfirm, setIsconfirm] = useState(false);
  const inputRefs = useRef([]);
  console.log(code);
  const handleChange = (index, event) => {
    const value = event.target.value;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "") {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && code[index] === "") {
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  useEffect(() => {
    setCodeExport(Number(code.join("")));
  }, [code]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email);
    console.log("codeExport", codeExport);
    axios
      .post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/users/confirm`, {
        user: {
          email: email,
          code: codeExport,
        },
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("Token", `Token ${response.data.user.token}`);
        setIsconfirm(true);
        signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return null;
  }

  return (
    <>
      {isConfirm ? (
        <div>
          <h1>E-mail confirmed!</h1>
        </div>
      ) : (
        <div>
          <h1>Please enter the code from e-mail</h1>
          <br />
          <br />
          <form>
            {code.map((digit, index) => (
              <TextField
                className={style.codeInput}
                sx={{ width: "6ch" }}
                key={index}
                id={`digit-input-${index}`}
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                value={digit}
                onChange={(event) => handleChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </form>
          <br />
          <br />
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </>
  );
};
