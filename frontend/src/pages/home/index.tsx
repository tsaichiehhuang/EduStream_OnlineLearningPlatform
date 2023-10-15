import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import Header from '@/components/header'
import userMockData from '@/data/UserMockData'
import { AddCourseButton } from '@/components/home/AddCourse'
import Cookies from 'js-cookie'

export async function getServerSideProps(context: any) {
    const { req, res } = context
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        res.writeHead(302, { Location: '/login' })
        res.end()
        return { props: {} }
    }

    return {
        props: {},
    }
}
export default function Home() {
    const userRole = Cookies.get('userRole')
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
                <main className="p-10 w-full h-screen flex flex-col md:flex-row md:justify-around items-start gap-8 justify-start">
                    <div className="w-full md:w-5/12 gap-10 flex flex-col justify-around">
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
                    <div className="w-full md:w-5/12 flex-col  gap-8 flex">
                        <h3 className=" text-mainOrange font-bold text-2xl">你的課程</h3>
                        {userRole === 'instructor' && <AddCourseButton />}
                        <div className="flex-col w-full gap-2 flex ">
                            <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]" isPressable>
                                <Link href="/info" className="w-full text-black ">
                                    <CardBody className="flex-row justify-between">
                                        <p>人機互動</p>
                                    </CardBody>
                                </Link>
                            </Card>
                            <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]" isPressable>
                                <Link href="/info" className="w-full text-black ">
                                    <CardBody className="flex-row justify-between">
                                        <p>設計理論與方法</p>
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
