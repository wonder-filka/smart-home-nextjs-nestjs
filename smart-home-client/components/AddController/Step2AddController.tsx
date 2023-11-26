import styles from "./AddControllerSteps.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";

export const Step2AddController = ({
  nextStep = () => {},
  prevStep = () => {},
}) => {
  const wifiPoint = true;

  useEffect(() => {
    if (wifiPoint) {
      nextStep();
    }
  }, [wifiPoint, nextStep]);

  return (
    <div className={styles.AddController1}>
      <h1>Настройка Wi-Fi точки доступа</h1>
      <p>
        Вам нужно настроить соединение Wifi, прежде чем идти дальше.
        <br />
        Поиск сетей WiFi, пожалуйства, подождите.
      </p>
      <br />
      {/* <button onClick={prevStep}>Назад</button>
        <button onClick={nextStep}>Вперед</button> */}
      <br />
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};
