import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useUpdateAnnounce() {
    const updateAnnounce = async (title: any, id: any) => {
        const accessToken = Cookies.get('accessToken')

        try {
            const response = await fetch(`${apiUrl}/class/announce/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: title }),
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '更新成功',
                    showConfirmButton: false,
                    timer: 1000,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } catch (error) {
            Swal.fire('更新失敗', '', 'warning')

            console.error('Error fetching class data:', error)
        }
    }

    return { updateAnnounce }
}

export default useUpdateAnnounce
