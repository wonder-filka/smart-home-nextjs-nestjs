"use client";
import * as React from "react";
import styles from "./devices.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import devicesImg from "../../public/devicesBig.png";
import devicesImgWhite from "../../public/devicesBigWhite.png";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "next-themes";
import { Title } from "@/components/Title/Title";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Devices() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  const [devices, setDevices] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
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

    return (
      <SidebarLayout>
        <Title name="Devices" />
        {/* <div>
            <Image src={devicesImg} alt="devices" />
          </div> */}
        <div className="mainBlock">
          {devices.length === 0 ? (
            <div className="mainEmpty pb-20 pt-20">
              <div className="backgroundWhite">
                <h1>No devices added</h1>
                <br />
                <p className="startPar">
                A controller is a vital device in the Quarobit system. Add it in a simple and convenient way to get started
                </p>
                <br />
                <div className="mainImg">
                  {theme === "dark" ? (
                    <Image src={devicesImg} alt="controller" />
                  ) : (
                    <Image src={devicesImgWhite} alt="controller" />
                  )}
                </div>
              </div>
              <br />
              <Button
                appearance="primary"
                className="addButton"
                onClick={() => {
                  Router.replace("/devices/add");
                }}
              >
                <div className="btnName">Add</div>
                <AddIcon />
              </Button>
            </div>
          ) : (
            <div className={styles.devices}>
              <div>Devices list</div>
            </div>
          )}
        </div>
      </SidebarLayout>
    );
  }
}
