"use client";

import React from "react";
import styles from "./Menu.module.scss";
import OptionsIcon from "../../public/Menu options.svg";
import OptionsIconBlack from "../../public/Menu options black.svg";
import MenuList from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "next-themes";

export function Menu() {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={styles.Menu}>
        {theme === "dark" ? (
          <OptionsIcon
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        ) : (
          <OptionsIconBlack
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        )}

        <MenuList
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleClose}>Notification 3</MenuItem>
        </MenuList>
      </div>
    </>
  );
}
