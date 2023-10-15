import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import getFileIcon from '@/components/info/FileUtils'
import { Delete, Edit } from '@/components/info/EditMode'
import { AddSubmittedArea, AddFileButton } from '@/components/info/AddFile'
import { SubmitArea } from './SubmitArea'

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
                        <Link className="ml-5 gap-2 " color="foreground" href={file.path} underline="hover">
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
                    <SubmitArea data={submit} key={index} editMode={editMode} />
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
