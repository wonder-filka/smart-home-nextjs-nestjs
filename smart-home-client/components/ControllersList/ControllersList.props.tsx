import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ControllersList
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
}
