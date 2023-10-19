import Cookies from 'js-cookie'
import { set } from 'lodash'
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
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { createClass }
}

export default useCreateClass
