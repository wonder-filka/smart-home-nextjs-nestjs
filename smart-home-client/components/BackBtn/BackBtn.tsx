"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import styles from "./BackBtn.module.scss";
import { BackBtnProps } from "./BackBtn.props";
import BackIcon from "@/public/arrow_back_24px.svg";
import BackIconWhite from "@/public/arrow_white_24px.svg";
import Link from "next/link";

export const BackBtn = ({ rout, ...props }: BackBtnProps) => {
  const { theme } = useTheme();
  console.log(rout);
  return (
    <Link
      className={styles.BackBtn}
      href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${rout}`}
      passHref
    >
      {theme === "dark" ? <BackIconWhite /> : <BackIcon />}
    </Link>
  );
};
