import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from '@nextui-org/react'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import { Delete, Edit } from '@/components/info/EditMode'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

type SubmitAreaProps = {
    data: any
    key: any
    editMode: any
}
type AddFileModalProps = {
    isOpen: any
    onOpenChange: any
    data: any
}
const userRole = Cookies.get('userRole')
const AddFileModal: React.FC<AddFileModalProps> = ({ isOpen, onOpenChange, data }) => {
    const [selectedFile, setSelectedFile] = useState<any>(null)

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    const handleCloseModal = () => {
        setSelectedFile(null)
        onOpenChange(false)
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">上傳檔案：{data.name}</ModalHeader>
                        <ModalBody>
                            <p className="text-sm">詳細說明</p>
                            <p className="text-sm text-gray-500">{data.description}</p>
                            <p className="text-sm">繳交資料</p>
                            {userRole === 'student' && (
                                <>
                                    <Divider />
                                    <p className="text-sm">上傳檔案</p>
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
                                    {data.done && !selectedFile && (
                                        <div className="my-2 text-mainOrange">已選擇: {data.name}</div>
                                    )}
                                    {selectedFile && (
                                        <div className="my-2 text-mainOrange">已選擇: {selectedFile.name}</div>
                                    )}
                                    <Input
                                        variant="bordered"
                                        label="更改檔案名稱(Optional)"
                                        placeholder=" "
                                        color="default"
                                        labelPlacement="outside"
                                    />
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={handleCloseModal}>
                                取消
                            </Button>
                            <Button color="warning" className="text-white" onPress={onClose}>
                                確定
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export const SubmitArea: React.FC<SubmitAreaProps> = ({ data, key, editMode }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [userRole, setUserRole] = useState<string | null>('')

    useEffect(() => {
        setUserRole(Cookies.get('userRole'))
    }, [])
    return (
        <>
            <div className="flex flex-row justify-between">
                <Card onPress={onOpen} isPressable className="p-1 md:w-fit hover:bg-neutral-50 " shadow="sm">
                    <CardHeader className="pb-0 pt-2 px-4 flex-row items-start ">
                        <Link onPress={onOpen} className=" gap-2 cursor-pointer" color="foreground" underline="hover">
                            <div className="w-[24px] h-[24px] bg-mainOrange rounded-full flex justify-center items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="16"
                                    viewBox="0 0 11 12"
                                    fill="none"
                                >
                                    <path
                                        d="M1.99976 11H8.99976C9.26497 11 9.51933 10.8946 9.70686 10.7071C9.8944 10.5196 9.99976 10.2652 9.99976 10V3.75L7.24976 1H2.99976C2.73454 1 2.48019 1.10536 2.29265 1.29289C2.10511 1.48043 1.99976 1.73478 1.99976 2V4"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M7 1V4H10M1 7.5H6M6 7.5L4.5 9M6 7.5L4.5 6"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            {data.name}
                        </Link>
                    </CardHeader>
                    {userRole === 'student' && (
                        <CardBody className="gap-1 items-center overflow-visible py-4">
                            <Button
                                onPress={onOpen}
                                color={`${data.done ? 'success' : 'danger'}`}
                                variant="solid"
                                className="relative  rounded-lg hover:-translate-y-1 md:px-12 after:absolute after:rounded-lg after:inset-0 after:bg-background/40  after:transition  hover:after:scale-150 hover:after:opacity-0"
                            >
                                {data.done ? (
                                    <>
                                        <p className=" text-sm md:flex hidden">繳交完成</p>Submitted {data.uploadTime}
                                    </>
                                ) : (
                                    <>
                                        <p className=" text-sm md:flex hidden">尚未繳交</p>Due{' '}
                                        {dayjs(data.endTime).format('YYYY年MM月DD日')}
                                    </>
                                )}
                            </Button>
                        </CardBody>
                    )}
                </Card>
                {editMode && (
                    <div className="gap-1 flex flex-row items-start">
                        <Delete />
                        <Edit file={data} status="submit" />
                    </div>
                )}
            </div>

            <AddFileModal isOpen={isOpen} onOpenChange={onOpenChange} data={data} />
        </>
    )
}
