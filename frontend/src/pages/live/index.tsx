import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { NextUIProvider } from "@nextui-org/react";
export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
}
export default function Live() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className={`${theme} text-foreground bg-background`}>
        <main
          className="p-10 w-full h-screen flex 
                        flex-col justify-start gap-8 md:flex-row md:justify-around"
        >
          <div className="bg-gray-500  w-full h-1/5 md:w-6/12 md:h-3/5"></div>
          <Card className="max-w-[400px] h-36 border-l-5 border-mainBlue">
            <CardHeader className="flex gap-3">
              <h2 className="text-mainBlue text-xl font-bold">重要消息</h2>
            </CardHeader>

            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </main>
      </div>
    </>
  );
}
