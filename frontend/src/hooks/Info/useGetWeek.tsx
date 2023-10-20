import Cookies from 'js-cookie'
import { set } from 'lodash'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useGetWeeks(id: any) {
    const [weeksData, setWeeksData] = useState<WeekData[]>([])
    const accessToken = Cookies.get('accessToken')

    const getWeeks = async (setLoading: any) => {
        try {
            // setLoading(true)
            const response = await fetch(`${apiUrl}/class/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok) {
                setWeeksData(responseData.data.class.sections)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
        // setLoading(false)
    }
    // useEffect(() => {
    //     getWeeks()
    // }, [id])
    return { getWeeks, weeksData }
}

export default useGetWeeks
