import React, { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Home from '@/pages/home'
import { NextUIProvider } from '@nextui-org/react'
import Header from '@/components/header'

export default function Index() {
    return (
        <NextUIProvider>
            <Home />
        </NextUIProvider>
    )
}
