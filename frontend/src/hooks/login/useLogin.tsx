import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useLogin() {
    const router = useRouter()

    const login = async (requestBody: any) => {
        try {
            const response = await fetch(`${apiUrl}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            const responseData = await response.json()
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '成功登入',
                    showConfirmButton: false,
                    timer: 1000,
                })
                Cookies.set('accessToken', responseData.data.access_token)
                Cookies.set('userName', responseData.data.name)

                setTimeout(() => {
                    router.push('/')
                    window.location.reload()
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
    }

    return { login }
}

export default useLogin
