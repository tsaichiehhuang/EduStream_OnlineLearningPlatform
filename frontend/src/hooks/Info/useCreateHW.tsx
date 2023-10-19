import Cookies from 'js-cookie'
import { useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useCreateHW() {
    const [classData, setClassData] = useState<ClassData[]>([])
    const createHW = async (requestBody: any, id: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/${id}/homework`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            const responseData = await response.json()
            if (response.ok) {
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { createHW }
}

export default useCreateHW
