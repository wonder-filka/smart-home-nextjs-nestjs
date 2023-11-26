"use client";
import * as React from "react";
import styles from "./addcontroller.module.scss";
import { Button } from "@/components/Button/Button";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";

export default function FindControllers() {
  const [getWifiPoint, setGetWifiPoint] = React.useState(false);

  useEffect(() => {
    if (getWifiPoint == true) Router.replace("/controllers/add/wifiselect");
  }, [getWifiPoint]);

  return (
    <>
      <BackBtn rout="controllers/add" />
      <Title name="Выберите контроллер" />
      <div className="mainBlock">
        <div className={styles.AddControllerBlock}>
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
