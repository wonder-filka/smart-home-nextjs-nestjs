import styles from "./AddControllerSteps.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { Button } from "@/components/Button/Button";

const wifiPoints = ["wi-fi 1", "wi-fi 2", "wi-fi 3"];

export const Step3AddController = ({
  nextStep = () => {},
  prevStep = () => {},
}) => {
  const [userInfo, setUserInfo] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.AddController1}>
      <p>Вам нужно настроить соединение Wifi, прежде чем идти дальше.</p>
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
      <Button appearance="primary" onClick={nextStep}>
        <div className="btnName">Далее</div>
      </Button>
      {/* <button onClick={prevStep}>Назад</button>
      <button onClick={nextStep}>Вперед</button> */}
    </div>
  );
};

export default Step3AddController;
