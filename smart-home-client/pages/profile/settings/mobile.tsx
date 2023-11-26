import styles from "./settings.module.scss";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { Title } from "@/components/Title/Title";
import { useSession } from "next-auth/react";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import Router from "next/router";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import SidebarLayout from "@/components/Sidebar/layout";

export default function Mobile() {
  const { data: session, status, update } = useSession();
  const [phone, setPhone] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };
  console.log(phone);
  async function updateSessionMobile() {
    const cleanedPhone = phone
      .replace("+", "")
      .replace(" ", "")
      .replace(" ", "");
    await update({
      ...session,
      user: {
        ...session?.user,
        mobile: cleanedPhone,
      },
    });
  }

  function handleAddMobile(e) {
    const cleanedPhone = phone
      .replace("+", "")
      .replace(" ", "")
      .replace(" ", "");
    console.log("cleanedPhone", cleanedPhone);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user`,
        {
          user: {
            mobile: cleanedPhone,
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      )
      .then(function (response) {
        updateSessionMobile();
        setShowModal(true);
        setTimeout(() => {
          Router.replace("/profile"); // Replace "/another-page" with the desired URL
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (session) {
    return (
      <SidebarLayout>
        <Title name="Mobile" />
        <BottomMenu />
        <div className="mainBlock  px-20 mt-20">
          <div className={styles.mainSettingBlock}>
            <div className="only-desktop">
              <h2>
                {session.user.mobile !== null
                  ? "Do you wanna change your mobile number?"
                  : "Add mobile number"}
              </h2>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Главная
                </Link>
                <Link underline="hover" color="inherit" href="/profile">
                  Профиль
                </Link>
                <Typography fontSize="small">Мобильный номер</Typography>
              </Breadcrumbs>
            </div>
            {session.user.mobile === null ? (
              <>
                <br />
                <p>
                  Вы можете добавить мобильный номер для получения
                  SMS-уведомлений на мобильный номер
                </p>
                <br />
                <div className={styles.userInputs}>
                  <MuiTelInput value={phone} onChange={handleChange} />
                </div>
                <br />
                <br />
                <Button appearance="primary" onClick={handleAddMobile}>
                  <div className="btnName">Добавить</div>
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
              </>
            ) : (
              <>
                <div className={styles.mainSettingBlock}>
                  <div className={styles.userInputs}>
                    <br />
                    <br />
                    <MuiTelInput value={phone} onChange={handleChange} />
                    <br />
                    <br />
                    <Button appearance="primary" onClick={handleAddMobile}>
                      <div className="btnName">Добавить</div>
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
                </div>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <div className="modalSimple">
            <span>
              <h3>Мобильный успешно обновлен!</h3>
            </span>
          </div>
        )}
      </SidebarLayout>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
}
