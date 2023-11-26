"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Router from "next/router";

import styles from "./ControllersList.module.scss";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/Button/Button";
import Image from "next/dist/client/image";

import controllerImg from "../../public/controller1.jpg";
import ControllerIcon from "@/public/controllerIconBig.png";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function ControllersList({ controllers }) {
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  const [controllersData, setControllersData] = React.useState(controllers);
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
        controller.guard = !controller.guard;
        // Обновите локальное состояние, чтобы отразить изменения
        setControllersData([...controllersData]);
      } else {
        console.log("not super", response.data);
      }
    } catch (error) {
      // Обработайте ошибку, если необходимо
      console.error(error);
    }
  }

  function edit(e) {}

  return (
    <div className={styles.controllersList}>
      {controllersData.map((controller) => (
        <div key={controller.id} className={styles.controllerItem}>
          <div className={styles.controllerWrap}>
            <div className={styles.controllerInfo}>
              <div className={styles.controllerName}>{controller.name}</div>
              <div className={styles.controllerStatus}>
                {controller.status === true ? "online" : "offline"}
              </div>
              <div className={styles.controllerPlace}>
                {controller.location}
              </div>
            </div>

            <div className={styles.controllerTumblerLabel}>
              {controller.guard === true ? "Под охраной" : "Без охраны"}
            </div>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} checked={controller.guard} />}
              label=" "
              labelPlacement="start"
              onChange={() => toggleSwitch(controller)}
            />
          </div>
          <div className={styles.controllersImageItem}>
            {theme === "dark" ? (
              <Image src={ControllerIcon} alt="controller" />
            ) : (
              <Image src={controllerImg} alt="controller" />
            )}
          </div>
          <br />

          <Button
            appearance="ghost"
            className={styles.editController}
            onClick={() => {
              Router.replace(
                `/controllers/${controller.systemName}?id=${session.user.id}`
              );
            }}
          >
            Изменить
          </Button>
        </div>
      ))}
    </div>
  );
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
