import Cookies from 'js-cookie'
import { set } from 'lodash'
import { useState } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useUpdateSection() {
    const updateSection = async (title: any, id: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/section/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title }),
            })
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { updateSection }
}

export default useUpdateSection
