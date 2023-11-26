import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MenuSecondProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
}
