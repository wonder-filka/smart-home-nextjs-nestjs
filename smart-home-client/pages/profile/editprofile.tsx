import styles from "./profile.module.scss";
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

export default function EditProfile() {
  const { data: session, status, update } = useSession();

  const [showModal, setShowModal] = useState(false);

  if (session) {
    return (
      <SidebarLayout>
        <Title name="Edit profile" />
        <BottomMenu />
        <div className="mainBlock  px-20 mt-20">
          <div className={styles.mainSettingBlock}>
            <div className="only-desktop">
              <h2>Изменить профиль</h2>
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
