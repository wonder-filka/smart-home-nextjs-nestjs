import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./controllers.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { ControllersList } from "@/components/ControllersList/ControllersList";
import { Button } from "@/components/Button/Button";
import Image from "next/dist/client/image";
import AddIcon from "@mui/icons-material/Add";
import controllerImg from "../../public/controller1.jpg";
import ControllerIcon from "@/public/controllerIconBig.png";
import { useTheme } from "next-themes";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ControllerType } from "@/interfaces/controller.interface";
import { Title } from "@/components/Title/Title";
import { Breadcrumbs, Link, Typography } from "@mui/material";

type ControllerList = ControllerType[];

export default function Controllers() {
  const { data: session, status } = useSession();
  console.log("session", session);
  const { theme } = useTheme();

  const [controllers, setControllers] = React.useState<ControllerList>([]);
  const [loaded, setLoaded] = React.useState(false);

  function getControllers() {
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
          console.log("controller List", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setControllers([]);
        setLoaded(true);
      });
  }

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

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

  if (status === "authenticated") {
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
    console.log(controllers);
    return (
      <SidebarLayout>
        <Title name="Controllers" />
        <div className="mainBlock px-20">
          {controllers.length === 0 ? (
            <div className="mainBlock">
              <div className="mainEmpty  pb-20 pt-20">
                <div className="backgroundWhite">
                  <h1>Нет добавленных контроллеров</h1>
                  <br />
                  <p className="startPar">
                    Контроллер является ключевым устройством системы Quarobit.
                    Добавьте его простым и удобным способом для начала работы.
                  </p>
                  <br />
                  <div className="mainImg">
                    {theme === "dark" ? (
                      <Image src={ControllerIcon} alt="controller" />
                    ) : (
                      <Image src={controllerImg} alt="controller" />
                    )}
                  </div>
                  <br />
                </div>
                <Button
                  appearance="primary"
                  className="addButton"
                  onClick={(e) => {
                    Router.replace("./controllers/add");
                  }}
                >
                  <div className="btnName">Добавить</div>
                  <AddIcon />
                </Button>
              </div>
            </div>
          ) : (
            <div className="infoBlock">
              <div className="mt-20 pb-20">
                <div className="only-desktop">
                  <h2>Список контроллеров</h2>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                      Главная
                    </Link>

                    <Typography fontSize="small">Контроллеры</Typography>
                  </Breadcrumbs>
                </div>

                <br />
                <ControllersList controllers={controllers} />
                <Button
                  appearance="primary"
                  className="addButton"
                  onClick={(e) => {
                    Router.replace("./controllers/add");
                  }}
                >
                  <div className="btnName">Добавить</div>
                  <AddIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
      </SidebarLayout>
    );
  } else {
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
}
