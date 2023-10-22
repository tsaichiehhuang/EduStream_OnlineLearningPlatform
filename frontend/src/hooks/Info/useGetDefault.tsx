import Cookies from 'js-cookie'
import { use, useEffect, useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useGetDefault(id: any) {
    const [defaultInfoData, setDefaultInfoData] = useState<DefaultData[]>([])
    const accessToken = Cookies.get('accessToken')

    const getDefault = async () => {
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
        getDefault()
    }, [id])
    return { getDefault, defaultInfoData }
}

export default useGetDefault
