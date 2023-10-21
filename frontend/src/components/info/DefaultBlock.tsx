import React, { useEffect } from 'react'
import { Card, CardHeader, CardBody, Divider, Link, Button, Chip, CardFooter } from '@nextui-org/react'
import getFileIcon from './FileUtils'
import { Delete, Edit } from './EditMode'
import { AddSubmittedArea, AddFileButton } from '@/components/info/AddFile'

import { FC } from 'react'

type DefaultBlockProps = {
    data: any
    editMode: boolean
}

const DefaultBlock: FC<DefaultBlockProps> = ({ data, editMode }) => {
    return (
        <Card className=" bg-white rounded-[10px]  w-full mt-5  md:mt-0 py-8 md:px-12 border-none " shadow="sm">
            <CardBody className="  flex gap-4">
                {data.announcement && (
                    <div className="flex flex-row justify-between">
                        <h3 className="gap-4 flex items-center ">
                            <div className="w-[24px] h-[24px] border-1.5 border-mainOrange rounded-full flex justify-center items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_233_80)">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M10.6614 2.00861C11.5508 1.49061 12.6668 2.13128 12.6668 3.16061V5.33328C12.9294 5.33328 13.1895 5.38501 13.4321 5.48552C13.6748 5.58603 13.8953 5.73335 14.081 5.91906C14.2667 6.10478 14.414 6.32526 14.5145 6.56791C14.6151 6.81056 14.6668 7.07064 14.6668 7.33328C14.6668 7.59592 14.6151 7.85599 14.5145 8.09865C14.414 8.3413 14.2667 8.56178 14.081 8.74749C13.8953 8.93321 13.6748 9.08053 13.4321 9.18104C13.1895 9.28155 12.9294 9.33328 12.6668 9.33328V11.3333C12.6668 12.4319 11.4128 13.0593 10.5334 12.3999L9.16012 11.3693C8.42602 10.8189 7.57128 10.4514 6.66678 10.2973V12.1933C6.66686 12.6291 6.50938 13.0503 6.22338 13.3791C5.93739 13.708 5.54215 13.9224 5.11053 13.9828C4.67891 14.0432 4.24 13.9456 3.8747 13.7078C3.50941 13.4701 3.24236 13.1084 3.12278 12.6893L2.07612 9.02528C1.69946 8.58047 1.45434 8.03942 1.36831 7.46295C1.28227 6.88648 1.35874 6.29744 1.58911 5.76204C1.81947 5.22664 2.19461 4.76611 2.67235 4.43221C3.15009 4.09831 3.71149 3.90429 4.29345 3.87195L6.30545 3.75994C7.28986 3.70516 8.24721 3.4175 9.09878 2.92061L10.6614 2.00861ZM3.75612 10.0519L4.40478 12.3233C4.436 12.4332 4.50594 12.5282 4.6017 12.5906C4.69745 12.653 4.81255 12.6786 4.92574 12.6628C5.03892 12.6469 5.14255 12.5906 5.21749 12.5044C5.29243 12.4181 5.33362 12.3076 5.33345 12.1933V10.1866L4.29345 10.1286C4.11247 10.1186 3.93269 10.0929 3.75612 10.0519ZM13.3334 7.33328C13.3334 7.15647 13.2632 6.9869 13.1382 6.86187C13.0132 6.73685 12.8436 6.66661 12.6668 6.66661V7.99995C12.8436 7.99995 13.0132 7.92971 13.1382 7.80468C13.2632 7.67966 13.3334 7.51009 13.3334 7.33328Z"
                                            fill="#F2A660"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_233_80">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="text-mainOrange">公告：</div>

                            {data.announcement}
                        </h3>
                        {editMode && (
                            <div className="gap-1 flex flex-row items-start">
                                <Delete />
                                <Edit file={data.announcement} status="defaultAnnounce" id={null} sectionId={null} />
                            </div>
                        )}
                    </div>
                )}
                {data.file &&
                    data.file.map((file: any, index: number) => (
                        <div key={index} className="flex-row gap-2 flex ml-5 justify-between">
                            <Link className="flex-row gap-2" color="foreground" href="#" underline="hover">
                                {getFileIcon(file.path)}
                                {file.name}
                            </Link>
                            {editMode && (
                                <div className="gap-1 flex flex-row items-start">
                                    <Delete />
                                    <Edit file={file} status="file" id={null} sectionId={null} />
                                </div>
                            )}
                        </div>
                    ))}
            </CardBody>
            {editMode && (
                <CardFooter className="justify-end gap-4">
                    <AddFileButton />
                </CardFooter>
            )}
        </Card>
    )
}
export default DefaultBlock
