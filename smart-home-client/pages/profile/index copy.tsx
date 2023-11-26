"use client";
import * as React from "react";
import styles from "./profile.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Router from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import GoogleIcon from "../../public/Google.svg";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { ButtonGoogle } from "@/components/ButtonGoogle/ButtonGoogle";
import { useRouter } from "next/router";
import ArrowWhite from "@/public/Down arrow white.svg";
import ArrowRed from "@/public/Down arrow red.svg";
import ArrowBlack from "@/public/Down arrow black.svg";
import CircularIndeterminate from "../loading";

export default function Profile() {
  // Session
  const { data: session, status, update } = useSession();
  console.log(session);
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  // Add google account to session
  const router = useRouter();

  // Inputs
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  // Modals state
  const [openName, setOpenName] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);

  const handleClickOpenName = () => {
    setOpenName(true);
  };
  const handleCloseName = () => {
    setOpenName(false);
  };
  const handleClickOpenEmail = () => {
    setOpenEmail(true);
  };
  const handleCloseEmal = () => {
    setOpenEmail(false);
  };
  const handleClickOpenPass = () => {
    setOpenPass(true);
  };
  const handleClosePass = () => {
    setOpenPass(false);
  };

  // Update session
  async function updateSessionName() {
    await update({
      ...session,
      user: {
        ...session?.user,
        firstname: firstName,
        lastname: lastName,
      },
    });
  }

  const updateSessionGoogleId = useCallback(async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        googleId: router.query.googleId,
      },
    });
  }, [update, session, router.query.googleId]);

  async function updateSessionEmail() {
    await update({
      ...session,
      user: {
        ...session?.user,
        email: email,
      },
    });
  }

  async function updateSessionPass() {
    await update({
      ...session,
      user: {
        ...session?.user,
        passwordExist: true,
      },
    });
  }

  // update googleId in session
  useEffect(() => {
    if (
      status === "authenticated" &&
      router.query.googleId !== undefined && // Add this condition
      session?.user?.googleId !== router.query.googleId
    ) {
      updateSessionGoogleId();
    }
  }, [status, session, router.query.googleId, updateSessionGoogleId]);

  // Passwords modal show/down input
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

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

  // Handle submitte
  const handleSubsribeName = () => {
    axios
      .put(
        "http://localhost:3001/user",
        {
          user: {
            firstname: firstName,
            lastname: lastName,
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      )
      .then(function (response) {
        updateSessionName();
        console.log(session);
        setOpenName(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubsribeEmail = () => {
    axios
      .put(
        "http://localhost:3001/user",
        {
          user: {
            email: email,
          },
        },
        {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        }
      )
      .then(function (response) {
        updateSessionEmail();
        console.log(session);
        setOpenEmail(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubsribePass = () => {
    if (password === passwordConfirm) {
    }
    axios
      .put(
        "http://localhost:3001/user",
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
        setOpenPass(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogin = () => {
    // Создание URL-адреса авторизации
    const clientId =
      "976194357979-6kkcn7c4edk7h80blrb5vkiokqfc60u4.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/api/user";
    const scope = "openid profile email";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <div className="mainBlock">
          <div className={styles.infoBlock}>
            <div className={styles.nameBlock}>
              <div className={styles.avatarName}>
                <Avatar
                  alt="profile photo"
                  src="/public/next.svg"
                  sx={{ width: 56, height: 56 }}
                />
                <div className={styles.userName}>
                  <div className={styles.name}>
                    {session.user.firstname} {session.user.lastname}
                  </div>
                  <div className={styles.userEmail}>{session.user.email}</div>
                </div>
              </div>

              <div className={styles.arrowBtn}>
                <ArrowBlack />
              </div>
            </div>
          </div>
          <div className={styles.infoOther}>
            <div className={styles.infoOtherblock}></div>

            <div className={styles.infoOtherblock}></div>

            <div className={styles.infoOtherblock}></div>
          </div>
        </div>
        <div className={styles.infoButtons}>
          <Button
            variant="contained"
            size="large"
            onClick={handleClickOpenName}
            color="secondary"
          >
            Изменить имя
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleClickOpenEmail}
          >
            Изменить e-mail
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleClickOpenPass}
          >
            Изменить пароль
          </Button>
          {session.user.googleId === "" ? (
            <>
              <div className={styles.greyLine}></div>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleLogin}
              >
                <span className={styles.googleButton}>
                  <GoogleIcon />
                  Привязать Google
                </span>
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>

        <Dialog open={openName} onClose={handleCloseName}>
          <DialogTitle>Введите новое имя</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Для изменения т
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="string"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Surname"
              type="string"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseName}>Cancel</Button>
            <Button onClick={handleSubsribeName}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEmail} onClose={handleCloseEmal}>
          <DialogTitle>Введите новый e-mail</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Для изменения т
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="E-mail"
              type="string"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEmal}>Cancel</Button>
            <Button onClick={handleSubsribeEmail}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openPass} onClose={handleClosePass}>
          <DialogTitle>Введите новый пароль</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Для изменения т
            </DialogContentText> */}

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPasswordConfirm ? "text" : "passwordConfirm"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePass}>Cancel</Button>
            <Button onClick={handleSubsribePass}>Submit</Button>
          </DialogActions>
        </Dialog>
      </SidebarLayout>
    );
  }
  return <CircularIndeterminate />;
}
