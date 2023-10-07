import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

export default function Header() {
    return (
        <div className="h-16 bg-white shadow-md w-full flex flex-row justify-between items-center p-3">
            <div className="text-mainBlue font-zen-dots text-xl font-normal">EduStream</div>
            <div className="bg-mainBlue w-6 h-6 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M3 14C3 14 2 14 2 13C2 12 3 9 8 9C13 9 14 12 14 13C14 14 13 14 13 14H3ZM8 8C8.79565 8 9.55871 7.68393 10.1213 7.12132C10.6839 6.55871 11 5.79565 11 5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5C5 5.79565 5.31607 6.55871 5.87868 7.12132C6.44129 7.68393 7.20435 8 8 8Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    )
}
