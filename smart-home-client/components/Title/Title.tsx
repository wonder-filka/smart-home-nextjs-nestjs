"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import styles from "./Title.module.scss";
import { TitleProps } from "./Title.props";
import BackIcon from "@/public/arrow_back_24px.svg";

export const Title = ({ name, ...props }: TitleProps) => {
  const { theme } = useTheme();
  return (
    <div className={styles.Title}>
      {/* <div className={styles.backBtn}>
        <BackIcon />
      </div> */}
      <span>{name}</span>
      <div className={styles.backBtn}></div>
    </div>
  );
};
