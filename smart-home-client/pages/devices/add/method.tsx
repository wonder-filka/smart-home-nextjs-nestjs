import * as React from "react";
import styles from "./add.module.scss";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/Button/Button";
import Router from "next/router";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { useSession } from "next-auth/react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Method() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState(null);
  const [controller, setControllers] = useState([]);
  function nextStep(e) {
    Router.replace("/devices/add/");
  }
  function prevStep(e) {
    Router.replace("/devices/add");
  }
  {
    return (
      <>
        <BackBtn rout="devices/add" />
        <Title name="Добавить устройство" />
        <div className="mainBlock mt-20">
          <div className="block-without-layout">
            <h3>Выберите метод</h3>
            <br />
            <p>
              При сканировании QR-кода Вы добавите устройство быстро и
              эффективно
            </p>
            <br />
            <div className={styles.gridBlock}>
              <div
                className={`${styles.gridItem} full-center  ${
                  selected === 0 ? "green-border" : ""
                }`}
                onClick={() => {
                  setSelected(0);
                }}
              >
                QR-код
              </div>
              <div
                className={`${styles.gridItem} full-center  ${
                  selected === 1 ? "green-border" : ""
                }`}
                onClick={() => {
                  setSelected(1);
                }}
              >
                Вручную
              </div>
            </div>
            <br />
            <br />
            {/* <button onClick={nextStep}>Вперед</button> */}
            <Button appearance="primary" onClick={nextStep}>
              Далее
            </Button>
            <br />
            <Button appearance="secondary" onClick={prevStep}>
              Вернуться назад
            </Button>
            <br />
          </div>
        </div>
        <BottomMenu />
      </>
    );
  }
}
