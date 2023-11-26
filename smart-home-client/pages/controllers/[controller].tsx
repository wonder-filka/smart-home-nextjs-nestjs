import React, { useState } from "react";
import styles from "./controllers.module.scss";
import { useRouter } from "next/router";
import { Title } from "@/components/Title/Title";
import SidebarLayout from "@/components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Breadcrumbs, FormControlLabel, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Button } from "@/components/Button/Button";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Controller() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const router = useRouter();
  let [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [controllerData, setControllerData] = useState({
    id: null,
    userId: null,
    name: "",
    systemName: "",
    status: true,
    location: "",
    guard: true,
  });

  console.log(controllerData);
  function getControllerData(response) {
    setControllerData({
      id: response.id,
      userId: response.userId,
      name: response.name,
      systemName: response.systemName,
      status: response.status,
      location: response.location,
      guard: response.guard,
    });
    setLoaded(true);
  }

  function search() {
    let controllerUrl = `${process.env.NEXT_PUBLIC_HOSTBACKEND}/controllers/find`;
    axios
      .post(controllerUrl, {
        controller: {
          userId: router.query.id,
          systemName: router.query.controller,
        },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          getControllerData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleSwitch(controller) {
    updateController(controller);
  }

  async function updateController(controller) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/controllers/edit`,

        {
          controller: {
            userId: session.user.id,
            systemName: controller.systemName,
            guard: !controller.guard,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log("not super", response.data);
      }
    } catch (error) {
      // Обработайте ошибку, если необходимо
      console.error(error);
    }
  }

  function handleSaveController(e) {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/controllers/edit`,

        {
          controller: {
            userId: session.user.id,
            systemName: controllerData.systemName,
            name: controllerData.name,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setShowModal(true);
          setTimeout(() => {
            Router.replace("/controllers"); // Replace "/another-page" with the desired URL
          }, 2000);
        } else {
          console.log("not super", response.data);
        }
      });
  }

  if (loaded) {
    return (
      <SidebarLayout>
        <Title name="Изменить контроллер" />
        <div className="mainBlock mt-20 px-20">
          <div className="only-desktop">
            <h2>Контроллер {router.query.controller}</h2>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink underline="hover" color="inherit" href="/">
                Главная
              </MuiLink>
              <MuiLink underline="hover" color="inherit" href="/profile">
                Контроллеры
              </MuiLink>
              <Typography fontSize="small">
                {router.query.controller}
              </Typography>
            </Breadcrumbs>
          </div>
          <br />
          <p></p>
          <br />
          <div className={styles.controllerInfo}>
            <p>Редактируйте данные контроллера</p>
            <br />
            <div className={styles.userInputs}>
              <FormGroup>
                <TextField
                  sx={{ width: "100%" }}
                  label="Имя контроллера"
                  variant="outlined"
                  value={controllerData.name}
                  onChange={(e) => {
                    setControllerData({
                      ...controllerData,
                      name: e.target.value,
                    });
                  }}
                />
                <br />
                <div className={styles.controllerSwitch}>
                  <div className={styles.controllerSwitchLabel}>
                    {controllerData.guard === true
                      ? "Под охраной"
                      : "Без охраны"}
                  </div>
                  <FormControlLabel
                    control={
                      <IOSSwitch sx={{ m: 1 }} checked={controllerData.guard} />
                    }
                    label=" "
                    labelPlacement="start"
                    onChange={() => toggleSwitch(controllerData)}
                  />
                </div>
                <br />
              </FormGroup>
              <br />
              <Button appearance="primary" onClick={handleSaveController}>
                <div className="btnName">Сохранить</div>
              </Button>
              <br />
              <Button
                appearance="secondary"
                onClick={(e) => {
                  Router.replace("/controllers");
                }}
              >
                Вернуться назад
              </Button>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modalSimple">
            <span>
              <h3>Контроллер успешно обновлен!</h3>
            </span>
          </div>
        )}
      </SidebarLayout>
    );
  } else {
    search();
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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
