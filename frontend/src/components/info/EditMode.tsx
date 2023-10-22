import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Card,
    Textarea,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import { type } from 'os'
import { DesktopDatePicker, LocalizationProvider, DateTimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles'
import { customTheme } from './CustomTheme'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import useUpdateSection from '@/hooks/Info/useUpdateSection'
import useUpdateAnnounce from '@/hooks/Info/useUpdateAnnounce'
import useDeleteSection from '@/hooks/Info/useDeleteSection'
import useDeleteAnnounce from '@/hooks/Info/useDeleteAnnounce'
import useDeleteHW from '@/hooks/Info/useDeleteHW'
import useUpdateHW from '@/hooks/Info/useUpdateHW'
import Cookies from 'js-cookie'
import useTeacherDelete from '@/hooks/file/useTeacherDelete'
import useTeacherUpload from '@/hooks/file/useTeacherUpload'

type EditModalProps = {
    isOpen: any
    onOpenChange: any
    file: any
    status: string
    id: number | null
    sectionId: any
}
type DeleteModalProps = {
    isOpen: any
    onOpenChange: any
    id: any
    status: any
    fileId: any
}
const EditModal: React.FC<EditModalProps> = ({ isOpen, onOpenChange, file, status, id, sectionId }) => {
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const outerTheme = useTheme()
    const [selectedDate, setSelectedDate] = useState<string>('')
    const { updateSection } = useUpdateSection()
    const { updateAnnounce } = useUpdateAnnounce()
    const { updateHW } = useUpdateHW()
    const { teacherDelete } = useTeacherDelete()
    const [deleteFile, setDeleteFile] = useState<boolean>(false) //老師編輯檔案
    const { teacherupload } = useTeacherUpload()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    const handleDateValue = (date: any) => {
        setSelectedDate(date)
    }
    const handleCloseModal = () => {
        setSelectedFile(null)
        onOpenChange(false)
    }
    const updateHWReqestBody = {
        title: title,
        description: description,
        endTime: selectedDate,
    }
    const handleSubmit = () => {
        if (status === 'title') {
            updateSection(title, id)
        } else if (status === 'announce') {
            updateAnnounce(title, id)
        } else {
            updateHW(updateHWReqestBody, id)
        }
    }
    const handleTeachDelete = (fileId: number) => {
        teacherDelete(fileId)
        //發刪除api&前端即時更新
        setDeleteFile(true)
    }

    const handleAddFile = () => {
        teacherupload(selectedFile.name, selectedFile, sectionId)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">編輯</ModalHeader>
                        <ModalBody>
                            {status !== 'file' && (
                                <Input
                                    variant="bordered"
                                    label={
                                        status === 'announce'
                                            ? '更改公告'
                                            : status === 'title'
                                            ? '更改標題'
                                            : '更改名稱'
                                    }
                                    defaultValue={
                                        status === 'announce'
                                            ? file.announcement.content
                                            : status === 'defaultAnnounce'
                                            ? file
                                            : status === 'title'
                                            ? file
                                            : status === 'file'
                                            ? file.file.name
                                            : file.homework.title
                                    }
                                    color="default"
                                    labelPlacement="outside"
                                    className="mt-4"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            )}
                            {status === 'submit' && <Divider className="text-darkGray">or</Divider>}
                            {status === 'file' ? (
                                <>
                                    {deleteFile && (
                                        <>
                                            <p className="text-sm">更改檔案</p>
                                            <Button
                                                variant="bordered"
                                                color="warning"
                                                className="text-warning hover:shadow"
                                            >
                                                <label
                                                    htmlFor="fileInput"
                                                    className="cursor-pointer bg-transparent px-4 py-2 rounded-lg w-full"
                                                >
                                                    選擇檔案
                                                </label>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                        </>
                                    )}
                                    {file.file.name && !deleteFile && !selectedFile && (
                                        <div className="mt-2 flex-row flex gap-4 items-center">
                                            <div className="text-sm">已選擇: {file.file.name}</div>
                                            <Button size="sm" onPress={() => handleTeachDelete(file.file.id)}>
                                                刪除檔案
                                            </Button>
                                        </div>
                                    )}

                                    {selectedFile && <div className="mt-2">已選擇: {selectedFile.name}</div>}
                                </>
                            ) : (
                                status === 'submit' && (
                                    <>
                                        <Textarea
                                            variant="bordered"
                                            label="更改說明"
                                            defaultValue={file.homework.description}
                                            color="default"
                                            labelPlacement="outside"
                                            className="mt-4"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <Divider className="text-darkGray">or</Divider>

                                        <p className="text-sm">更改到期日期</p>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
                                            <ThemeProvider theme={customTheme(outerTheme)}>
                                                <DateTimeField
                                                    label=""
                                                    defaultValue={dayjs(file.homework.endTime)} //Fri Jan 18 2023 23:13:40 GMT+0800 (台北標準時間)
                                                    onChange={handleDateValue}
                                                />
                                            </ThemeProvider>
                                        </LocalizationProvider>
                                    </>
                                )
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={handleCloseModal}>
                                取消
                            </Button>
                            <Button
                                color="primary"
                                className="text-white"
                                onPress={status === 'file' ? handleAddFile : handleSubmit}
                            >
                                確定
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onOpenChange, id, fileId, status }) => {
    const { deleteSection } = useDeleteSection()
    const { deleteAnnounce } = useDeleteAnnounce()
    const { deleteHW } = useDeleteHW()
    const { teacherDelete } = useTeacherDelete()
    const [cStatus, setCStatus] = useState<any>('')
    useEffect(() => {
        setCStatus(Cookies.get('status'))
    }, [isOpen])

    const handleTeachDelete = (fileId: any) => {
        teacherDelete(fileId.id)
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader></ModalHeader>
                        <ModalBody className="flex justify-center items-center text-mainBlue text-lg font-bold">
                            {status === 'title' ? '確定刪除該課程進度？' : '確定刪除？'}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                取消
                            </Button>

                            <Button
                                className="text-white"
                                onPress={
                                    status === 'submit'
                                        ? () => deleteHW(id)
                                        : cStatus === 'announce'
                                        ? () => deleteAnnounce(id)
                                        : cStatus === 'title'
                                        ? () => deleteSection(id)
                                        : () => handleTeachDelete(fileId)
                                }
                            >
                                確定
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
type EditProps = {
    file: any
    status: string
    id: number | null
    sectionId: any
}
export const Edit: React.FC<EditProps> = ({ file, status, id, sectionId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                size="sm"
                className="bg-transparent w-fit rounded-full border border-zinc-400 flex-row flex items-center  box-border	gap-2 text-zinc-400 text-[8px] font-normal font-['Noto Sans TC']"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                        d="M5.00663 10.2895H11.375V11.3728H1.625V9.07504L6.9875 3.71254L9.28525 6.01084L5.00608 10.29L5.00663 10.2895ZM7.75287 2.94663L8.90229 1.79775C9.00387 1.69621 9.14162 1.63916 9.28525 1.63916C9.42888 1.63916 9.56663 1.69621 9.66821 1.79775L11.2006 3.32959C11.3021 3.43116 11.3592 3.56891 11.3592 3.71254C11.3592 3.85618 11.3021 3.99393 11.2006 4.0955L10.0512 5.24492L7.75342 2.94663H7.75287Z"
                        fill="#B0B0B0"
                    />
                </svg>
                <div className="text-zinc-400 text-[8px] font-normal font-['Noto Sans TC']">編輯</div>
            </Button>
            <EditModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                file={file}
                status={status}
                id={id}
                sectionId={sectionId}
            />
        </>
    )
}
export const Delete = (id: any, status: string) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Button
                onPress={onOpen}
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
            <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={id.id} status={status} fileId={id} />
        </>
    )
}
