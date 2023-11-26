"use client";

import * as React from "react";
import styles from "./BottomMenu.module.scss";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import LogoWhite from "@/public/logo_small_white.svg";
import LogoRed from "@/public/logo_small_red.svg";
import DevicesWhite from "@/public/bottom menu device white.svg";
import DevicesGrey from "@/public/bottom menu device grey.svg";
import DevicesRed from "@/public/bottom menu device red.svg";

import ControllerWhite from "@/public/bottom menu controller white.svg";
import ControllerGrey from "@/public/bottom menu controller grey.svg";
import ControllerRed from "@/public/bottom menu controller red.svg";

import EventsWhite from "@/public/bottom menu events white.svg";
import EventsGrey from "@/public/bottom menu events grey.svg";
import EventsRed from "@/public/bottom menu events red.svg";

import SettingsWhite from "@/public/bottom menu settings white.svg";
import SettingsGrey from "@/public/bottom menu settings grey.svg";
import SettingsRed from "@/public/bottom menu settings red.svg";

import LogoBtnWhite from "@/public/button logo white.svg";
import LogoBtnRed from "@/public/button logo red.svg";

export function BottomMenu() {
  const router = useRouter();
  const { theme } = useTheme();

  // const getFillForIcon = (path) => {
  //   if (router.asPath.includes(path)) {
  //     return "#9a1a1e"; // Если текущий путь содержит "controllers" или "devices" или "calendar", то возвращаем "#bf0b00"
  //   }
  //   return "#888888"; // Возвращаем стандартный цвет fill
  // };

  return (
    <div className={styles.BottomMenu}>
      <Link
        className={styles.BottonMenuItem}
        href={`${process.env.NEXT_PUBLIC_HOSTNAME}/devices`}
        passHref
      >
        <div className={styles.BottonMenuIcon}>
          {router.asPath.includes("devices") ? (
            <DevicesRed />
          ) : theme === "dark" ? (
            <DevicesWhite />
          ) : (
            <DevicesGrey />
          )}
        </div>
        <div
          className={`${styles.BottonMenuTitle} ${
            router.asPath.includes("devices")
              ? styles.activeTitle
              : styles.inactiveTitle
          }`}
        >
          Devices
        </div>
      </Link>

      <Link
        className={styles.BottonMenuItem}
        href={`${process.env.NEXT_PUBLIC_HOSTNAME}/controllers`}
        passHref
      >
        <div className={styles.BottonMenuIcon}>
          {router.asPath.includes("controllers") ? (
            <ControllerRed />
          ) : theme === "dark" ? (
            <ControllerWhite />
          ) : (
            <ControllerGrey />
          )}
        </div>
        <div
          className={`${styles.BottonMenuTitle} ${
            router.asPath.includes("controllers")
              ? styles.activeTitle
              : styles.inactiveTitle
          }`}
        >
          Controllers
        </div>
      </Link>

      <Link
        className={styles.BottonMenuItem}
        href={`${process.env.NEXT_PUBLIC_HOSTNAME}`}
        passHref
      >
        <div className={styles.BottonMenuIcon}>
          {theme === "dark" ? <LogoBtnWhite /> : <LogoBtnRed />}
        </div>
      </Link>

      <Link
        className={styles.BottonMenuItem}
        href={`${process.env.NEXT_PUBLIC_HOSTNAME}/events`}
        passHref
      >
        <div className={styles.BottonMenuIcon}>
          {router.asPath.includes("events") ? (
            <EventsRed />
          ) : theme === "dark" ? (
            <EventsWhite />
          ) : (
            <EventsGrey />
          )}
        </div>
        <div
          className={`${styles.BottonMenuTitle} ${
            router.asPath.includes("events")
              ? styles.activeTitle
              : styles.inactiveTitle
          }`}
        >
          Events
        </div>
      </Link>

      <Link
        className={styles.BottonMenuItem}
        href={`${process.env.NEXT_PUBLIC_HOSTNAME}/settings`}
        passHref
      >
        <div className={styles.BottonMenuIcon}>
          {router.asPath.includes("settings") ? (
            <SettingsRed />
          ) : theme === "dark" ? (
            <SettingsWhite />
          ) : (
            <SettingsGrey />
          )}
        </div>
        <div
          className={`${styles.BottonMenuTitle} ${
            router.asPath.includes("settings")
              ? styles.activeTitle
              : styles.inactiveTitle
          }`}
        >
          Settings
        </div>
      </Link>
    </div>
  );
}
