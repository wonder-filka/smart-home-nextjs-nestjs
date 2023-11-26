import styles from "./settings.module.scss";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { Button } from "@/components/Button/Button";
import { Title } from "@/components/Title/Title";
import { useSession } from "next-auth/react";
import GoogleIcon from "@/public/Google.svg";
import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import SidebarLayout from "@/components/Sidebar/layout";

export default function Google() {
  const { data: session, status, update } = useSession();
  const handleLogin = () => {
    // Создание URL-адреса авторизации
    const clientId =
      "976194357979-pol64ecgghgtuvvcqe3qnf6icshlnn4i.apps.googleusercontent.com";
    const redirectUri = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/user`;
    const scope = "openid profile email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  async function updateSessionGoogleId() {
    await update({
      ...session,
      user: {
        ...session?.user,
        googleId: "",
      },
    });
  }

  function handleDelete(e) {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user`,
        {
          user: {
            googleId: "",
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      )
      .then(function (response) {
        updateSessionGoogleId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Google" />
        <div className="mainBlock  px-20 mt-20">
          <div className="only-desktop">
            <h2>
              {session.user.googleId === ""
                ? "Google Account не привязан"
                : "Google Account привязан"}
            </h2>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Главная
              </Link>
              <Link underline="hover" color="inherit" href="/profile">
                Профиль
              </Link>
              <Typography fontSize="small">Google аккаунт</Typography>
            </Breadcrumbs>
          </div>
          <br />
          <div className={styles.mainSettingBlock}>
            {session.user.googleId === "" ? (
              <div className={styles.emailBlock}>
                <p>
                  Если отвязать Google Account и не создать пароль входа, Вы не
                  сможете зайти в аккаунт
                </p>
                <br />
                <Button
                  appearance="secondary"
                  onClick={handleLogin}
                  color="secondary"
                  className="googleButtonId"
                >
                  <span className={styles.googleButton}>
                    <GoogleIcon />
                    <span className="googleLabel">
                      Привязать Google Account
                    </span>
                  </span>
                </Button>
                <br />
                <Button
                  appearance="secondary"
                  onClick={(e) => {
                    Router.replace("/profile");
                  }}
                >
                  Вернуться назад
                </Button>
              </div>
            ) : (
              <div className={styles.emailBlock}>
                <p>
                  Если отвязать Google Account и не создать пароль входа, Вы не
                  сможете зайти в аккаунт
                </p>
                <br />
                <Button
                  appearance="secondary"
                  onClick={handleDelete}
                  color="secondary"
                  className="googleButtonId"
                >
                  <span className={styles.googleButton}>
                    <GoogleIcon />
                    <span className="googleLabel">Отвязать Google Account</span>
                  </span>
                </Button>
                <br />
                <Button
                  appearance="secondary"
                  onClick={(e) => {
                    Router.replace("/profile");
                  }}
                >
                  Вернуться назад
                </Button>
              </div>
            )}
          </div>
        </div>
        <BottomMenu />
      </SidebarLayout>
    );
  }
}
