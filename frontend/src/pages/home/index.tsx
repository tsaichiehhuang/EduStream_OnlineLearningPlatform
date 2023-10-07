import Head from 'next/head'
import React, { ReactElement, useState } from 'react'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './home.module.scss'
import Header from '@/components/header'

import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return <Header toggleTheme={toggleTheme} theme={theme} />
}
