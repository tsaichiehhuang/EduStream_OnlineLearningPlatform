import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useUploadKK() {
    const router = useRouter()
    const { id } = router.query
    const [defaultInfoData, setDefaultInfoData] = useState<DefaultData[]>([])
    const accessToken = Cookies.get('accessToken')

   

    const useuploadKK = async (requestbody: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/${id}/section`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestbody),
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '檔案準備新增成功',
                    showConfirmButton: false,
                    timer: 500,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
            Swal.fire('檔案準備新增失敗', '', 'warning')
        }
    }

    return { useuploadKK }
}

export default useUploadKK
