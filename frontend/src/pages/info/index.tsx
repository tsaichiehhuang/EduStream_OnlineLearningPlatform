import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Chip } from '@nextui-org/react'
import Header from '@/components/header'
import path from 'path'

interface File {
    name: string
    path: string
}

interface WeekData {
    week: number
    description: string
    file: File[]
    hw: { name: string; endTime: string; done: boolean; uploadTime: string }[]
}
const CourseMockData = {
    name: '人機互動',
    id: 1,
    announcement: '第一次作業上傳',
    file: [{ name: 'syllabus', path: 'syllabus.pdf' }],
}
const WeekMockData: WeekData[] = [
    {
        week: 1,
        description: 'Introduction',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月7日', done: true, uploadTime: '2023年10月7日' }],
    },
    {
        week: 2,
        description: 'Communication and HCI',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mov' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月10日', done: false, uploadTime: '' }],
    },
    {
        week: 3,
        description: 'The Psychological Basis of HCI',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月12日', done: false, uploadTime: '' }],
    },
]
interface WeekBlockProps {
    data: WeekData
}
export default function Info() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const getFileIcon = (filePath: string) => {
        const extension = filePath.split('.').pop()
        if (extension) {
            switch (extension) {
                case 'pdf':
                case 'ppt':
                case 'doc':
                    return (
                        <div className="w-[24px] h-[24px] bg-mainGreen rounded-full flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="12"
                                viewBox="0 0 8 10"
                                fill="none"
                            >
                                <path
                                    d="M4.5 3.5V0.75L7.25 3.5M1 0C0.445 0 0 0.445 0 1V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H7C7.26522 10 7.51957 9.89464 7.70711 9.70711C7.89464 9.51957 8 9.26522 8 9V3L5 0H1Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    )
                case 'mp4':
                case 'mov':
                    return (
                        <div className="w-[24px] h-[24px] bg-mainBlue rounded-full flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 21 21"
                                fill="none"
                            >
                                <path
                                    d="M7.21875 15.0936C7.0447 15.0936 6.87778 15.0245 6.75471 14.9014C6.63164 14.7784 6.5625 14.6114 6.5625 14.4374V6.56239C6.56256 6.45057 6.59119 6.34062 6.64568 6.24298C6.70016 6.14533 6.77869 6.06323 6.87382 6.00445C6.96895 5.94568 7.07752 5.91219 7.18922 5.90716C7.30093 5.90213 7.41207 5.92572 7.51209 5.97571L15.3871 9.91321C15.496 9.96777 15.5875 10.0515 15.6515 10.1551C15.7154 10.2588 15.7493 10.3781 15.7493 10.4999C15.7493 10.6217 15.7154 10.741 15.6515 10.8446C15.5875 10.9483 15.496 11.032 15.3871 11.0866L7.51209 15.0241C7.42103 15.0697 7.3206 15.0935 7.21875 15.0936Z"
                                    fill="white"
                                />
                                <path
                                    d="M10.5 1.3125C8.68289 1.3125 6.90658 1.85134 5.3957 2.86087C3.88483 3.87041 2.70724 5.3053 2.01186 6.9841C1.31648 8.66289 1.13454 10.5102 1.48904 12.2924C1.84354 14.0746 2.71857 15.7116 4.00346 16.9965C5.28836 18.2814 6.92541 19.1565 8.70761 19.511C10.4898 19.8655 12.3371 19.6835 14.0159 18.9881C15.6947 18.2928 17.1296 17.1152 18.1391 15.6043C19.1487 14.0934 19.6875 12.3171 19.6875 10.5C19.6875 8.06332 18.7195 5.72645 16.9965 4.00346C15.2736 2.28047 12.9367 1.3125 10.5 1.3125ZM15.3871 11.0873L7.5121 15.0248C7.41202 15.0749 7.30082 15.0984 7.18906 15.0934C7.0773 15.0883 6.96869 15.0548 6.87355 14.9959C6.7784 14.9371 6.69988 14.8549 6.64544 14.7571C6.591 14.6594 6.56245 14.5494 6.5625 14.4375V6.5625C6.56256 6.45068 6.5912 6.34073 6.64568 6.24308C6.70017 6.14544 6.7787 6.06333 6.87383 6.00456C6.96895 5.94579 7.07752 5.9123 7.18923 5.90727C7.30093 5.90223 7.41207 5.92583 7.5121 5.97581L15.3871 9.91331C15.496 9.96787 15.5875 10.0516 15.6515 10.1553C15.7154 10.2589 15.7493 10.3782 15.7493 10.5C15.7493 10.6218 15.7154 10.7411 15.6515 10.8447C15.5875 10.9484 15.496 11.0321 15.3871 11.0867V11.0873Z"
                                    fill="#6689CB"
                                />
                            </svg>
                        </div>
                    )
                default:
                    return null
            }
        }
        return null
    }
    const WeekBlock: React.FC<WeekBlockProps> = ({ data }) => {
        return (
            <div className="py-4 gap-6 flex flex-col justify-between">
                <h2 className="text-lg gap-4 flex flex-row items-center  font-bold mb-4">
                    <div>Week {data.week}</div>
                    {data.description}
                </h2>
                {data.file.map((file, index) => (
                    <Link className="ml-5 gap-2 " color="foreground" key={index} href="#" underline="hover">
                        {getFileIcon(file.path)}
                        {file.name}
                    </Link>
                ))}
                {data.hw.map((hw, index) => (
                    <Card key={index} className="p-1 w-fit hover:bg-neutral-50 " shadow="sm">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row items-start ">
                            <Link key={index} className=" gap-2" color="foreground" href="#" underline="hover">
                                <div className="w-[24px] h-[24px] bg-mainOrange rounded-full flex justify-center items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="16"
                                        viewBox="0 0 11 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.99976 11H8.99976C9.26497 11 9.51933 10.8946 9.70686 10.7071C9.8944 10.5196 9.99976 10.2652 9.99976 10V3.75L7.24976 1H2.99976C2.73454 1 2.48019 1.10536 2.29265 1.29289C2.10511 1.48043 1.99976 1.73478 1.99976 2V4"
                                            stroke="white"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M7 1V4H10M1 7.5H6M6 7.5L4.5 9M6 7.5L4.5 6"
                                            stroke="white"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>{' '}
                                {hw.name}
                            </Link>
                        </CardHeader>

                        <CardBody className="gap-1 items-center overflow-visible py-4">
                            <Button
                                color={`${hw.done ? 'success' : 'danger'}`}
                                variant="solid"
                                className="relative  rounded-lg hover:-translate-y-1 px-12 after:absolute after:rounded-lg after:inset-0 after:bg-background/40  after:transition  hover:after:scale-150 hover:after:opacity-0"
                            >
                                {hw.done ? (
                                    <>
                                        <p className=" text-sm">繳交完成</p>Submitted {hw.uploadTime}
                                    </>
                                ) : (
                                    <>
                                        <p className=" text-sm">尚未繳交</p>Due {hw.endTime}
                                    </>
                                )}
                            </Button>
                        </CardBody>
                    </Card>
                ))}

                <Divider />
            </div>
        )
    }
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main className="p-10 w-full h-screen flex flex-col ">
                    <div className="text-2xl font-medium py-10 md:p-6">{CourseMockData.name}</div>
                    <div className="flex w-full  justify-end md:flex-row flex-col-reverse md:justify-around ">
                        <Card
                            className=" bg-white rounded-[10px]  w-full mt-5 md:w-7/12 md:mt-0 py-8 px-12 border-none"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className=" gap-6 flex flex-col justify-between">
                                    {CourseMockData.announcement && (
                                        <div className="p-4 border-b rounded-lg shadow">
                                            <h3 className="gap-4 flex items-center ">
                                                <Chip size="sm" color="warning" variant="bordered">
                                                    公告
                                                </Chip>
                                                {CourseMockData.announcement}
                                            </h3>
                                        </div>
                                    )}

                                    {CourseMockData.file &&
                                        CourseMockData.file.map((file, index) => (
                                            <Link
                                                key={index}
                                                className="flex-row gap-2 flex ml-5"
                                                color="foreground"
                                                href="#"
                                                underline="hover"
                                            >
                                                {getFileIcon(file.path)}
                                                {file.name}
                                            </Link>
                                        ))}
                                    <Divider />
                                </div>
                                {WeekMockData.map((data, index) => (
                                    <WeekBlock key={index} data={data} />
                                ))}
                            </CardBody>
                        </Card>
                        <div className="flex-col  gap-8 flex  w-full md:w-1/3">
                            <Link href="/live">
                                <Button className="w-full" size="lg" color="primary" variant="shadow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 1.5C9.9233 1.5 7.89323 2.11581 6.16652 3.26957C4.4398 4.42332 3.09399 6.0632 2.29927 7.98182C1.50455 9.90045 1.29661 12.0116 1.70176 14.0484C2.1069 16.0852 3.10693 17.9562 4.57538 19.4246C6.04383 20.8931 7.91476 21.8931 9.95156 22.2982C11.9884 22.7034 14.0996 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3938 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM17.5853 12.6713L8.58525 17.1713C8.47088 17.2284 8.3438 17.2554 8.21607 17.2496C8.08835 17.2438 7.96422 17.2055 7.85548 17.1382C7.74674 17.0709 7.65701 16.977 7.59479 16.8653C7.53257 16.7536 7.49995 16.6279 7.5 16.5V7.5C7.50007 7.37221 7.53279 7.24655 7.59506 7.13495C7.65733 7.02336 7.74708 6.92952 7.8558 6.86235C7.96452 6.79519 8.0886 6.75691 8.21626 6.75116C8.34392 6.74541 8.47094 6.77238 8.58525 6.8295L17.5853 11.3295C17.7097 11.3919 17.8143 11.4876 17.8874 11.606C17.9605 11.7244 17.9992 11.8608 17.9992 12C17.9992 12.1392 17.9605 12.2756 17.8874 12.394C17.8143 12.5124 17.7097 12.6081 17.5853 12.6705V12.6713Z"
                                            fill="white"
                                        />
                                    </svg>
                                    線上教學
                                </Button>
                            </Link>

                            <Card className="max-w-[400px] border-l-5 border-mainGreen">
                                <CardHeader className="flex gap-3">
                                    <h2 className="text-mainGreen text-xl font-bold">近日事項</h2>
                                </CardHeader>

                                <CardBody>
                                    <p>Make beautiful websites regardless of your design experience.</p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
