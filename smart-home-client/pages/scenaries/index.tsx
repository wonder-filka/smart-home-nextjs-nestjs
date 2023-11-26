"use client";
import * as React from "react";
import styles from "./scenaries.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@/components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { Title } from "@/components/Title/Title";

export default function Scenaries() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Scenaries" />
        <div className="mainBlock">
          <div className="mainEmpty pb-20 pt-20">
            <div className="backgroundWhite">
              <h1>Scenaries</h1>
              <p className="startPar">
                Управляйте умным домом с помощью сценариев. Настраивайте
                сценарии для одного устройства или группы устройств. Перед тем
                как управлять сценариями вам нужно добавить контроллер и
                устройство
              </p>
              <br />
            </div>
            <Button appearance="primary" className="addButton">
              <div className="btnName">Добавить</div>
              <AddIcon />
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }
}
