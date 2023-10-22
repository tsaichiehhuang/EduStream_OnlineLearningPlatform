import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useCreateClass() {
    const [classData, setClassData] = useState<ClassData[]>([])
    const accessToken = Cookies.get('accessToken')

    const createClass = async (requestBody: any) => {
        try {
            const response = await fetch(`${apiUrl}/class`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody),
            })
            const responseData = await response.json()
            if (response.ok) {
                setClassData(responseData.data.class)
                Swal.fire({
                    icon: 'success',
                    title: '新增成功',
                    showConfirmButton: false,
                    timer: 700,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 550)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { createClass }
}

export default useCreateClass
