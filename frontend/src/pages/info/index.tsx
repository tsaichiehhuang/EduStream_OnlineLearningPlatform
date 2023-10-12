import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Divider, Link, Chip } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'

import Header from '@/components/header'
import WeekBlock from '@/components/info/WeekBlock'
import WeekMockData from '@/data/WeekMockData'
import CourseMockData from '@/data/CourseMockData'
import DefaultBlock from '@/components/info/defaultBlock'
import userMockData from '@/data/userMockData'
import AddBlock from '@/components/info/AddBlock'

export default function Info() {
    const [theme, setTheme] = useState('light')
    const [editMode, setEditMode] = useState(false)

    const handleEditMode = () => {
        setEditMode(!editMode)
    }
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main className="p-10 w-full h-screen flex flex-col ">
                    <div className="text-2xl font-medium py-10 md:p-6">{CourseMockData.name}</div>
                    <div className="flex w-full  justify-end md:flex-row flex-col-reverse md:justify-around ">
                        <div className="  w-full mt-5 md:w-7/12 md:mt-0   border-none gap-4 flex-col flex mb-12">
                            <DefaultBlock data={CourseMockData} editMode={editMode} />

                            {WeekMockData.map((data, index) => (
                                <WeekBlock key={index} data={data} editMode={editMode} />
                            ))}
                            {editMode && (
                                <Card
                                    className="w-full p-8 flex flex-row justify-center items-center text-darkGray gap-8  hover:-translate-y-1  "
                                    isPressable
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.95715 0.351879C7.30883 -0.0196366 10.6913 -0.0196366 14.043 0.351879C15.8987 0.559879 17.3959 2.0213 17.6137 3.88355C18.0111 7.28266 18.0111 10.7165 17.6137 14.1156C17.5035 15.0205 17.0909 15.8617 16.4428 16.5027C15.7947 17.1437 14.949 17.5471 14.043 17.6473C10.6914 18.02 7.30877 18.02 3.95715 17.6473C3.05111 17.5471 2.20549 17.1437 1.55738 16.5027C0.90927 15.8617 0.496675 15.0205 0.386487 14.1156C-0.0109906 10.7169 -0.0109906 7.28338 0.386487 3.88463C0.496628 2.9799 0.909065 2.13889 1.55696 1.49788C2.20485 0.856868 3.05022 0.453434 3.95607 0.352962L3.95715 0.351879ZM9.00007 3.59105C9.21556 3.59105 9.42222 3.67665 9.57459 3.82902C9.72697 3.98139 9.81257 4.18806 9.81257 4.40355V8.18763H13.5967C13.8121 8.18763 14.0188 8.27323 14.1712 8.4256C14.3236 8.57798 14.4092 8.78464 14.4092 9.00013C14.4092 9.21562 14.3236 9.42228 14.1712 9.57465C14.0188 9.72703 13.8121 9.81263 13.5967 9.81263H9.81257V13.5967C9.81257 13.8122 9.72697 14.0189 9.57459 14.1712C9.42222 14.3236 9.21556 14.4092 9.00007 14.4092C8.78458 14.4092 8.57792 14.3236 8.42555 14.1712C8.27317 14.0189 8.18757 13.8122 8.18757 13.5967V9.81263H4.40349C4.188 9.81263 3.98134 9.72703 3.82896 9.57465C3.67659 9.42228 3.59099 9.21562 3.59099 9.00013C3.59099 8.78464 3.67659 8.57798 3.82896 8.4256C3.98134 8.27323 4.188 8.18763 4.40349 8.18763H8.18757V4.40355C8.18757 4.18806 8.27317 3.98139 8.42555 3.82902C8.57792 3.67665 8.78458 3.59105 9.00007 3.59105Z"
                                            fill="#B0B0B0"
                                        />
                                    </svg>
                                    新增區塊
                                </Card>
                            )}
                        </div>
                        <div className="flex-col  gap-8 flex  w-full md:w-1/3">
                            {userMockData.status !== 'admin' ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <Button
                                        disableRipple
                                        className={` relative overflow-visible  hover:-translate-y-1 px-12 shadow-xl  after:content-[''] after:absolute  after:inset-0  ${
                                            editMode ? ' text-danger' : ' text-mainGreen'
                                        } after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
                                        size="lg"
                                        color={editMode ? 'danger' : 'success'}
                                        onPress={handleEditMode}
                                        variant="bordered"
                                    >
                                        {editMode ? '關閉' : '開啟'}編輯模式
                                    </Button>
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
                                    <AddBlock />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
