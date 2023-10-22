import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useDeleteSection() {
    const accessToken = Cookies.get('accessToken')

    const deleteSection = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/class/section/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '刪除成功',
                    showConfirmButton: false,
                    timer: 700,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 550)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
            Swal.fire('刪除失敗', '', 'warning')
        }
    }

    return { deleteSection }
}

export default useDeleteSection
