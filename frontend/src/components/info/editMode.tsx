import { Button } from '@nextui-org/react'

export const Edit = () => {
    return (
        <Button
            size="sm"
            className="bg-transparent w-fit rounded-full border border-zinc-400 flex-row flex items-center  box-border	gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                    d="M5.00663 10.2895H11.375V11.3728H1.625V9.07504L6.9875 3.71254L9.28525 6.01084L5.00608 10.29L5.00663 10.2895ZM7.75287 2.94663L8.90229 1.79775C9.00387 1.69621 9.14162 1.63916 9.28525 1.63916C9.42888 1.63916 9.56663 1.69621 9.66821 1.79775L11.2006 3.32959C11.3021 3.43116 11.3592 3.56891 11.3592 3.71254C11.3592 3.85618 11.3021 3.99393 11.2006 4.0955L10.0512 5.24492L7.75342 2.94663H7.75287Z"
                    fill="#B0B0B0"
                />
            </svg>
            <div className="text-zinc-400 text-[8px] font-normal font-['Noto Sans TC']">編輯</div>
        </Button>
    )
}
export const Delete = () => {
    return (
        <Button
            size="sm"
            className="bg-transparent w-fit rounded-full border border-zinc-400 flex-row flex items-center  box-border	gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                    d="M3.79175 11.375C3.49383 11.375 3.23871 11.2688 3.02637 11.0565C2.81404 10.8442 2.70805 10.5892 2.70841 10.2917V3.25H2.16675V2.16667H4.87508V1.625H8.12508V2.16667H10.8334V3.25H10.2917V10.2917C10.2917 10.5896 10.1856 10.8447 9.97325 11.057C9.76091 11.2694 9.50597 11.3754 9.20841 11.375H3.79175ZM4.87508 9.20833H5.95841V4.33333H4.87508V9.20833ZM7.04175 9.20833H8.12508V4.33333H7.04175V9.20833Z"
                    fill="#B0B0B0"
                />
            </svg>
            <div className="text-zinc-400 text-[8px] font-normal font-['Noto Sans TC']">刪除</div>
        </Button>
    )
}
