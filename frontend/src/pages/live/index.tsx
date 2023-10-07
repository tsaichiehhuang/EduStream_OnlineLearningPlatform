import React, { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
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
            <main className="p-10 w-full h-screen flex justify-around ">
                {/* <div className={`${theme} text-foreground bg-background`}> */}

                <div className="bg-gray-500 w-6/12 h-3/5"></div>
                <div className="w-1/3 h-32 rounded-lg border-l-5 border-mainBlue bg-white shadow-md p-4">
                    <div className="text-mainBlue text-xl ">重要消息</div>
                </div>

                {/* </div> */}
            </main>
        </>
    )
}
