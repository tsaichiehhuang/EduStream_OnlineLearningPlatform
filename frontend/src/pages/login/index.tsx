import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import Header from '@/components/header'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

export default function Login() {
    const [logining, setlogininging] = useState(false)

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const loginValidationSchema = Yup.object().shape({
        email1: Yup.string().required('Email is required').email('Invalid email address'),
        password1: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Password must contain uppercase letter, lowercase letter, and number'
            ),
    })

    const formikLogin = useFormik({
        initialValues: {
            email1: '',
            password1: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            const { email1, password1 } = values
            setlogininging(true)

            try {
                const loginResponse = await fetch('https://penny-canchu-api.octave.vip/api/1.0/users/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        provider: 'native',
                        email: String(email1),
                        password: String(password1),
                    }),
                })

                const loginData = await loginResponse.json()
                console.log(loginData)

                if (loginResponse.ok) {
                    console.log('登入成功')
                    document.cookie = `token=${loginData.data.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
                    document.cookie = `userId=${loginData.data.user.id}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
                    window.location.href = '/'
                } else {
                    console.error('登入失敗:', loginData.error)

                    if (loginResponse.status >= 500 && loginResponse.status <= 599) {
                        alert('出現錯誤。請稍後再試或通知我們的工程團隊。')
                        window.location.href = '/login'
                    } else {
                        const errorMessage = `登入失敗: ${loginData.error}`
                        alert(errorMessage)
                        window.location.href = '/login'
                    }
                }
            } catch (error) {
                console.error('請求錯誤:', error)
            }
        },
    })

    return (
        <>
            <div className="flex flex-col  justify-center mt-5 items-center ">
                <div className="bg-white rounded-lg mt h-[55%] w-[60%] shadow-md">
                    <div className="flex flex-row">
                        <div className="w-[65%] bg-white p-10 rounded-r-lg">
                            <div className="light dark:text-white text-mainBlue text-center font-zen-dots text-4xl font-normal">
                                EduStream
                            </div>
                            <div className="text-xl text-center my-10">會員登入</div>

                            <form onSubmit={formikLogin.handleSubmit} className="w-4/5 mx-auto">
                                <div className="mb-5">
                                    <label htmlFor="email1" className="block font-medium text-sm text-gray-700">
                                        電子郵件
                                    </label>
                                    <input
                                        type="email"
                                        id="email1"
                                        className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                        placeholder="例: shirney@appworks.tw"
                                        {...formikLogin.getFieldProps('email1')}
                                    />
                                    {formikLogin.touched.email1 && formikLogin.errors.email1 && (
                                        <div className="text-red-500 mt-1">{formikLogin.errors.email1}</div>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="password1" className="block font-medium text-sm text-gray-700">
                                        密碼
                                    </label>
                                    <input
                                        type="password"
                                        id="password1"
                                        className="w-full h-12 px-3 rounded border  focus:outline-none focus:border-black"
                                        {...formikLogin.getFieldProps('password1')}
                                    />
                                    {formikLogin.touched.password1 && formikLogin.errors.password1 && (
                                        <div className="text-red-500 mt-1">{formikLogin.errors.password1}</div>
                                    )}
                                </div>
                                {logining ? (
                                    <div className="mb-5">
                                        <div className="bg-gray-500 w-full h-12 rounded flex items-center justify-center">
                                            <div className="text-white">登入中...</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-5">
                                        <button
                                            className="bg-mainBlue w-full h-12 rounded text-white font-medium text-lg hover:bg-blue-400"
                                            type="submit"
                                        >
                                            登入
                                        </button>
                                    </div>
                                )}
                            </form>

                            <div className="text-center mt-3">
                                <div className="text-gray-700">
                                    尚未成為會員?{' '}
                                    <Link className="text-mainBlue" href="/signup">
                                        會員註冊
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-[35%] bg-mainBlue rounded-r-lg"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
