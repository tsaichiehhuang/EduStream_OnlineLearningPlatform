import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useDownloadFile() {
    const accessToken = Cookies.get('accessToken')

    const downloadFile = async (fileId: number, fileName: string) => {
        try {
            const response = await fetch(`${apiUrl}/file/${fileId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            if (response.ok) {
                const fileData = await response.blob()

                const blob = new Blob([fileData], { type: response.headers.get('Content-Type')! })

                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.style.display = 'none'
                a.href = url
                a.download = fileName

                document.body.appendChild(a)
                a.click()

                window.URL.revokeObjectURL(url)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { downloadFile }
}

export default useDownloadFile
