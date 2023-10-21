import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
const apiUrl = process.env.API_DOMAIN

// export async function getServerSideProps(context: any) {
//     const { req, res } = context
//     const accessToken = req.cookies.accessToken
//     if (accessToken) {
//         res.writeHead(302, { Location: '/' })
//         res.end()
//         return { props: {} }
//     }

//     return {
//         props: {},
//     }
// }

export default function Login() {
    const [logining, setlogininging] = useState(false)
    const router = useRouter()

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Password must contain uppercase letter, lowercase letter, and number'
            ),
    })

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            const { email, password } = values
            setlogininging(true)
            try {
                const loginResponse = await fetch(`${apiUrl}/user/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: String(email),
                        password: String(password),
                    }),
                })

                const loginData = await loginResponse.json()
                console.log(loginData)

                if (loginResponse.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '成功登入',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    Cookies.set('accessToken', loginData.data.access_token)
                    Cookies.set('userName', loginData.data.user.name)
                    Cookies.set('userRole', loginData.data.user.role)
                    Cookies.set('userId', loginData.data.user.id)

                    setTimeout(() => {
                        router.push('/home')
                        // window.location.reload()
                    }, 1000)
                } else {
                    Swal.fire('電子郵件或是密碼錯誤', '', 'warning')
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: '網路請求錯誤',
                    text: '請稍後再試或通知我們的工程團隊。',
                })
            }
        },
    })

    return (
        <>
            <div className="flex flex-col  justify-center mt-20 md:mt-5 items-center ">
                <div className="bg-white rounded-lg mt h-[55%] md:w-[60%]  w-[80%] shadow-md">
                    <div className="flex flex-row">
                        <div className="md:w-[65%] w-full bg-white p-10 rounded-lg">
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
                                        placeholder="例: a12345678@gmail.com"
                                        {...formikLogin.getFieldProps('email')}
                                    />
                                    {formikLogin.touched.email && formikLogin.errors.email && (
                                        <div className="text-red-500 mt-1">{formikLogin.errors.email}</div>
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
                                        {...formikLogin.getFieldProps('password')}
                                    />
                                    {formikLogin.touched.password && formikLogin.errors.password && (
                                        <div className="text-red-500 mt-1">{formikLogin.errors.password}</div>
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

                            {/* <div className="text-center mt-3">
                                <div className="text-gray-700">
                                    尚未成為會員?{' '}
                                    <Link className="text-mainBlue" href="/signup">
                                        會員註冊
                                    </Link>
                                </div>
                            </div> */}
                        </div>
                        <div className="md:w-[35%] md:flex hidden bg-mainBlue rounded-r-lg"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
