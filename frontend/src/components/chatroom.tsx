import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Skeleton, Input, Chip } from '@nextui-org/react'
import Cookies from 'js-cookie'

let socket: WebSocket

type Props = {
    messages: Record<string, any>[]
    setMessages: React.Dispatch<React.SetStateAction<Record<string, any>[]>>
}

export default function Chatroom({ messages, setMessages }: Props) {
    const [name, setName] = useState<string | null>('')
    const [userID, setUserID] = useState<string | null>('')
    const [newMessage, setNewMessage] = useState<string>('')
    const [liveID, setLiveID] = useState<any>() //等沛婕做完liveID的cookie再改
    useEffect(() => {
        setLiveID(Cookies.get('liveid'))
        setUserID(Cookies.get('userId'))
        setName(Cookies.get('userName'))
        newSocket()
    }, [])
    const newSocket = () => {
        if (socket === undefined || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
            socket = new WebSocket(
                `wss://${
                    process.env.API_DOMAIN!.match(/https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})/)![1]
                }/live`
            )
        }
        // 確認後端是否連線（常常顯示不出來是正常的）
        if (liveID) {
            socket.onopen = (msg) => {
                console.log('open connection')
                socket.send(
                    JSON.stringify({
                        message: 'EduStream_test_connection',
                        liveID: liveID,
                        userID: userID,
                        name: name,
                    })
                )
            }
        }
        // 收到後端訊息後要做什麼（把收到的訊息加進舊訊息的Array）
        socket.onmessage = (event) => {
            console.log(event, event.data)
            const receivedMessage = JSON.parse(event.data)
            console.log(receivedMessage.message, receivedMessage.liveID, receivedMessage)
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: receivedMessage.message,
                    liveID: receivedMessage.liveID,
                    userID: receivedMessage.userID,
                    name: receivedMessage.name,
                },
            ])
        }
        // 確認後端是否關閉連線
        socket.onclose = () => {
            console.log('close connection')
            newSocket()
            console.log('connection re-established')
        }
    }
    const handleInputKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    const sendMessage = () => {
        const converted_msg = JSON.stringify({
            message: newMessage,
            liveID: liveID,
            userID: userID,
            name: name,
        })
        try {
            socket.send(converted_msg)
        } catch (err) {
            newSocket()
            return
        }
        setMessages((prevMessages: any) => [...prevMessages, { message: newMessage, liveID, userID, name }])
        setNewMessage('')
    }

    // 如果有新的訊息，捲動到最底下以顯示新的訊息
    const cardBodyRef = useRef(null)
    useEffect(() => {
        const element = cardBodyRef.current as unknown as HTMLElement
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }, [messages])

    return (
        <Card className=" w-full  max-h-[450px]">
            <CardHeader className="flex gap-3 justify-between text-lg font-bold">聊天室</CardHeader>
            <Divider />
            <div ref={cardBodyRef} className="flex flex-col min-h-[350px] max-h-[350px] overflow-y-scroll gap-4">
                {messages.map((message: any, index) => (
                    <div key={index} className="flex flex-col gap-0.5">
                        <div className="text-xs">{message.name}</div>
                        <Card
                            shadow="sm"
                            className="w-fit max-w-full min-h-[30px] px-3 py-1 flex-row items-center justify-center break-all box-border"
                        >
                            {message.message}
                        </Card>
                    </div>
                ))}
            </div>
            <CardFooter className="flex flex-row justify-center items-center gap-1">
                <Input
                    className=" rounded-lg text-xs z-0 flex"
                    type="text"
                    // labelPlacement="outside"
                    placeholder="輸入要傳送的文字"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleInputKeyPress}
                    endContent={
                        <div onClick={sendMessage} className="z-10 flex cursor-pointer">
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
