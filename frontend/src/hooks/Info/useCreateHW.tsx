import Cookies from 'js-cookie'
import { useState } from 'react'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useCreateHW() {
    const accessToken = Cookies.get('accessToken')

    const createHW = async (requestBody: any, classId: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/${classId}/homework`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody),
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '新增成功',
                    showConfirmButton: false,
                    timer: 1000,
                })
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1000)
            }
        } catch (error) {
            Swal.fire('新增失敗', '', 'warning')

            console.error('Error fetching class data:', error)
        }
    }

    return { createHW }
}

export default useCreateHW
