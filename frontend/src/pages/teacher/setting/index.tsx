import React, { useState } from "react";
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

import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { NextUIProvider } from "@nextui-org/react";

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
];

export default function Live() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className={`${theme} text-foreground bg-background`}>
        <div
          className="px-20 w-full flex 
                        flex-col "
        >
          <main
            className=" w-full  flex 
                        flex-col justify-start gap-8 md:flex-row md:justify-around"
          >
            <div className="flex flex-col  w-full h-1/5 md:w-6/12 md:h-96">
              <div className="bg-gray-500  w-full h-4/5 md:w-full md:h-full"></div>
              <Button
                disableRipple
                className={` mt-4 relative overflow-visible  px-12 py-2 shadow-xl  after:content-[''] after:absolute  after:inset-0 
                                            text-danger
                                        } after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
                size="lg"
                color="danger"
                variant="bordered"
              >
                開始直播
              </Button>
              <Input
                className={"mt-4"}
                type="直播名稱"
                variant="bordered"
                label="直播名稱"
              />
            </div>

            <div className="w-full  h-1/5  md:h-96 md:w-4/12 flex flex-col gap-4">
              <Card className=" h-1/2 border-l-5 border-mainGreen">
                <CardHeader className="flex gap-3 justify-between">
                  <h2 className="text-mainGreen text-xl font-bold ">
                    重要公告
                  </h2>
                  <p className="text-gray-300 items-end justify-end flex flex-col"></p>
                </CardHeader>

                <CardBody>
                  <p>Make beautiful websites regardless</p>
                </CardBody>
              </Card>
              <Card className=" border-l-5 border-mainBlue h-full">
                <CardHeader className="flex gap-3">
                  <h2 className="text-mainBlue text-xl font-bold">
                    作業繳交情況
                  </h2>
                </CardHeader>

                <CardBody>
                  <p>
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
              </Card>
            </div>
          </main>
          <Card className=" mt-8 mx-8 w-6/12  h-full">
            <CardHeader className="flex gap-3">
              <h2 className="ml-8 mt-4 text-mainOrange text-2xl font-bold">
                直播設定
              </h2>
            </CardHeader>

            <CardBody>
              <div className="px-8 ">
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <p className="text-black">解析度</p>
                    <Select
                      size="md"
                      label="Select an animal"
                      className="max-w-xs md-8"
                    >
                      {animals.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-black">直播來源檔</p>
                  <Checkbox
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    color="default"
                  >
                    儲存直播以供下載
                  </Checkbox>
                </div>
              </div>
              <div className="flex flex-row">
                <Button color="primary">Button</Button>
                <Button color="primary">Button</Button>
              </div>
            </CardBody>
          </Card>
          {/* <Card className=" mt-8 mx-8   h-full">
                            <CardHeader className="flex gap-3">
                                <h2 className="ml-8 mt-4 text-black text-xl font-bold">備忘錄</h2>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                 */}
        </div>
      </div>
    </>
  );
}
