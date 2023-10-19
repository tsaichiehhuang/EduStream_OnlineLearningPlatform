import Cookies from 'js-cookie'
import { useState } from 'react'

const apiUrl = process.env.API_DOMAIN

function useCreateAnnounce() {
    const createAnnounce = async (requestBody: any, classId: any) => {
        const accessToken = Cookies.get('accessToken')

        try {
            const response = await fetch(`${apiUrl}/class/${classId}/announce`, {
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

    return { createAnnounce }
}

export default useCreateAnnounce
