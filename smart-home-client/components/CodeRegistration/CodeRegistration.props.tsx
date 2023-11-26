import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface CodeRegistrationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: ReactNode;
  email: string;
  password: string;
}
