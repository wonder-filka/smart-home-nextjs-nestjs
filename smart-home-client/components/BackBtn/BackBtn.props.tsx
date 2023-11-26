import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

export interface BackBtnProps
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> {
  rout: string;
}
