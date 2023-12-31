import React, { useState, useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface DarkModeProps {
    toggleTheme: () => void | undefined
    theme: string | null
}

export default function Header({ toggleTheme, theme }: DarkModeProps) {
    const router = useRouter()
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const user = Cookies.get('userName')
        if (user) {
            setUserName(user)
        }
    }, [])
    const handleLogout = () => {
        // 登出，清除token
        Cookies.remove('accessToken')
        // 重新回去登入頁面
        router.replace('/login')
        // window.location.reload()
    }
    const items: { key: string; label: string }[] = [
        {
            key: 'setting',
            label: '設定',
        },
        {
            key: 'logout',
            label: '登出',
        },
    ]
    return (
        <NextUIProvider>
            <div className={`${theme} text-foreground bg-background `}>
                <div className="light  dark:bg-gray-800 dark:text-white bg-white text-black h-16  shadow-md w-full flex flex-row justify-between items-center p-10 mb-5">
                    <Link
                        className="light dark:text-white text-mainBlue font-zen-dots text-xl font-normal"
                        href="/home"
                    >
                        EduStream
                    </Link>
                    <div className="flex row items-center justify-center">
                        {/* <Button className="bg-transparent	" onClick={toggleTheme}>
                            {theme === 'light' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 6.58325C9.01 6.58325 6.58333 9.00992 6.58333 11.9999C6.58333 14.9899 9.01 17.4166 12 17.4166C14.99 17.4166 17.4167 14.9899 17.4167 11.9999C17.4167 9.00992 14.99 6.58325 12 6.58325ZM1.16666 13.0833H3.33333C3.92916 13.0833 4.41666 12.5958 4.41666 11.9999C4.41666 11.4041 3.92916 10.9166 3.33333 10.9166H1.16666C0.570828 10.9166 0.0833282 11.4041 0.0833282 11.9999C0.0833282 12.5958 0.570828 13.0833 1.16666 13.0833ZM20.6667 13.0833H22.8333C23.4292 13.0833 23.9167 12.5958 23.9167 11.9999C23.9167 11.4041 23.4292 10.9166 22.8333 10.9166H20.6667C20.0708 10.9166 19.5833 11.4041 19.5833 11.9999C19.5833 12.5958 20.0708 13.0833 20.6667 13.0833ZM10.9167 1.16659V3.33325C10.9167 3.92909 11.4042 4.41659 12 4.41659C12.5958 4.41659 13.0833 3.92909 13.0833 3.33325V1.16659C13.0833 0.570752 12.5958 0.083252 12 0.083252C11.4042 0.083252 10.9167 0.570752 10.9167 1.16659ZM10.9167 20.6666V22.8333C10.9167 23.4291 11.4042 23.9166 12 23.9166C12.5958 23.9166 13.0833 23.4291 13.0833 22.8333V20.6666C13.0833 20.0708 12.5958 19.5833 12 19.5833C11.4042 19.5833 10.9167 20.0708 10.9167 20.6666ZM5.48916 3.96159C5.38894 3.86116 5.26989 3.78148 5.13884 3.72712C5.00778 3.67275 4.86729 3.64477 4.72541 3.64477C4.58353 3.64477 4.44304 3.67275 4.31199 3.72712C4.18093 3.78148 4.06188 3.86116 3.96166 3.96159C3.86123 4.06181 3.78156 4.18085 3.72719 4.31191C3.67283 4.44296 3.64485 4.58345 3.64485 4.72534C3.64485 4.86722 3.67283 5.00771 3.72719 5.13876C3.78156 5.26982 3.86123 5.38886 3.96166 5.48909L5.10999 6.63742C5.53249 7.05992 6.22583 7.05992 6.6375 6.63742C7.04916 6.21492 7.06 5.52159 6.6375 5.10992L5.48916 3.96159ZM18.89 17.3624C18.7898 17.262 18.6707 17.1823 18.5397 17.128C18.4086 17.0736 18.2681 17.0456 18.1262 17.0456C17.9844 17.0456 17.8439 17.0736 17.7128 17.128C17.5818 17.1823 17.4627 17.262 17.3625 17.3624C17.2621 17.4626 17.1824 17.5817 17.128 17.7127C17.0737 17.8438 17.0457 17.9843 17.0457 18.1262C17.0457 18.2681 17.0737 18.4085 17.128 18.5396C17.1824 18.6707 17.2621 18.7897 17.3625 18.8899L18.5108 20.0383C18.9333 20.4608 19.6267 20.4608 20.0383 20.0383C20.1388 19.938 20.2184 19.819 20.2728 19.6879C20.3272 19.5569 20.3551 19.4164 20.3551 19.2745C20.3551 19.1326 20.3272 18.9921 20.2728 18.8611C20.2184 18.73 20.1388 18.611 20.0383 18.5108L18.89 17.3624ZM20.0383 5.48909C20.1388 5.38886 20.2184 5.26982 20.2728 5.13876C20.3272 5.00771 20.3551 4.86722 20.3551 4.72534C20.3551 4.58345 20.3272 4.44296 20.2728 4.31191C20.2184 4.18085 20.1388 4.06181 20.0383 3.96159C19.9381 3.86116 19.8191 3.78148 19.688 3.72712C19.557 3.67275 19.4165 3.64477 19.2746 3.64477C19.1327 3.64477 18.9922 3.67275 18.8612 3.72712C18.7301 3.78148 18.6111 3.86116 18.5108 3.96159L17.3625 5.10992C16.94 5.53242 16.94 6.22575 17.3625 6.63742C17.785 7.04909 18.4783 7.05992 18.89 6.63742L20.0383 5.48909ZM6.6375 18.8899C6.73792 18.7897 6.8176 18.6707 6.87196 18.5396C6.92633 18.4085 6.95431 18.2681 6.95431 18.1262C6.95431 17.9843 6.92633 17.8438 6.87196 17.7127C6.8176 17.5817 6.73792 17.4626 6.6375 17.3624C6.53727 17.262 6.41823 17.1823 6.28717 17.128C6.15612 17.0736 6.01563 17.0456 5.87374 17.0456C5.73186 17.0456 5.59137 17.0736 5.46032 17.128C5.32926 17.1823 5.21022 17.262 5.10999 17.3624L3.96166 18.5108C3.53916 18.9333 3.53916 19.6266 3.96166 20.0383C4.38416 20.4499 5.07749 20.4608 5.48916 20.0383L6.6375 18.8899Z"
                                        fill="#6689CB"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.535 3.51812C11.6094 3.35414 11.6382 3.17311 11.6183 2.99413C11.5984 2.81516 11.5305 2.64488 11.4218 2.50128C11.3132 2.35769 11.1677 2.2461 11.0009 2.17831C10.8341 2.11051 10.652 2.08903 10.474 2.11612C5.675 2.85212 2 6.99612 2 12.0001C2 17.5231 6.477 22.0001 12 22.0001C17.523 22.0001 22 17.5231 22 12.0001C21.9999 11.9068 21.9986 11.8134 21.996 11.7201C21.991 11.5398 21.9373 11.3642 21.8407 11.212C21.7441 11.0597 21.608 10.9364 21.447 10.8551C21.286 10.7738 21.106 10.7376 20.9261 10.7503C20.7462 10.763 20.573 10.8241 20.425 10.9271C19.3461 11.6785 18.0503 12.0547 16.7367 11.9979C15.4232 11.9411 14.1647 11.4544 13.1547 10.6126C12.1447 9.7709 11.4392 8.62073 11.1466 7.33896C10.8539 6.05719 10.9904 4.71477 11.535 3.51812Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </Button> */}

                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="bg-transparent	">
                                    <div className="light flex row items-center dark:text-white text-mainBlue gap-2 ">
                                        <div className="bg-mainBlue w-6 h-6 rounded-full flex justify-center items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3 14C3 14 2 14 2 13C2 12 3 9 8 9C13 9 14 12 14 13C14 14 13 14 13 14H3ZM8 8C8.79565 8 9.55871 7.68393 10.1213 7.12132C10.6839 6.55871 11 5.79565 11 5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5C5 5.79565 5.31607 6.55871 5.87868 7.12132C6.44129 7.68393 7.20435 8 8 8Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <div>{userName}</div>
                                    </div>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item: any) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={item.key === 'logout' ? 'danger' : 'default'}
                                        className={item.key === 'logout' ? 'text-danger' : ''}
                                        onPress={item.key === 'logout' ? handleLogout : undefined}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </NextUIProvider>
    )
}
