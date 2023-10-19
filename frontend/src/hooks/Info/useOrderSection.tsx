import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const apiUrl = process.env.API_DOMAIN

function useOrderSection() {
    const orderSection = async (requestbody: any, id: any) => {
        const accessToken = Cookies.get('accessToken')

        try {
            const response = await fetch(`${apiUrl}/class/${id}/section/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestbody),
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '更新成功',
                    showConfirmButton: false,
                    timer: 500,
                })
                // setTimeout(() => {
                //     window.location.reload()
                // }, 600)
            }
        } catch (error) {
            Swal.fire('更新失敗', '', 'warning')

            console.error('Error fetching class data:', error)
        }
    }

    return { orderSection }
}

export default useOrderSection
