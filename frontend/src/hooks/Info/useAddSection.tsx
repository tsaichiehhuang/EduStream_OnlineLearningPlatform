import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useAddSection() {
    const router = useRouter()
    const { id } = router.query
    const [defaultInfoData, setDefaultInfoData] = useState<DefaultData[]>([])
    const accessToken = Cookies.get('accessToken')

    const addSection = async (requestbody: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/${id}/section`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestbody),
            })
            if (response.ok) {
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
            Swal.fire('新增失敗', '', 'warning')
        }
    }

    return { addSection }
}

export default useAddSection
