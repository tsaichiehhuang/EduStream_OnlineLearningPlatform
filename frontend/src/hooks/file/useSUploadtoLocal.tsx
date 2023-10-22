import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import useStudentSummit from '@/hooks/file/useStudentSummit'
import { string } from 'yup'

const apiUrl = process.env.API_DOMAIN

function useSUploadtoLocal() {
    const router = useRouter()
    const token = Cookies.get('accessToken')
    const classid = Cookies.get('classId')
    const { studentsummit } = useStudentSummit()

    const suploadtolocal = async (id: string, file: File, hwid: string) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('file', file)

        try {
            const response = await fetch(`${apiUrl}/file/upload/binary`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData, // 使用 FormData 作為請求主體
            })

            const responseData = await response.json()
            if (response.ok) {
                studentsummit(id, hwid)
                console.log('檔案上傳本地端成功')
            } else {
                console.log('檔案上傳本地端失敗')
                studentsummit(id, hwid)
            }
        } catch (error) {
            studentsummit(id, hwid)
            console.log('網路請求錯誤')
        }
    }

    return { suploadtolocal }
}

export default useSUploadtoLocal
