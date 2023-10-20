import Cookies from 'js-cookie'
import { useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useGetClass() {
    const [classData, setClassData] = useState<any>([])
    const accessToken = Cookies.get('accessToken')

    if (!accessToken) {
        console.error('未找到accessToken')
        return { getClass: async () => {}, classData: [] }
    }
    const getClass = async (setLoading: any) => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/class`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok && responseData?.data) {
                console.log('hi')
                setClassData(responseData.data.class)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
        setLoading(false)
    }

    return { getClass, classData }
}

export default useGetClass
