import { useState, useEffect } from 'react'
import Script from 'next/script'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import Header from '@/components/header'
import ClassMockData from '@/data/ClassMockData'
import InstructorClassMockData from '@/data/InstructorClassMockData'

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
    const [theme, setTheme] = useState('light')
    const [userRole, setUserRole] = useState<string | null>('')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const [currentTime, setCurrentTime] = useState(new Date())
    const [formattedTime, setFormattedTime] = useState<string | undefined>()
    const [formattedDate, setFormattedDate] = useState<string | undefined>()
    type AllClassData = ClassData | InstructorClassData
    const handleClassClick = (classId: number, className: string) => {
        Cookies.set('className', className)
        window.location.href = `/info/${classId}`
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = new Date()
            setCurrentTime(newTime)
            setFormattedTime(() => newTime.toLocaleTimeString())
            setFormattedDate(() => newTime.toLocaleDateString())
        }, 1000)

        setUserRole(Cookies.get('userRole'))

        return () => {
            clearInterval(intervalId)
        }
    }, [])
    const classInfoData: AllClassData[] = userRole === 'student' ? ClassMockData : InstructorClassMockData
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main className="p-10 w-full h-screen flex flex-col md:flex-row md:justify-around items-start gap-8 justify-start">
                    <div className="w-full md:w-5/12 gap-10 flex flex-col justify-around">
                        <Card className=" border-l-5 border-mainGreen">
                            <CardHeader className="flex gap-3 justify-between">
                                <h2 className="text-mainGreen text-xl font-bold ">今日課程</h2>
                                <div className="text-gray-300 items-end justify-end flex flex-col">
                                    <span id="client-time" />
                                    {formattedDate}
                                    <br />
                                    {formattedTime}
                                </div>
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
                            {classInfoData.map((data) => (
                                <Card
                                    key={data.id}
                                    className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]"
                                    isPressable
                                    onPress={() => handleClassClick(data.id, data.name)}
                                >
                                    <CardBody className="flex-row justify-between">
                                        <div>{data.name}</div>
                                        {userRole === 'student' && 'teacher' in data && <div>{data.teacher}</div>}
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
