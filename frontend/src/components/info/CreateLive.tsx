import Cookies from 'js-cookie'
import useCreateLive from '@/hooks/live/useCreateLive'
import { useState, useEffect } from 'react'
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
} from '@nextui-org/react'
type AddBlockModalProps = {
    isOpen: any
    onOpenChange: any
}

const classid = Cookies.get('classId')

const AddBlockModal: React.FC<AddBlockModalProps> = ({ isOpen, onOpenChange }) => {
    const { createlive } = useCreateLive()
    const [name, setname] = useState('')

    const handlename = (event: React.ChangeEvent<HTMLInputElement>) => {
        setname(event.target.value)
    }

    const handleCreateLive = () => {
        createlive(name, classid)
        onOpenChange(false)
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">新增直播</ModalHeader>
                        <ModalBody>
                            <Input
                                variant="bordered"
                                label="直播標題"
                                placeholder=" "
                                color="default"
                                labelPlacement="outside"
                                onChange={handlename}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                取消
                            </Button>
                            <Button onClick={handleCreateLive} color="primary" className="text-white" onPress={onClose}>
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
                                確定新增直播
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export const CreateLiveButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} className="w-full" size="lg" color="primary" variant="shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 1.5C9.9233 1.5 7.89323 2.11581 6.16652 3.26957C4.4398 4.42332 3.09399 6.0632 2.29927 7.98182C1.50455 9.90045 1.29661 12.0116 1.70176 14.0484C2.1069 16.0852 3.10693 17.9562 4.57538 19.4246C6.04383 20.8931 7.91476 21.8931 9.95156 22.2982C11.9884 22.7034 14.0996 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3938 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM17.5853 12.6713L8.58525 17.1713C8.47088 17.2284 8.3438 17.2554 8.21607 17.2496C8.08835 17.2438 7.96422 17.2055 7.85548 17.1382C7.74674 17.0709 7.65701 16.977 7.59479 16.8653C7.53257 16.7536 7.49995 16.6279 7.5 16.5V7.5C7.50007 7.37221 7.53279 7.24655 7.59506 7.13495C7.65733 7.02336 7.74708 6.92952 7.8558 6.86235C7.96452 6.79519 8.0886 6.75691 8.21626 6.75116C8.34392 6.74541 8.47094 6.77238 8.58525 6.8295L17.5853 11.3295C17.7097 11.3919 17.8143 11.4876 17.8874 11.606C17.9605 11.7244 17.9992 11.8608 17.9992 12C17.9992 12.1392 17.9605 12.2756 17.8874 12.394C17.8143 12.5124 17.7097 12.6081 17.5853 12.6705V12.6713Z"
                        fill="white"
                    />
                </svg>
                線上教學
            </Button>
            <AddBlockModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}
