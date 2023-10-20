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
    RadioGroup,
    Radio,
    CardBody,
} from '@nextui-org/react'
import { useState } from 'react'
import useCreateClass from '@/hooks/home/useCreateClass'
type AddCourseModalProps = {
    isOpen: any
    onOpenChange: any
}
const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onOpenChange }) => {
    const { createClass } = useCreateClass()
    const [courseName, setCourseName] = useState('')
    const [selectedDay, setSelectedDay] = useState('Mon')
    const [announcement, setAnnouncement] = useState('')
    const requestBody = {
        name: courseName,
        time: selectedDay,
        announcement: announcement,
    }
    const handleSubmit = () => {
        createClass(requestBody)
        onOpenChange(false)
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">新增課程</ModalHeader>
                        <ModalBody>
                            <Input
                                variant="bordered"
                                label="課程名稱"
                                placeholder=" "
                                color="default"
                                labelPlacement="outside"
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <RadioGroup
                                label="選擇上課時間"
                                orientation="horizontal"
                                size="sm"
                                className="text-sm"
                                defaultValue="Mon"
                                onChange={(e) => setSelectedDay(e.target.value)}
                            >
                                <Radio value="Mon">星期一</Radio>
                                <Radio value="Tue">星期二</Radio>
                                <Radio value="Wed">星期三</Radio>
                                <Radio value="Thu">星期四</Radio>
                                <Radio value="Fri">星期五</Radio>
                                <Radio value="Sat">星期六</Radio>
                                <Radio value="tSun">星期日</Radio>
                            </RadioGroup>
                            <Input
                                variant="bordered"
                                label="公告"
                                placeholder="若「無公告」請輸入「無」"
                                color="default"
                                labelPlacement="outside"
                                onChange={(e) => setAnnouncement(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                取消
                            </Button>
                            <Button color="warning" className="text-white" onPress={handleSubmit}>
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
export const AddCourseButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Card shadow="sm" isPressable onPress={onOpen}>
                <CardBody className="overflow-visible p-0 h-[140px] justify-center items-center text-mainOrange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.34498 4.01697C10.4388 3.67403 13.5611 3.67403 16.655 4.01697C18.368 4.20897 19.75 5.55797 19.951 7.27697C20.3179 10.4146 20.3179 13.5843 19.951 16.722C19.8493 17.5572 19.4684 18.3337 18.8702 18.9254C18.2719 19.5171 17.4913 19.8894 16.655 19.982C13.5612 20.326 10.4388 20.326 7.34498 19.982C6.50863 19.8894 5.72806 19.5171 5.1298 18.9254C4.53155 18.3337 4.15069 17.5572 4.04898 16.722C3.68208 13.5847 3.68208 10.4153 4.04898 7.27797C4.15065 6.44284 4.53136 5.66651 5.12941 5.07481C5.72747 4.48311 6.50781 4.11071 7.34398 4.01797L7.34498 4.01697ZM12 7.00697C12.1989 7.00697 12.3897 7.08599 12.5303 7.22664C12.671 7.36729 12.75 7.55806 12.75 7.75697V11.25H16.243C16.4419 11.25 16.6327 11.329 16.7733 11.4696C16.914 11.6103 16.993 11.8011 16.993 12C16.993 12.1989 16.914 12.3896 16.7733 12.5303C16.6327 12.671 16.4419 12.75 16.243 12.75H12.75V16.243C12.75 16.4419 12.671 16.6326 12.5303 16.7733C12.3897 16.914 12.1989 16.993 12 16.993C11.8011 16.993 11.6103 16.914 11.4697 16.7733C11.329 16.6326 11.25 16.4419 11.25 16.243V12.75H7.75698C7.55807 12.75 7.3673 12.671 7.22665 12.5303C7.086 12.3896 7.00698 12.1989 7.00698 12C7.00698 11.8011 7.086 11.6103 7.22665 11.4696C7.3673 11.329 7.55807 11.25 7.75698 11.25H11.25V7.75697C11.25 7.55806 11.329 7.36729 11.4697 7.22664C11.6103 7.08599 11.8011 7.00697 12 7.00697Z"
                            fill="#F2A660"
                        />
                    </svg>
                    新增課程
                </CardBody>
            </Card>

            <AddCourseModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}
