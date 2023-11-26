"use client";
import * as React from "react";
import styles from "./profile.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Router from "next/router";
import Avatar from "@mui/material/Avatar";

import axios from "axios";
import { useRouter } from "next/router";
import ArrowBlack from "@/public/Down arrow black.svg";
import ArrowWhite from "@/public/Down arrow white.svg";
import CircularIndeterminate from "../loading";
import Image from "next/image";

import SecurityIconWhite from "@/public/profile security-1.svg";
import SecurityIconBlack from "@/public/profile security-2.svg";
import SecurityIconRed from "@/public/profile security-3.svg";

import MobileIconWhite from "@/public/profile mobile-1.svg";
import MobileIconBlack from "@/public/profile mobile-2.svg";
import MobileIconRed from "@/public/profile mobile-3.svg";

import RecovetyIconWhite from "@/public/profile email-1.svg";
import RecovetyIconBlack from "@/public/profile email-2.svg";
import RecovetyIconRed from "@/public/profile email-3.svg";

import GoogleIconWhite from "@/public/profile google-1.svg";
import GoogleIconBlack from "@/public/profile google-2.svg";
import GoogleIconRed from "@/public/profile google-3.svg";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import { Title } from "@/components/Title/Title";
import { Breadcrumbs, Typography } from "@mui/material";

export default function Profile() {
  const { data: session, status, update } = useSession();
  console.log(session);

  // Add google account to session
  const router = useRouter();
  let googleId = router.query.googleId;
  console.log("googleId", googleId);

  const { theme } = useTheme();

  // Inputs
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  async function updateSessionGoogleId() {
    await update({
      ...session,
      user: {
        ...session?.user,
        googleId: googleId,
      },
    });
  }
  if (googleId) {
    updateSessionGoogleId();
    Router.replace(`${process.env.NEXT_PUBLIC_HOSTNAME}/profile`);
  }

  const modifiedEmail = React.useMemo(() => {
    if (session?.user?.email) {
      const [username, domain] = session.user.email.split("@");
      const hiddenUsername = username.charAt(0) + "*".repeat(3);
      return `${hiddenUsername}@${domain}`;
    }
    return "";
  }, [session?.user?.email]);
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Profile" />
        <div className="mainBlock px-20">
          <div className="infoBlock">
            <div className="mt-20">
              <div className="only-desktop">
                <h2>Профиль пользователя</h2>
                <Breadcrumbs aria-label="breadcrumb">
                  <MuiLink underline="hover" color="inherit" href="/">
                    Главная
                  </MuiLink>
                  <Typography fontSize="small">Профиль</Typography>
                </Breadcrumbs>
              </div>
              <br />
              <div className={styles.nameBlock}>
                <div className={styles.avatarName}>
                  <Avatar
                    alt="profile photo"
                    src={session.user.photo}
                    sx={{ width: 56, height: 56 }}
                  />
                  <div className={styles.userName}>
                    <div className={styles.name}>
                      {session.user.firstname} {session.user.lastname}
                    </div>
                    <div className={styles.userEmail}>{modifiedEmail}</div>
                  </div>
                </div>

                <div
                  className={styles.arrowBtn}
                  onClick={() => {
                    Router.replace("/profile/editprofile");
                  }}
                >
                  {theme === "dark" ? <ArrowWhite /> : <ArrowBlack />}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoOther}>
            <div className={styles.infoOtherblock}></div>

            <div className={styles.infoOtherblock}></div>

            <div className={styles.infoOtherblock}></div>
          </div>
          <div className={styles.accountSettings}>
            <h2>Account settings</h2>
            <div className={styles.accountSettingsList}>
              <Link
                className={styles.accountSettingsListItem}
                href="/profile/settings/password"
                passHref
              >
                <div className={styles.settingsListItemIcon}>
                  {theme === "dark" ? (
                    <SecurityIconWhite />
                  ) : (
                    <SecurityIconBlack />
                  )}
                </div>
                <div className={styles.settingsListItemTitle}>Password</div>
                <div className={styles.settingsListItemInfo}>
                  {session.user.passwordExist === true
                    ? "information saved"
                    : "none"}
                </div>
              </Link>

              <Link
                className={styles.accountSettingsListItem}
                href="/profile/settings/mobile"
                passHref
              >
                <div className={styles.settingsListItemIcon}>
                  {theme === "dark" ? <MobileIconWhite /> : <MobileIconBlack />}
                </div>
                <div className={styles.settingsListItemTitle}>Mobile</div>
                <div className={styles.settingsListItemInfo}>
                  {session.user.mobile === null
                    ? "none"
                    : `+${session.user.mobile}`}
                </div>
              </Link>

              <Link
                className={styles.accountSettingsListItem}
                href="/profile/settings/email"
                passHref
              >
                <div className={styles.settingsListItemIcon}>
                  {theme === "dark" ? (
                    <RecovetyIconWhite />
                  ) : (
                    <RecovetyIconBlack />
                  )}
                </div>
                <div className={styles.settingsListItemTitle}>E-mail</div>
                <div className={styles.settingsListItemInfo}>
                  {modifiedEmail}
                </div>
              </Link>

              <Link
                className={styles.accountSettingsListItem}
                href="/profile/settings/google"
                passHref
              >
                <div className={styles.settingsListItemIcon}>
                  {theme === "dark" ? <GoogleIconWhite /> : <GoogleIconBlack />}
                </div>
                <div className={styles.settingsListItemTitle}>
                  Google account
                </div>
                <div className={styles.settingsListItemInfo}>
                  {session.user.googleId === "" ? "None" : "Added"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </SidebarLayout>
    );
  }
  return <CircularIndeterminate />;
}
