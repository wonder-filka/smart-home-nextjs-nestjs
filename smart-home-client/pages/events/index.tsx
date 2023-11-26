"use client";
import * as React from "react";
// import styles from "./calendar.module.scss";
import styles from "../../styles/page.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@/components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { Title } from "@/components/Title/Title";

export default function Events() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Events" />
        <div className="mainBlock">
          <div className="mainEmpty pb-20 pt-20">
            <div className="backgroundWhite">
              <h1>Нет добавленных событий</h1>
              <p className="startPar">
                События будут отображаться здесь, как только вы их получите
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
