import styles from "./AddControllerSteps.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@/components/Button/Button";
import { useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { ControllerType } from "@/interfaces/controller.interface";
import axios from "axios";

const controllers = ["45939293ВОАУ", "HE339293ВОАW"];

export const Step4AddController = ({ prevStep = () => {} }) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();

  const [selectedController, setSelectedController] = useState(null);
  function handleChange(event, value) {
    setSelectedController(value);
  }

  console.log(selectedController);
  console.log(typeof selectedController);

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
      .post("http://localhost:3001/controllers/add", {
        controller: data,
      })
      .then(function (response) {
        console.log(response);
        setShowModal(true);
        setTimeout(() => {
          Router.replace("http://localhost:3000/controllers"); // Replace "/another-page" with the desired URL
        }, 2000);
      })
      .catch(function (error) {
        setError(error.response.data.message);
        console.log(error);
      });
  }

  return (
    <div className={styles.AddController1}>
      <p>Пожалуйста, выберите контроллер из списка.</p>
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
      </div>
      <span className={styles.errorLabel}>{error}</span>
      <br />
      <Button appearance="primary" onClick={addController}>
        <div className="btnName">Добавить</div>
      </Button>

      {showModal && (
        <div className="modalSimple">
          <span>
            <h3>45939293ВОАУ контроллер успешно добавлен!</h3>
          </span>
        </div>
      )}
      {/* <button onClick={prevStep}>Назад</button>
    <button onClick={nextStep}>Вперед</button> */}
    </div>
  );
};
