import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useGetDefault() {
    const router = useRouter()
    const { id } = router.query

    const [defaultInfoData, setDefaultInfoData] = useState<DefaultData[]>([])
    const accessToken = Cookies.get('accessToken')

    const getDefault = async (id: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/default/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok) {
                setDefaultInfoData(responseData.data.class)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }
    useEffect(() => {
        getDefault(id)
    }, [id])
    return { getDefault, defaultInfoData }
}

export default useGetDefault
