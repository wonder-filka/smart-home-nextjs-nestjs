"use client";
import * as React from "react";
import styles from "./places.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@/components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { Title } from "@/components/Title/Title";

export default function Places() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Places" />
        <div className="mainBlock">
          <div className="mainEmpty pb-20 pt-20">
            <div className="backgroundWhite">
              <h1>Places</h1>
              <p className="startPar">
                Устройства могут быть сгруппированы в местах. Объедините их, как
                вы хотите: в одном доме или комнате, только часть комнаты и т.д.
                Нажмите на Кнопку ниже, чтобы добавить место.
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
