import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

export default function Home() {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const [currentTime, setCurrentTime] = useState(new Date())
    const [formattedTime, setFormattedTime] = useState<string | undefined>()
    const [formattedDate, setFormattedDate] = useState<string | undefined>()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
            setFormattedTime(currentTime.toLocaleTimeString())
            setFormattedDate(currentTime.toLocaleDateString())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [currentTime])
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main
                    className={`p-10 w-full h-screen flex  ${
                        isMobile ? 'flex-col justify-start items-center' : 'flex-row justify-around items-start'
                    } `}
                >
                    <div className={`${isMobile ? 'w-full ' : 'w-5/12'}  gap-10 flex flex-col justify-around `}>
                        <Card className=" border-l-5 border-mainGreen">
                            <CardHeader className="flex gap-3 justify-between">
                                <h2 className="text-mainGreen text-xl font-bold ">今日課程</h2>
                                <p className="text-gray-300 items-end justify-end flex flex-col">
                                    <span id="client-time"></span>
                                    {formattedDate}
                                    <br />
                                    {formattedTime}
                                </p>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                        <Card className=" border-l-5 border-mainBlue">
                            <CardHeader className="flex gap-3">
                                <h2 className="text-mainBlue text-xl font-bold">近期消息</h2>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={`${isMobile ? 'w-full mt-5 ' : 'w-5/12'} flex-col w-5/12 gap-8 flex `}>
                        <h3 className=" text-mainOrange font-bold text-2xl">你的課程</h3>
                        <div className="flex-col w-full gap-2 flex ">
                            <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]" isPressable>
                                <Link href="/info" className="w-full text-black ">
                                    <CardBody className="flex-row justify-between">
                                        <p>人機互動</p>
                                        <p>三234</p>
                                    </CardBody>
                                </Link>
                            </Card>
                            <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]" isPressable>
                                <Link href="/info" className="w-full text-black ">
                                    <CardBody className="flex-row justify-between">
                                        <p>設計理論與方法</p>
                                        <p>三234</p>
                                    </CardBody>
                                </Link>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
