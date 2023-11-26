"use client";
import * as React from "react";
import styles from "./addcontroller.module.scss";
import { Button } from "@/components/Button/Button";
import Router from "next/router";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";

export default function Addcontroller() {
  function wifiStep(e) {
    Router.replace("/controllers/add/findwifi");
  }
  return (
    <>
      <BackBtn rout="controllers" />
      <Title name="Добавить контроллер" />
      <div className="mainBlock">
        <div className={styles.AddControllerBlock}>
          <h3>Выберите метод</h3>
          <p>
            Если вы выбираете “ДОБАВИТЬ С WIFI”, пожалуйста, убедитесь, что вы
            получили разрешение на управление WIFI
          </p>
          <br />
          {/* <button onClick={nextStep}>Вперед</button> */}
          <Button appearance="primary" onClick={wifiStep}>
            Добавить с wifi
          </Button>
          <br />
          <Button appearance="secondary">Добавить вручную</Button>
          <br />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
