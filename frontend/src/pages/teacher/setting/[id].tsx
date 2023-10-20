import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Input,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import usePreviewLive from "@/hooks/live/usePreviewLive";
import useGetLive from "@/hooks/live/useGetLive";
import useCancelLive from "@/hooks/live/useCancelLive";

import LiveStreamPage from "@/components/live/showVideo";
import { useRouter } from "next/router";

import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { NextUIProvider } from "@nextui-org/react";
import Chatroom from "@/components/chatroom";

export default function Live() {
  const { previewLive } = usePreviewLive();
  const { getLive, liveurl } = useGetLive();
  const { cancelLive } = useCancelLive();
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    previewLive();
  }, []);

  const handleStartLive = () => {
    getLive();
    setIsLive(true);
  };

  const handleEndLive = () => {
    cancelLive();
    setIsLive(false);
  };

  const eventData = {
    live: {
      source: "https://example.com/live-stream",
      type: "LIVE_TYPE_LIVE",
    },
  };
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [isSelected, setIsSelected] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />

      <main className="px-20 w-full flex   flex-row mt-5 gap-5 items-start justify-center">
        <div className="w-1/2 md:7/12 flex-col">
          {/* <LiveStreamPage eventData={eventData} className="bg-gray-500  w-[600px] h-[400px] md:w-full md:h-full" /> */}

          <div className="flex flex-col  w-full h-1/5  md:h-96">
            <div className="bg-gray-500  w-full h-full md:w-full md:h-full"></div>
            <Input
              className={"mt-4"}
              type="直播名稱"
              variant="bordered"
              label="直播名稱"
            />
          </div>
          <Button
            disableRipple
            className={` w-full mt-4 relative overflow-visible  px-12 py-2 shadow-xl  after:content-[''] after:absolute  after:inset-0 text-danger after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
            size="lg"
            color="danger"
            variant="bordered"
            onClick={isLive ? handleEndLive : handleStartLive}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 1.5C9.9233 1.5 7.89323 2.11581 6.16652 3.26957C4.4398 4.42332 3.09399 6.0632 2.29927 7.98182C1.50455 9.90045 1.29661 12.0116 1.70176 14.0484C2.1069 16.0852 3.10693 17.9562 4.57538 19.4246C6.04383 20.8931 7.91476 21.8931 9.95156 22.2982C11.9884 22.7034 14.0996 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3938 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM17.5853 12.6713L8.58525 17.1713C8.47088 17.2284 8.3438 17.2554 8.21607 17.2496C8.08835 17.2438 7.96422 17.2055 7.85548 17.1382C7.74674 17.0709 7.65701 16.977 7.59479 16.8653C7.53257 16.7536 7.49995 16.6279 7.5 16.5V7.5C7.50007 7.37221 7.53279 7.24655 7.59506 7.13495C7.65733 7.02336 7.74708 6.92952 7.8558 6.86235C7.96452 6.79519 8.0886 6.75691 8.21626 6.75116C8.34392 6.74541 8.47094 6.77238 8.58525 6.8295L17.5853 11.3295C17.7097 11.3919 17.8143 11.4876 17.8874 11.606C17.9605 11.7244 17.9992 11.8608 17.9992 12C17.9992 12.1392 17.9605 12.2756 17.8874 12.394C17.8143 12.5124 17.7097 12.6081 17.5853 12.6705V12.6713Z"
                fill="red"
              />
            </svg>
            {isLive ? "結束直播" : "開始直播"}
          </Button>
        </div>

        <div className="w-full  h-1/5  md:w-5/12 flex flex-col gap-4">
          <Chatroom />
        </div>
      </main>
    </>
  );
}
