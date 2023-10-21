import Cookies from 'js-cookie'
import { set } from 'lodash'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useGetHW() {
    const [hwData, setHwData] = useState<WeekData[]>([])
    const accessToken = Cookies.get('accessToken')

    const getHW = async (classID: number, homeworkID: number) => {
        try {
            const response = await fetch(`${apiUrl}/class/${classID}/${homeworkID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok) {
                setHwData(responseData.data.class.homework.submission)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }
    // useEffect(() => {
    //     getHW(classID, homeworkID)
    // }, [])
    return { getHW, hwData }
}

export default useGetHW
