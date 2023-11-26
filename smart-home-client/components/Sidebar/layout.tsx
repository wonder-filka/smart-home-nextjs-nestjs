import { Sidebar } from "./Sidebar";
import { Menu } from "../Menu/Menu";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { Title } from "../Title/Title";

export default function SidebarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Menu />
      {children}
      <BottomMenu />
    </>
  );
}
