import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useDeleteAnnounce() {
    const accessToken = Cookies.get('accessToken')

    const deleteAnnounce = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/class/announce/${id}`, {
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
                    timer: 500,
                })
                // setTimeout(() => {
                //     window.location.reload()
                // }, 800)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
            Swal.fire('刪除失敗', '', 'warning')
        }
    }

    return { deleteAnnounce }
}

export default useDeleteAnnounce
