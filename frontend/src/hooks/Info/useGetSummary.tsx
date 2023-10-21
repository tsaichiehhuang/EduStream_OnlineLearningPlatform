import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { use } from 'video.js/dist/types/tech/middleware'

const apiUrl = process.env.API_DOMAIN

function useGetSummary(setLoading: any) {
    const router = useRouter()
    const { id } = router.query
    const [defaultInfoData, setDefaultInfoData] = useState<DefaultData[]>([])
    const accessToken = Cookies.get('accessToken')
    const [summaryData, setSummaryData] = useState<any[]>([])

    const getSummary = async (fileId: any) => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/summary/${fileId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()

            if (response.ok) {
                setSummaryData(responseData.message.text)
                // Swal.fire({
                //     icon: 'success',
                //     title: '新增成功',
                //     showConfirmButton: false,
                //     timer: 700,
                // })
                // setTimeout(() => {
                //     window.location.reload()
                // }, 550)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
            Swal.fire('生成失敗', '', 'warning')
        } finally {
            // 最后设置加载状态为 false
            setLoading(false)
        }
    }
    return { getSummary, summaryData }
}

export default useGetSummary
