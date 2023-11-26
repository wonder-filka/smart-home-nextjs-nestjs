import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  name: string;
}
