import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonGoogleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}
