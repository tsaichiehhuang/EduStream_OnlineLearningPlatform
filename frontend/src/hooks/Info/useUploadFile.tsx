import Cookies from 'js-cookie'
import { useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useUploadFile() {
    const [classData, setClassData] = useState<ClassData[]>([])
    const accessToken = Cookies.get('accessToken')

    const uploadFile = async (requestBody: any, id: any) => {
        try {
            const response = await fetch(`${apiUrl}/file/upload/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
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

    return { uploadFile }
}

export default useUploadFile
