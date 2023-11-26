import * as React from "react";
import styles from "./addcontroller.module.scss";
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
import Image from "next/dist/client/image";
import controllerImg from "@/public/controller1.jpg";
import ControllerIcon from "@/public/controllerIconBig.png";
import { useRouter } from "next/router";

export default function AddDevise() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [controllers, setControllers] = useState([]);

  const [selectController, setSelectController] = useState({
    id: null,
    userID: null,
    name: "",
    systemName: "",
    status: false,
    location: "",
    guard: false,
  });
  const [loaded, setLoaded] = useState(false);
  console.log(selectController);
  function nextStep(e) {
    router.replace({
      pathname: "/devices/add/method",
      query: selectController,
    });
  }
  function prevStep(e) {
    Router.replace("/devices/");
  }

  useEffect(() => {
    const getControllers = () => {
      axios
        .post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/controllers/all`, {
          userId: {
            userId: session?.user?.id,
          },
        })
        .then((response) => {
          if (response.data) {
            setControllers(response.data);
            setLoaded(true);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setControllers([]);
          setLoaded(true);
        });
    };

    if (session?.user) {
      getControllers();
    }
  }, [session?.user]);
  if (!loaded) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <BackBtn rout="devices" />
      <Title name="Добавить устройство" />
      <div className="mainBlock mt-20">
        <div className="block-without-layout">
          <h3>Выберите контроллер</h3>
          <br />
          <p>Для управления устройством, Вы должны выбрать контроллер.</p>
          <br />
          <div className="grid-block">
            {controllers !== null ? (
              controllers.map((controller) => (
                <div
                  key={controller.id}
                  className={`grid-item ${
                    controller.systemName === selectController.systemName
                      ? "green-border"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectController(controller);
                  }}
                >
                  <div className="grid-img">
                    {theme === "dark" ? (
                      <Image
                        src={ControllerIcon}
                        alt="controller"
                        priority={true}
                      />
                    ) : (
                      <Image
                        src={controllerImg}
                        alt="controller"
                        priority={false}
                      />
                    )}
                  </div>
                  <div className="grid-info">
                    <h4>{controller.name}</h4>
                    <div
                      className={`grid-item-status ${
                        controller.status === true ? "green-text" : "red-text"
                      }`}
                    >
                      {controller.status === true ? "online" : "offline"}
                    </div>
                    <div className="grid-item-place">
                      Место: {controller.location}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Нет добавленных контроллеров</p>
            )}
          </div>

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
