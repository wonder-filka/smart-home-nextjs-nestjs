"use client";
import * as React from "react";
import styles from "./addcontroller.module.scss";
import { Button } from "@/components/Button/Button";
import { useState } from "react";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Router from "next/router";

export default function WifiSelect() {
  const { data: session, status } = useSession();
  const wifiPoints = ["wi-fi 1", "wi-fi 2", "wi-fi 3"];
  const [userInfo, setUserInfo] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function addWifi(e) {
    Router.replace("/controllers/add/findcontrollers");
  }
  return (
    <>
      <BackBtn rout="controllers/add" />
      <Title name="Выберите контроллер" />
      <div className="mainBlock">
        <div className={styles.AddControllerBlock}>
          <h3>Вам нужно настроить соединение Wifi, прежде чем идти дальше</h3>
          <br />
          <div className={styles.userInputs}>
            <Autocomplete
              disablePortal
              className={styles.inputWithList}
              id="combo-box-demo"
              options={wifiPoints}
              sx={{
                width: "100%",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Точки доступа Wi-Fi"
                  className={styles.inputWithListLabel}
                />
              )}
            />
            <br />
            <FormControl
              variant="outlined"
              sx={{
                width: "100%",
              }}
            >
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
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
            </FormControl>
          </div>
          <br />
          <br />
          <Button appearance="primary" onClick={addWifi}>
            <div className="btnName">Далее</div>
          </Button>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
