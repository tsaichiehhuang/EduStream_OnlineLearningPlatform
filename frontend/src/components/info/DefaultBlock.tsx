import React from 'react'
import { Card, CardHeader, CardBody, Divider, Link, Button, Chip } from '@nextui-org/react'
import getFileIcon from './FileUtils'
import CourseMockData from '@/data/CourseMockData'
import userMockData from '@/data/UserMockData'
import { Delete, Edit } from './EditMode'

type DefaultBlockProps = {
    data: DefaultData
    editMode: boolean
}

const DefaultBlock: React.FC<DefaultBlockProps> = ({ data, editMode }) => {
    return (
        <Card className=" bg-white rounded-[10px]  w-full mt-5  md:mt-0 py-8 md:px-12 border-none " shadow="sm">
            <CardBody className="  flex gap-4">
                {data.announcement && (
                    <div className="flex flex-row justify-between">
                        <h3 className="gap-4 flex items-center ">
                            <Chip size="sm" color="warning" variant="bordered">
                                公告
                            </Chip>
                            {data.announcement}
                        </h3>
                        {editMode && (
                            <div className="gap-1 flex flex-row items-start">
                                <Delete />
                                <Edit file={data.announcement} status="announce" />
                            </div>
                        )}
                    </div>
                )}
                {data.file &&
                    data.file.map((file, index) => (
                        <div key={index} className="flex-row gap-2 flex ml-5 justify-between">
                            <Link className="flex-row gap-2" color="foreground" href="#" underline="hover">
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
            </CardBody>
        </Card>
    )
}
export default DefaultBlock
