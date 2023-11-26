"use client";

import React from "react";
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { Drawer } from "@mui/material";
import CloseIcon from "../../public/close.svg";
import LogoIcon from "../../public/logo_small_white.svg";
import ControllersIconBlack from "../../public/Menu controllers black.svg";
import ControllersIcon from "../../public/Menu controllers.svg";
import DevicesIconBlack from "../../public/Menu devices black.svg";
import DevicesIcon from "../../public/Menu devices.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface MenuItem {
  href: string;
  title: string;
  iconOpen: React.ReactNode;
  iconClose: React.ReactNode;
}

function logOut(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  e.preventDefault();
  localStorage.removeItem("Token");
  localStorage.removeItem("token");
  signOut();
}

export function Sidebar() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: MenuItem[] = [
    {
      href: "/",
      title: "home",
      iconOpen: <HomeOutlinedIcon sx={{ fontSize: 28 }} />,
      iconClose: (
        <HomeOutlinedIcon sx={{ fontSize: 28 }} style={{ fill: "#fff" }} />
      ),
    },
    {
      href: "/controllers",
      title: "controllers",
      iconOpen:
        theme === "dark" ? <ControllersIcon /> : <ControllersIconBlack />,
      iconClose: <ControllersIcon />,
    },
    {
      href: "/devices",
      title: "devices",
      iconOpen: theme === "dark" ? <DevicesIcon /> : <DevicesIconBlack />,
      iconClose: <DevicesIcon />,
    },
    // {
    //   href: "/cameras",
    //   title: "cameras",
    //   iconOpen: <VideocamOutlinedIcon sx={{ fontSize: 28 }} />,
    //   iconClose: <VideocamOutlinedIcon color="secondary" sx={{ fontSize: 28 }} />,
    // },
    {
      href: "/places",
      title: "places",
      iconOpen: <LocationOnOutlinedIcon sx={{ fontSize: 28 }} />,
      iconClose: (
        <LocationOnOutlinedIcon
          sx={{ fontSize: 28 }}
          style={{ fill: "#fff" }}
        />
      ),
    },
    {
      href: "/scenaries",
      title: "scenaries",
      iconOpen: <ChecklistRtlIcon sx={{ fontSize: 28 }} />,
      iconClose: (
        <ChecklistRtlIcon sx={{ fontSize: 28 }} style={{ fill: "#fff" }} />
      ),
    },
    {
      href: "/events",
      title: "events",
      iconOpen: <EventOutlinedIcon sx={{ fontSize: 28 }} />,
      iconClose: (
        <EventOutlinedIcon sx={{ fontSize: 28 }} style={{ fill: "#fff" }} />
      ),
    },
  ];

  return (
    <>
      <div className={styles.navBarClose}>
        <div
          className={styles.menuBtn}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className={styles.menuBtnLine}></div>
          <div className={styles.menuBtnLine}></div>
          <div className={styles.menuBtnLine}></div>
        </div>
        <ul>
          {menuItems.map(({ href, title, iconClose }) => (
            <li key={title}>
              <Link href={href} className={styles.menuItem} passHref>
                <span>{iconClose}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.greyLine}></div>
        <ul>
          <li>
            <Link href="/profile" className={styles.menuItem} passHref>
              <span className={styles.icon}>
                <PersonOutlineOutlinedIcon
                  sx={{ fontSize: 28 }}
                  style={{ fill: "#fff" }}
                />
              </span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles.menuItem} passHref>
              <span className={styles.icon}>
                <SettingsOutlinedIcon
                  style={{ fill: "#fff" }}
                  sx={{ fontSize: 28 }}
                />
              </span>
            </Link>
          </li>
          <li>
            <Link href="./" className={styles.menuItem} passHref>
              <span className={styles.icon} onClick={logOut}>
                <LogoutIcon sx={{ fontSize: 28 }} style={{ fill: "#fff" }} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleNavbar}
        className={styles.navBarWrap}
      >
        <div className={styles.navBar}>
          <div className={styles.greetPartMenu}>
            <div className={styles.firstMenu}>
              <LogoIcon />
            </div>
            <div className={styles.firstMenu}>
              <span>Hello</span>
              <br />
              <span>{session?.user?.name}</span>
            </div>
            <div className={styles.firstMenu}>
              <CloseIcon onClick={() => setIsOpen(false)} />
              {/* <CloseIcon /> */}
            </div>
          </div>
          <div className={styles.NavMenu}>
            <ul>
              {menuItems.map(({ href, title, iconOpen }) => (
                <li key={title}>
                  <Link href={href} className={styles.menuItem} passHref>
                    <span className={styles.icon}>{iconOpen}</span>
                    <span className={styles.menuItemText}>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.greyLine}></div>
            <ul>
              <li>
                <Link href="/profile" className={styles.menuItem} passHref>
                  <span className={styles.icon}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 28 }} />
                  </span>
                  <span className={styles.menuItemText}>profile</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className={styles.menuItem} passHref>
                  <span className={styles.icon}>
                    <SettingsOutlinedIcon sx={{ fontSize: 28 }} />
                  </span>
                  <span className={styles.menuItemText}>settings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="./"
                  className={styles.menuItem}
                  onClick={logOut}
                  passHref
                >
                  <span className={styles.icon}>
                    <LogoutIcon sx={{ fontSize: 28 }} />
                  </span>
                  <span className={styles.menuItemText}>log out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
}
