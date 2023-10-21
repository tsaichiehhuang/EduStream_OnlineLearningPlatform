import Cookies from 'js-cookie'
import { set } from 'lodash'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useGetHW() {
    const [hwData, setHwData] = useState<WeekData[]>([])
    const accessToken = Cookies.get('accessToken')

    const getHW = async (homeworkID: number) => {
        try {
            const response = await fetch(`${apiUrl}/class/homework/${homeworkID}/overview`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok) {
                setHwData(responseData.data.homework.submissions)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { getHW, hwData }
}

export default useGetHW
