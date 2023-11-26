"use client";
import * as React from "react";
import styles from "../styles/page.module.scss";
import SidebarLayout from "../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button } from "@/components/Button/Button";
import Image from "next/dist/client/image";
import { Title } from "@/components/Title/Title";

export default function Home() {
  const { data: session, status } = useSession();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    console.log("session", session);
    return (
      <>
        <SidebarLayout>
          <Title name="Home" />
          <div className="mainBlock">
            {/* <Breadcrumbs aria-label="breadcrumb">
              <Typography fontSize="small">Главная</Typography>
            </Breadcrumbs> */}
            <div className="mainEmpty  pb-20 pt-20">
              <div className="backgroundWhite">
                <h1>No widgets added</h1>
                <br />
                <p className="startPar">
                Controllers or devices haven't been added. 
Please add Quadrobit controllers or devices to include them as widgets on the main screen.
                </p>
              </div>
              <br />
              <Button
                appearance="primary"
                className="addButton"
                onClick={(e) => {
                  Router.replace("./");
                }}
              >
                <div className="btnName">Add</div>
                <div>
                  {" "}
                  <AddIcon />
                </div>
              </Button>
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  }
}
