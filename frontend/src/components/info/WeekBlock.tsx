import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import getFileIcon from './fileUtils'
import { Delete, Edit } from './EditMode'
import { AddSubmittedArea, AddFileButton } from './AddFile'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

type WeekBlockProps = {
    data: WeekData
    editMode: boolean
}

const WeekBlock: React.FC<WeekBlockProps> = ({ data, editMode }) => {
    return (
        <Card className=" bg-white rounded-[10px]  w-full mt-5  md:mt-0 py-8 md:px-12 border-none" shadow="sm">
            <CardHeader className="justify-between  flex flex-row  ">
                <div className="text-lg gap-4 flex flex-row items-center  font-bold mb-4">
                    <div>{data.title}</div>
                </div>
                {editMode && (
                    <div className="gap-1 flex flex-row items-start">
                        <Delete />
                        <Edit status="title" file={data.title} />
                    </div>
                )}
            </CardHeader>
            <CardBody className=" gap-6 flex flex-col justify-between">
                {data.file.map((file, index) => (
                    <div key={index} className="flex flex-row justify-between">
                        <Link className="ml-5 gap-2 " color="foreground" href="#" underline="hover">
                            {getFileIcon(file.path)}
                            {file.name}
                        </Link>
                        {editMode && (
                            <div className="gap-1 flex flex-row items-start">
                                <Delete />
                                <Edit file={file} status="file" />
                            </div>
                        )}
                    </div>
                ))}
                {data.submit.map((submit, index) => (
                    <div key={index} className="flex flex-row justify-between">
                        <Card className="p-1 md:w-fit hover:bg-neutral-50 " shadow="sm">
                            <CardHeader className="pb-0 pt-2 px-4 flex-row items-start ">
                                <Link key={index} className=" gap-2" color="foreground" href="#" underline="hover">
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
                                    {submit.name}
                                </Link>
                            </CardHeader>

                            <CardBody className="gap-1 items-center overflow-visible py-4">
                                <Button
                                    color={`${submit.done ? 'success' : 'danger'}`}
                                    variant="solid"
                                    className="relative  rounded-lg hover:-translate-y-1 md:px-12 after:absolute after:rounded-lg after:inset-0 after:bg-background/40  after:transition  hover:after:scale-150 hover:after:opacity-0"
                                >
                                    {submit.done ? (
                                        <>
                                            <p className=" text-sm md:flex hidden">繳交完成</p>Submitted{' '}
                                            {submit.uploadTime}
                                        </>
                                    ) : (
                                        <>
                                            <p className=" text-sm md:flex hidden">尚未繳交</p>Due{' '}
                                            {dayjs(submit.endTime).format('YYYY年MM月DD日')}
                                        </>
                                    )}
                                </Button>
                            </CardBody>
                        </Card>
                        {editMode && (
                            <div className="gap-1 flex flex-row items-start">
                                <Delete />
                                <Edit file={submit} status="submit" />
                            </div>
                        )}
                    </div>
                ))}
            </CardBody>
            {editMode && (
                <CardFooter className="justify-end gap-4">
                    <AddSubmittedArea />
                    <AddFileButton />
                </CardFooter>
            )}
        </Card>
    )
}
export default WeekBlock
