import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Button, CardBody, Input, CardFooter, Divider, Tab, Tabs } from '@nextui-org/react'
import Header from '@/components/header'
import { NextUIProvider } from '@nextui-org/react'
import Chatroom from '@/components/chatroom'
import OpenAI from '@/components/openAI'
import { useRouter } from 'next/router'
import LiveStreamPlayer from '@/components/live/showVideo'
import useGetLive from '@/hooks/live/useGetLive'

const animals = [
    {
        label: 'Cat',
        value: 'cat',
        description: 'The second most popular pet in the world',
    },
    {
        label: 'Dog',
        value: 'dog',
        description: 'The most popular pet in the world',
    },
    {
        label: 'Elephant',
        value: 'elephant',
        description: 'The largest land animal',
    },
    { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
]

export default function Live() {
    const { getLive, liveurl, livename, livestate } = useGetLive()
    useEffect(() => {
        getLive()
    }, [])

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const [isSelected, setIsSelected] = React.useState(false)
    const [chatMsg, setChatMsg] = useState([] as Record<string, any>[])

    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <main className="px-20 w-full flex   flex-row mt-5 gap-5 items-start justify-center">
                <div className=" w-1/2 md:7/12 flex-col gap-4 flex">
                    <div className="flex flex-col  w-full h-1/5  md:h-96">
                        <LiveStreamPlayer source={liveurl} />
                        {/* <div className="bg-gray-500  w-full h-full md:w-full md:h-full"></div> */}
                        <div className="text-xl font-semibold pt-2 px-2 mb-4">
                            {livename === null ? <span>直播名稱</span> : <span>{livename}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-full  h-1/5  md:w-5/12 flex flex-col ">
                    <Tabs aria-label="Options" size="sm">
                        <Tab key="chatroom" title="聊天室">
                            <Chatroom messages={chatMsg} setMessages={setChatMsg} />
                        </Tab>
                        <Tab key="ai" title="AI問答">
                            <OpenAI />
                        </Tab>
                    </Tabs>
                </div>
            </main>
        </>
    )
}
