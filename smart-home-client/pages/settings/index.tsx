"use client";
import * as React from "react";
import styles from "./settings.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "next-themes";
import { Title } from "@/components/Title/Title";

export default function Settings() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Settings" />
        <div className="mainBlock">
          <div className="mainEmpty pb-20 pt-20">
            <div className={styles.settings}>
              <h1>Settings</h1>
              <div className={styles.version}>App version 1.0.1</div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </SidebarLayout>
    );
  }
}
