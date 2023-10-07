import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { NextUIProvider } from '@nextui-org/react'

export default function Live() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main className="p-10 w-full h-screen flex justify-around ">
                    <div className="bg-gray-500 w-6/12 h-3/5"></div>
                    <Card className="max-w-[400px] h-36 border-l-5 border-mainBlue">
                        <CardHeader className="flex gap-3">
                            <h2 className="text-mainBlue text-xl font-bold">重要消息</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>Make beautiful websites regardless of your design experience.</p>
                        </CardBody>
                    </Card>
                    {/* <div className="w-1/3 h-32 rounded-lg border-l-5 border-mainBlue bg-white shadow-md p-4">
                        <div className="text-mainBlue text-xl ">重要消息</div>
                    </div> */}
                </main>
            </div>
        </>
    )
}
