import React from 'react'

function getFileIcon(filePath: string) {
    const extension = filePath.split('.').pop()
    if (extension) {
        switch (extension) {
            case 'pdf':
            case 'ppt':
            case 'pptx':
            case 'doc':
                return (
                    <div className="w-[24px] h-[24px] bg-mainGreen rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 8 10" fill="none">
                            <path
                                d="M4.5 3.5V0.75L7.25 3.5M1 0C0.445 0 0 0.445 0 1V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H7C7.26522 10 7.51957 9.89464 7.70711 9.70711C7.89464 9.51957 8 9.26522 8 9V3L5 0H1Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                )
            case 'mp4':
            case 'mov':
                return (
                    <div className="w-[24px] h-[24px] bg-mainBlue rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21" fill="none">
                            <path
                                d="M7.21875 15.0936C7.0447 15.0936 6.87778 15.0245 6.75471 14.9014C6.63164 14.7784 6.5625 14.6114 6.5625 14.4374V6.56239C6.56256 6.45057 6.59119 6.34062 6.64568 6.24298C6.70016 6.14533 6.77869 6.06323 6.87382 6.00445C6.96895 5.94568 7.07752 5.91219 7.18922 5.90716C7.30093 5.90213 7.41207 5.92572 7.51209 5.97571L15.3871 9.91321C15.496 9.96777 15.5875 10.0515 15.6515 10.1551C15.7154 10.2588 15.7493 10.3781 15.7493 10.4999C15.7493 10.6217 15.7154 10.741 15.6515 10.8446C15.5875 10.9483 15.496 11.032 15.3871 11.0866L7.51209 15.0241C7.42103 15.0697 7.3206 15.0935 7.21875 15.0936Z"
                                fill="white"
                            />
                            <path
                                d="M10.5 1.3125C8.68289 1.3125 6.90658 1.85134 5.3957 2.86087C3.88483 3.87041 2.70724 5.3053 2.01186 6.9841C1.31648 8.66289 1.13454 10.5102 1.48904 12.2924C1.84354 14.0746 2.71857 15.7116 4.00346 16.9965C5.28836 18.2814 6.92541 19.1565 8.70761 19.511C10.4898 19.8655 12.3371 19.6835 14.0159 18.9881C15.6947 18.2928 17.1296 17.1152 18.1391 15.6043C19.1487 14.0934 19.6875 12.3171 19.6875 10.5C19.6875 8.06332 18.7195 5.72645 16.9965 4.00346C15.2736 2.28047 12.9367 1.3125 10.5 1.3125ZM15.3871 11.0873L7.5121 15.0248C7.41202 15.0749 7.30082 15.0984 7.18906 15.0934C7.0773 15.0883 6.96869 15.0548 6.87355 14.9959C6.7784 14.9371 6.69988 14.8549 6.64544 14.7571C6.591 14.6594 6.56245 14.5494 6.5625 14.4375V6.5625C6.56256 6.45068 6.5912 6.34073 6.64568 6.24308C6.70017 6.14544 6.7787 6.06333 6.87383 6.00456C6.96895 5.94579 7.07752 5.9123 7.18923 5.90727C7.30093 5.90223 7.41207 5.92583 7.5121 5.97581L15.3871 9.91331C15.496 9.96787 15.5875 10.0516 15.6515 10.1553C15.7154 10.2589 15.7493 10.3782 15.7493 10.5C15.7493 10.6218 15.7154 10.7411 15.6515 10.8447C15.5875 10.9484 15.496 11.0321 15.3871 11.0867V11.0873Z"
                                fill="#6689CB"
                            />
                        </svg>
                    </div>
                )
            case 'jpg':
            case 'png':
            case 'jpeg':
                return (
                    <div className="w-[24px] h-[24px] bg-mainBlue rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M13.9035 12.5966V3.44891C13.9035 2.73016 13.3154 2.14209 12.5966 2.14209H3.44891C2.73016 2.14209 2.14209 2.73016 2.14209 3.44891V12.5966C2.14209 13.3154 2.73016 13.9035 3.44891 13.9035H12.5966C13.3154 13.9035 13.9035 13.3154 13.9035 12.5966ZM5.73584 9.00289L7.36936 10.9696L9.65629 8.02277L12.5966 11.9432H3.44891L5.73584 9.00289Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                )
            default:
                return null
        }
    }

    return null
}
export default getFileIcon
