"use client";
import * as React from "react";
import styles from "./cameras.module.scss";
import SidebarLayout from "../../components/Sidebar/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Title } from "@/components/Title/Title";

export default function Cameras() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <SidebarLayout>
        <Title name="Comeras" />
        <div className="mainBlock">
          <div className="mainImg">
            {/* <Image src="/controller.jpg" alt="Picture of the author" fill /> */}
          </div>
          <h1>Cameras</h1>
        </div>
      </SidebarLayout>
    );
  }
}
