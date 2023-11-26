"use client";
import * as React from "react";
import styles from "./addcontroller.module.scss";
import { Button } from "@/components/Button/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { ControllerType } from "@/interfaces/controller.interface";
import axios from "axios";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";

export default function AddWifiController() {
  const { data: session } = useSession();
  const controllers = ["45939293ВОАУ", "HE339293ВОАW"];

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();

  const [selectedController, setSelectedController] = useState(null);
  function handleChange(event, value) {
    setSelectedController(value);
  }
  function addController() {
    const data: Partial<ControllerType> = {
      userId: Number(session.user.id),
      name: selectedController,
      systemName: selectedController,
      status: true,
      location: "none",
      guard: true,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/controllers/add`, {
        controller: data,
      })
      .then(function (response) {
        console.log(response);
        setShowModal(true);
        setTimeout(() => {
          Router.replace("/controllers"); // Replace "/another-page" with the desired URL
        }, 2000);
      })
      .catch(function (error) {
        setError(error.response.data.message);
        console.log(error);
      });
  }
  return (
    <>
      <BackBtn rout="controllers/" />
      <Title name="Выберите контроллер" />
      <div className="mainBlock">
        <div className={styles.AddControllerBlock}>
          <h3>Пожалуйста, выберите контроллер из списка</h3>
          <br />
          <div className={styles.userInputs}>
            <Autocomplete
              disablePortal
              className={styles.inputWithList}
              id="combo-box-demo"
              options={controllers}
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Найденные контроллеры"
                  className={styles.inputWithListLabel}
                />
              )}
            />
            <br />
          </div>

          <div className="error">{error}</div>
          <br />
          <Button appearance="primary" onClick={addController}>
            <div className="btnName">Добавить</div>
          </Button>
        </div>
      </div>
      <BottomMenu />
      {showModal && (
        <div className="modalSimple">
          <span>
            <h3>45939293ВОАУ контроллер успешно добавлен!</h3>
          </span>
        </div>
      )}
    </>
  );
}
