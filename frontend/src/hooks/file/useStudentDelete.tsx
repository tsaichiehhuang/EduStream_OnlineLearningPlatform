import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useStudentDelete() {
    const accessToken = Cookies.get('accessToken')

    const studentDelete = async (id: any) => {
        try {
            const response = await fetch(`${apiUrl}/class/homework`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ id: id }),
            })
            if (response.ok) {
                // Swal.fire({
                //     icon: 'success',
                //     title: '刪除成功',
                //     showConfirmButton: false,
                //     timer: 600,
                // })
                // setTimeout(() => {
                //     window.location.reload()
                // }, 550)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
            Swal.fire('刪除失敗', '', 'warning')
        }
    }

    return { studentDelete }
}

export default useStudentDelete
