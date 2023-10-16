import React, { useState } from 'react'
import { Card, CardHeader,Button, CardBody,Input,  CardFooter, Divider, Link, Image } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'


import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { NextUIProvider } from '@nextui-org/react'

export default function Live() {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <div className='px-20 w-full flex 
                        flex-col '>
                <main
                    className=" w-full  flex 
                        flex-col justify-start gap-8 md:flex-row md:justify-around"
                >
                    <div className='flex flex-col  w-full h-1/5 md:w-6/12 md:h-96'>
                    <div className="bg-gray-500  w-full h-4/5 md:w-full md:h-full"></div>
                    <Button
                                        disableRipple
                                        className={` mt-4 relative overflow-visible  px-12 py-2 shadow-xl  after:content-[''] after:absolute  after:inset-0 
                                            text-danger
                                        } after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
                                        size="lg"
                                        color= 'danger' 
                                        
                                        variant="bordered"
                                    >開始直播</Button>
                         <Input
                                variant="bordered"
                                label="直播名稱"
                                placeholder=" "
                                color="default"
                                labelPlacement="outside"
                                className='mt-4'
                            />
                    </div>
                   
                    <div className="w-full  h-1/5  md:h-96 md:w-4/12 flex flex-col gap-4">
                        <Card className=" h-1/2 border-l-5 border-mainGreen">
                            <CardHeader className="flex gap-3 justify-between">
                                <h2 className="text-mainGreen text-xl font-bold ">重要公告</h2>
                                <p className="text-gray-300 items-end justify-end flex flex-col">
                                   
                                </p>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                        <Card className=" border-l-5 border-mainBlue h-full">
                            <CardHeader className="flex gap-3">
                                <h2 className="text-mainBlue text-xl font-bold">作業繳交情況</h2>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                    </div>
                    
                    
                </main>
                <Card className=" mt-8 mx-8   h-full">
                            <CardHeader className="flex gap-3">
                                <h2 className="ml-8 text-mainOrange text-xl font-bold">直播設定</h2>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                        <Card className=" mt-8 mx-8   h-full">
                            <CardHeader className="flex gap-3">
                                <h2 className="text-black text-xl font-bold">備忘錄</h2>
                            </CardHeader>

                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                
                </div>
             
            </div>
        </>
    )
}
