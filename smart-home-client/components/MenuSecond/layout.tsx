import { MenuSecond } from "./MenuSecond";
import { BottomMenu } from "../BottomMenu/BottomMenu";

export default function MenuSecondLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuSecond />
      {children}

      <BottomMenu />
    </>
  );
}
