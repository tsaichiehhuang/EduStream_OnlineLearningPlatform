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
    Tooltip,
} from '@nextui-org/react'
import { useState } from 'react'
import { LocalizationProvider, DateTimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { customTheme } from '@/components/info/CustomTheme'
import useCreateHW from '@/hooks/Info/useCreateHW'
import useUploadFile from '@/hooks/Info/useUploadFile'
import useTeacherUpload from '@/hooks/file/useTeacherUpload'
import { File } from 'buffer'

type AddFileModalProps = {
    isOpen: any
    onOpenChange: any
    status: string
    sectionId: any
    classId: number | null
}

const AddFileModal: React.FC<AddFileModalProps> = ({ isOpen, onOpenChange, status, sectionId, classId }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [title, setTitle] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const { createHW } = useCreateHW()
    const outerTheme = useTheme()
    const [selectedFile, setSelectedFile] = useState<any>(null)
    // const [fileName, setFileName] = useState<string>(selectedFile.name)
    const uploadFile = useUploadFile()
    const { teacherupload } = useTeacherUpload()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    const handleCloseModal = () => {
        setSelectedFile(null)
        onOpenChange(false)
    }
    const requestBody = {
        title: title,
        endTime: time,
        description: description,
        sectionId: sectionId,
    }
    const handleSubmit = () => {
        createHW(requestBody, classId)
        // onOpenChange(false)
    }
    const addFileRequestBody = {
        // name: fileName,
        size: selectedFile,
        //block id
    }

    const handleAddFile = () => {
        teacherupload(selectedFile.name, selectedFile, sectionId)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {status === 'submitted' ? '新增繳交區' : '新增資源'}
                        </ModalHeader>
                        <ModalBody>
                            {status === 'submitted' ? (
                                <>
                                    <div className="text-sm flex-row flex items-center gap-1">
                                        標題<div className="text-red-500 text-xs">* 必填</div>
                                    </div>
                                    <Input
                                        variant="bordered"
                                        label=""
                                        placeholder=" "
                                        color="default"
                                        labelPlacement="outside"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <div className="text-sm flex-row flex items-center gap-1">
                                        說明<div className="text-red-500 text-xs">* 必填</div>
                                    </div>
                                    <Textarea
                                        label=""
                                        variant="bordered"
                                        labelPlacement="outside"
                                        placeholder="輸入說明，若無說明請填寫「無」"
                                        className="max-w-full"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <div className="text-sm flex-row flex items-center gap-1">
                                        到期日期<div className="text-red-500 text-xs">* 必填</div>
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
                                        <ThemeProvider theme={customTheme(outerTheme)}>
                                            <DateTimeField
                                                label=""
                                                defaultValue={dayjs(selectedDate)} //Fri Jan 18 2023 23:13:40 GMT+0800 (台北標準時間)
                                                onChange={(value: any) => setTime(value)}
                                            />
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                </>
                            ) : (
                                <>
                                    <p>上傳檔案</p>
                                    <Button variant="bordered" color="warning" className="text-warning  hover:shadow ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                        >
                                            <g clip-path="url(#clip0_135_102)">
                                                <path
                                                    d="M6.5625 12.5C6.5625 12.7486 6.66127 12.9871 6.83709 13.1629C7.0129 13.3387 7.25136 13.4375 7.5 13.4375C7.74864 13.4375 7.9871 13.3387 8.16291 13.1629C8.33873 12.9871 8.4375 12.7486 8.4375 12.5V8.4375H12.5C12.7486 8.4375 12.9871 8.33873 13.1629 8.16291C13.3387 7.9871 13.4375 7.74864 13.4375 7.5C13.4375 7.25136 13.3387 7.0129 13.1629 6.83709C12.9871 6.66127 12.7486 6.5625 12.5 6.5625H8.4375V2.5C8.4375 2.25136 8.33873 2.0129 8.16291 1.83709C7.9871 1.66127 7.74864 1.5625 7.5 1.5625C7.25136 1.5625 7.0129 1.66127 6.83709 1.83709C6.66127 2.0129 6.5625 2.25136 6.5625 2.5V6.5625H2.5C2.25136 6.5625 2.0129 6.66127 1.83709 6.83709C1.66127 7.0129 1.5625 7.25136 1.5625 7.5C1.5625 7.74864 1.66127 7.9871 1.83709 8.16291C2.0129 8.33873 2.25136 8.4375 2.5 8.4375H6.5625V12.5Z"
                                                    fill="#F2A660"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_135_102">
                                                    <rect width="15" height="15" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <label
                                            htmlFor="fileInput"
                                            className="cursor-pointer bg-transparent  px-4 py-2 rounded-lg w-full "
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
                                    {selectedFile && <div className="mt-2">已選擇: {selectedFile.name}</div>}
                                    <Input
                                        variant="bordered"
                                        label="更改檔案名稱(Optional)"
                                        placeholder=" "
                                        color="default"
                                        labelPlacement="outside"
                                        // onChange={(value: any) => setFileName(value)}
                                    />
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={handleCloseModal}>
                                取消
                            </Button>
                            <Button
                                color="warning"
                                className="text-white"
                                onPress={status === 'submitted' ? handleSubmit : handleAddFile}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.73305 3.68206C9.56909 3.3677 12.4312 3.3677 15.2672 3.68206C16.8375 3.85806 18.1043 5.09464 18.2886 6.67039C18.6249 9.54656 18.6249 12.4521 18.2886 15.3283C18.1953 16.094 17.8462 16.8057 17.2978 17.3481C16.7494 17.8905 16.0339 18.2318 15.2672 18.3166C12.4312 18.632 9.56904 18.632 6.73305 18.3166C5.9664 18.2318 5.25087 17.8905 4.70247 17.3481C4.15407 16.8057 3.80495 16.094 3.71172 15.3283C3.37539 12.4524 3.37539 9.54717 3.71172 6.67131C3.80491 5.90577 4.1539 5.19414 4.70212 4.65175C5.25033 4.10936 5.96565 3.76799 6.73214 3.68297L6.73305 3.68206ZM11.0001 6.42289C11.1825 6.42289 11.3573 6.49532 11.4863 6.62426C11.6152 6.75319 11.6876 6.92806 11.6876 7.11039V10.3123H14.8896C15.0719 10.3123 15.2468 10.3847 15.3757 10.5137C15.5046 10.6426 15.5771 10.8175 15.5771 10.9998C15.5771 11.1821 15.5046 11.357 15.3757 11.4859C15.2468 11.6149 15.0719 11.6873 14.8896 11.6873H11.6876V14.8892C11.6876 15.0716 11.6152 15.2464 11.4863 15.3754C11.3573 15.5043 11.1825 15.5767 11.0001 15.5767C10.8178 15.5767 10.6429 15.5043 10.514 15.3754C10.3851 15.2464 10.3126 15.0716 10.3126 14.8892V11.6873H7.11072C6.92838 11.6873 6.75351 11.6149 6.62458 11.4859C6.49565 11.357 6.42322 11.1821 6.42322 10.9998C6.42322 10.8175 6.49565 10.6426 6.62458 10.5137C6.75351 10.3847 6.92838 10.3123 7.11072 10.3123H10.3126V7.11039C10.3126 6.92806 10.3851 6.75319 10.514 6.62426C10.6429 6.49532 10.8178 6.42289 11.0001 6.42289Z"
                                        fill="white"
                                    />
                                </svg>
                                確定新增
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export const AddSubmittedArea = (sectionId: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    console.log(sectionId)
    return (
        <>
            <Tooltip
                showArrow={true}
                content="新增作業或資料繳交區"
                delay={0}
                closeDelay={0}
                placement="bottom"
                className="bg-yellow-300"
            >
                <Button
                    size="sm"
                    onPress={onOpen}
                    color="warning"
                    className="text-white hover:bg-warning-300 hover:shadow-lg "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                        <path
                            d="M1.99976 11H8.99976C9.26497 11 9.51933 10.8946 9.70686 10.7071C9.8944 10.5196 9.99976 10.2652 9.99976 10V3.75L7.24976 1H2.99976C2.73454 1 2.48019 1.10536 2.29265 1.29289C2.10511 1.48043 1.99976 1.73478 1.99976 2V4"
                            stroke="#Ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7 1V4H10M1 7.5H6M6 7.5L4.5 9M6 7.5L4.5 6"
                            stroke="#Ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <g clip-path="url(#clip0_120_195)">
                          <path
                              d="M6.5625 12.5C6.5625 12.7486 6.66127 12.9871 6.83709 13.1629C7.0129 13.3387 7.25136 13.4375 7.5 13.4375C7.74864 13.4375 7.9871 13.3387 8.16291 13.1629C8.33873 12.9871 8.4375 12.7486 8.4375 12.5V8.4375H12.5C12.7486 8.4375 12.9871 8.33873 13.1629 8.16291C13.3387 7.9871 13.4375 7.74864 13.4375 7.5C13.4375 7.25136 13.3387 7.0129 13.1629 6.83709C12.9871 6.66127 12.7486 6.5625 12.5 6.5625H8.4375V2.5C8.4375 2.25136 8.33873 2.0129 8.16291 1.83709C7.9871 1.66127 7.74864 1.5625 7.5 1.5625C7.25136 1.5625 7.0129 1.66127 6.83709 1.83709C6.66127 2.0129 6.5625 2.25136 6.5625 2.5V6.5625H2.5C2.25136 6.5625 2.0129 6.66127 1.83709 6.83709C1.66127 7.0129 1.5625 7.25136 1.5625 7.5C1.5625 7.74864 1.66127 7.9871 1.83709 8.16291C2.0129 8.33873 2.25136 8.4375 2.5 8.4375H6.5625V12.5Z"
                              fill="white"
                          />
                      </g>
                      <defs>
                          <clipPath id="clip0_120_195">
                              <rect width="15" height="15" fill="white" />
                          </clipPath>
                      </defs>
                  </svg> */}
                    新增繳交區
                </Button>
            </Tooltip>
            <AddFileModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                status="submitted"
                sectionId={sectionId.sectionId}
                classId={sectionId.classId}
            />
        </>
    )
}
export const AddFileButton = (sectionId: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Tooltip
                showArrow={true}
                content="新增講義、影片等等資源"
                delay={0}
                closeDelay={0}
                placement="bottom"
                className="bg-yellow-300"
            >
                <Button
                    size="sm"
                    onPress={onOpen}
                    color="warning"
                    className="text-white hover:bg-warning-300 hover:shadow-lg "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <g clip-path="url(#clip0_120_195)">
                            <path
                                d="M6.5625 12.5C6.5625 12.7486 6.66127 12.9871 6.83709 13.1629C7.0129 13.3387 7.25136 13.4375 7.5 13.4375C7.74864 13.4375 7.9871 13.3387 8.16291 13.1629C8.33873 12.9871 8.4375 12.7486 8.4375 12.5V8.4375H12.5C12.7486 8.4375 12.9871 8.33873 13.1629 8.16291C13.3387 7.9871 13.4375 7.74864 13.4375 7.5C13.4375 7.25136 13.3387 7.0129 13.1629 6.83709C12.9871 6.66127 12.7486 6.5625 12.5 6.5625H8.4375V2.5C8.4375 2.25136 8.33873 2.0129 8.16291 1.83709C7.9871 1.66127 7.74864 1.5625 7.5 1.5625C7.25136 1.5625 7.0129 1.66127 6.83709 1.83709C6.66127 2.0129 6.5625 2.25136 6.5625 2.5V6.5625H2.5C2.25136 6.5625 2.0129 6.66127 1.83709 6.83709C1.66127 7.0129 1.5625 7.25136 1.5625 7.5C1.5625 7.74864 1.66127 7.9871 1.83709 8.16291C2.0129 8.33873 2.25136 8.4375 2.5 8.4375H6.5625V12.5Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_120_195">
                                <rect width="15" height="15" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    新增資源
                </Button>
            </Tooltip>
            <AddFileModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                status="addFile"
                sectionId={sectionId.sectionId}
                classId={null}
            />
        </>
    )
}
