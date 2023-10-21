import React, { useState } from 'react'
import { ChatGPT } from '@/components/ChatGPT'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Button,
    Skeleton,
    Input,
    Tabs,
    Tab,
} from '@nextui-org/react'

export default function OpenAI() {
    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleInput = async () => {
        if (input.trim() === '') {
            return
        }

        const newMessage = { content: input, role: 'user' }

        // setMessages([...messages, newMessage])
        setInput('')
        setIsLoading(true)

        try {
            const chatResponse = await ChatGPT(input)
            const responseMessage = { content: chatResponse, role: 'ai' }
            // setMessages([...messages, responseMessage])
        } catch (error) {
            console.error('Error communicating with ChatGPT:', error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleInputKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleInput()
        }
    }
    return (
        <Card className=" w-full  max-h-[450px]">
            <CardHeader className="flex gap-3 justify-between text-lg font-bold">AI問答</CardHeader>
            <Divider />
            <CardBody className="flex flex-col min-h-[350px] max-h-[350px] overflow-y-scroll gap-4">
                {/* {messages.map((message, index) => (
                    <Message key={index} content={message.content} role={message.role} />
                ))} */}
            </CardBody>
            <CardFooter className="flex flex-row justify-center items-center gap-1">
                <Input
                    type="text"
                    className=" rounded-lg text-xs z-0 flex"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="輸入要傳送的文字"
                    onKeyDown={handleInputKeyPress}
                    endContent={
                        <div onClick={handleInput} className="z-10 flex cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="27"
                                height="27"
                                viewBox="0 0 27 27"
                                fill="none"
                            >
                                <path
                                    d="M3.825 22.9502L23.4563 14.5352C23.6592 14.4487 23.8322 14.3045 23.9539 14.1205C24.0755 13.9365 24.1403 13.7208 24.1403 13.5002C24.1403 13.2796 24.0755 13.0639 23.9539 12.8799C23.8322 12.6959 23.6592 12.5516 23.4563 12.4652L3.825 4.0502C3.65501 3.97605 3.46924 3.94539 3.28445 3.96099C3.09965 3.97658 2.92164 4.03793 2.76649 4.13951C2.61133 4.24109 2.4839 4.3797 2.39569 4.54283C2.30749 4.70597 2.26128 4.88849 2.26125 5.07395L2.25 10.2602C2.25 10.8227 2.66625 11.3064 3.22875 11.3739L19.125 13.5002L3.22875 15.6152C2.66625 15.6939 2.25 16.1777 2.25 16.7402L2.26125 21.9264C2.26125 22.7252 3.0825 23.2764 3.825 22.9502Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    }
                />
            </CardFooter>
        </Card>
    )
}
