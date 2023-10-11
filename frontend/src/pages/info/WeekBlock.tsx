import React from 'react'
import { Card, CardHeader, CardBody, Divider, Link, Button } from '@nextui-org/react'
import getFileIcon from './fileUtils'
interface File {
    name: string
    path: string
}
interface WeekData {
    week: number
    description: string
    file: File[]
    hw: { name: string; endTime: string; done: boolean; uploadTime: string }[]
}
interface WeekBlockProps {
    data: WeekData
}
const WeekBlock: React.FC<WeekBlockProps> = ({ data }) => {
    return (
        <div className="py-4 gap-6 flex flex-col justify-between">
            <h2 className="text-lg gap-4 flex flex-row items-center  font-bold mb-4">
                <div>Week {data.week}</div>
                {data.description}
            </h2>
            {data.file.map((file, index) => (
                <Link className="ml-5 gap-2 " color="foreground" key={index} href="#" underline="hover">
                    {getFileIcon(file.path)}
                    {file.name}
                </Link>
            ))}
            {data.hw.map((hw, index) => (
                <Card key={index} className="p-1 md:w-fit hover:bg-neutral-50 " shadow="sm">
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
                            </div>{' '}
                            {hw.name}
                        </Link>
                    </CardHeader>

                    <CardBody className="gap-1 items-center overflow-visible py-4">
                        <Button
                            color={`${hw.done ? 'success' : 'danger'}`}
                            variant="solid"
                            className="relative  rounded-lg hover:-translate-y-1 md:px-12 after:absolute after:rounded-lg after:inset-0 after:bg-background/40  after:transition  hover:after:scale-150 hover:after:opacity-0"
                        >
                            {hw.done ? (
                                <>
                                    <p className=" text-sm md:flex hidden">繳交完成</p>Submitted {hw.uploadTime}
                                </>
                            ) : (
                                <>
                                    <p className=" text-sm md:flex hidden">尚未繳交</p>Due {hw.endTime}
                                </>
                            )}
                        </Button>
                    </CardBody>
                </Card>
            ))}

            <Divider />
        </div>
    )
}
export default WeekBlock
