import styles from "./settings.module.scss";
import SidebarLayout from "@/components/Sidebar/layout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import { BackBtn } from "@/components/BackBtn/BackBtn";
import { Title } from "@/components/Title/Title";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { Breadcrumbs, Typography, Link } from "@mui/material";

export default function Password() {
  const { data: session, status, update } = useSession();
  console.log("session.user", session);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordLabel, setOldPasswordLabel] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showModal, setShowModal] = useState(false);
  // Passwords modal show/down input
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownOldPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleMouseDownPasswordConfirm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function updateSessionPass() {
    await update({
      ...session,
      user: {
        ...session?.user,
        passwordExist: true,
      },
    });
  }

  const handleSubsribePass = () => {
    if (password === passwordConfirm) {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user`,
          {
            user: {
              password: password,
            },
          },
          {
            headers: {
              Authorization: `Token ${session.user.token}`,
            },
          }
        )
        .then(function (response) {
          updateSessionPass();
          setShowModal(true);
          setTimeout(() => {
            Router.replace("/profile"); // Replace "/another-page" with the desired URL
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleSubsribeChangePass = () => {
    if (password === passwordConfirm) {
      setOldPasswordLabel("");
      setPasswordLabel("");
      axios
        .post(
          `${process.env.NEXT_PUBLIC_HOSTBACKEND}/user/changepass`,
          {
            user: {
              id: session.user.id,
              password: oldPassword,
              newPassword: password,
            },
          },
          {
            headers: {
              Authorization: `Token ${session.user.token}`,
            },
          }
        )
        .then(function (response) {
          updateSessionPass();
          setShowModal(true);
          setTimeout(() => {
            Router.replace("/profile"); // Replace "/another-page" with the desired URL
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
          setOldPasswordLabel(error.response.data.message);
        });
    } else {
      setPasswordLabel("Пароли не совпадают");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Change password" />
        <div className="mainBlock px-20 mt-20">
          <div className="only-desktop">
            <h2>
              {session.user.passwordExist === false
                ? "Создайте пароль"
                : "Изменить пароль"}
            </h2>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Главная
              </Link>
              <Link underline="hover" color="inherit" href="/profile">
                Профиль
              </Link>
              <Typography fontSize="small">Задать пароль</Typography>
            </Breadcrumbs>
          </div>
          <br />
          <div className={styles.mainSettingBlock}>
            {session.user.passwordExist === false ? (
              <>
                <p>Создайте пароль для удобного входа в аккаунт</p>
                <br />
                <div className={styles.newPass}>
                  <div className={styles.userInputs}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordConfirm ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {showPasswordConfirm ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <br />
                  <Button appearance="primary" onClick={handleSubsribePass}>
                    Submit
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
              </>
            ) : (
              <>
                <p>Вы можете изменить существующий пароль</p>
                <br />
                <div className={styles.userInputs}>
                  <div className={styles.inputsPass}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Current password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showOldPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowOldPassword}
                              onMouseDown={handleMouseDownOldPassword}
                              edge="end"
                            >
                              {showOldPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={oldPassword}
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <span className="error">{oldPasswordLabel}</span>
                    <br />
                    <br />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordConfirm ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {showPasswordConfirm ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />
                    </FormControl>
                    <span className="error">{passwordLabel}</span>
                  </div>
                  <br />
                  <Button
                    appearance="primary"
                    onClick={handleSubsribeChangePass}
                  >
                    Submit
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
              </>
            )}
          </div>
        </div>
        {showModal && (
          <div className="modalSimple">
            <span>
              <h3>Пароль успешно обновлен!</h3>
            </span>
          </div>
        )}
      </SidebarLayout>
    );
  }
}
