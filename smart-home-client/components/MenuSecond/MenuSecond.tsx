"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import styles from "./MenuSecond.module.scss";
import ArrowBlack from "@/public/arrow_back_24px.svg";
import ArrowWhite from "@/public/arrow_white_24px.svg";

export function MenuSecond() {
  const router = useRouter();
  const { theme } = useTheme();

  // const getFillForIcon = (path) => {
  //   if (router.asPath.includes(path)) {
  //     return "#9a1a1e"; // Если текущий путь содержит "controllers" или "devices" или "calendar", то возвращаем "#bf0b00"
  //   }
  //   return "#888888"; // Возвращаем стандартный цвет fill
  // };

  return (
    <div className={styles.MenuSecond}>
      <div className={styles.arrow}>
        {theme === "dark" ? <ArrowWhite /> : <ArrowBlack />}
      </div>
      <h2>Title</h2>
      <div className={styles.emptyBlock}></div>
    </div>
  );
}
