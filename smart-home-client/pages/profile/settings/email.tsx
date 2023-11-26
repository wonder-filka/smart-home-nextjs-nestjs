import styles from "./settings.module.scss";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { Title } from "@/components/Title/Title";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import SidebarLayout from "@/components/Sidebar/layout";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Email() {
  const { data: session, status, update } = useSession();
  const [email, setEmail] = useState("");
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeExport, setCodeExport] = useState(Number);
  const [showModal, setShowModal] = useState(false);

  const inputRefs = useRef([]);
  console.log(code);
  const handleChange = (index, event) => {
    const value = event.target.value;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "") {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  async function updateSessionEmail() {
    await update({
      ...session,
      user: {
        ...session?.user,
        email: email,
      },
    });
  }

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && code[index] === "") {
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  async function sendCode(e) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user/emailcode`,
        {
          user: {
            id: session.user.id,
            email: email,
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      );
      console.log(response);
      if (response.data === true) {
        setIsCodeSend(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveNewEmail(e) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user/save_email`,
        {
          user: {
            id: session.user.id,
            email: email,
            code: codeExport,
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      );
      console.log(response);
      if (response.data) {
        updateSessionEmail();
        setShowModal(true);
        setTimeout(() => {
          Router.replace("/profile"); // Replace "/another-page" with the desired URL
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setCodeExport(Number(code.join("")));
  }, [code]);

  if (session) {
    return (
      <SidebarLayout>
        <Title name="Email" />
        <BottomMenu />
        <div className="mainBlock px-20 mt-20">
          <div className={styles.mainSettingBlock}>
            <div className="only-desktop">
              <h2>Вы хотите изменить имеил?</h2>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Главная
                </Link>
                <Link underline="hover" color="inherit" href="/profile">
                  Профиль
                </Link>
                <Typography fontSize="small">Изменить e-mail</Typography>
              </Breadcrumbs>
              <br />
            </div>
            <p>
              Вы можете изменить e-mail на любой другой вариант. Для этого
              получите код подтверждения.
            </p>
            <br />
            <div className={styles.userInputs}>
              <TextField
                sx={{ width: "100%" }}
                label="Новый e-mail"
                variant="outlined"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {isCodeSend ? (
                <span className={styles.codeSendLabel}>Код отправлен</span>
              ) : (
                <Button
                  appearance="ghost"
                  onClick={sendCode}
                  className={styles.codeBtn}
                >
                  Получить код
                </Button>
              )}
              <h4>Введите код из e-mail</h4>
              <form className={styles.codeForm}>
                {code.map((digit, index) => (
                  <TextField
                    className={styles.codeInput}
                    sx={{ width: "6ch" }}
                    key={index}
                    id={`digit-input-${index}`}
                    variant="outlined"
                    inputProps={{ maxLength: 1 }}
                    value={digit}
                    onChange={(event) => handleChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </form>
            </div>
            <br />
            <br />
            <Button appearance="primary" onClick={saveNewEmail}>
              <div className="btnName">Изменить</div>
            </Button>{" "}
            <br />
            <Button
              appearance="secondary"
              onClick={(e) => {
                Router.replace("/profile");
              }}
            >
              Вернуться назад
            </Button>
            <br />
          </div>
        </div>
        {showModal && (
          <div className="modalSimple">
            <span>
              <h3>E-mail успешно обновлен!</h3>
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
