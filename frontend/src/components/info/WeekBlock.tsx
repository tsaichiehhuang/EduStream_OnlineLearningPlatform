import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Chip } from '@nextui-org/react'
import getFileIcon from '@/components/info/FileUtils'
import { Delete, Edit } from '@/components/info/EditMode'
import { AddSubmittedArea, AddFileButton } from '@/components/info/AddFile'
import { AddTextButton } from './AddText'
import { SubmitArea } from './SubmitArea'
import Cookies from 'js-cookie'

type WeekBlockProps = {
    data: any
    editMode: boolean
    index: number
}

const WeekBlock: React.FC<WeekBlockProps> = ({ data, editMode, index }) => {
    const handleFileClick = (fileId: number, filePath: string) => {
        Cookies.set('filePath', filePath)
        window.location.href = `/file/${fileId}`
    }

    return editMode ? (
        <Draggable draggableId={data?.id?.toString()} index={index}>
            {(provided) => (
                <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="bg-white rounded-[10px] w-full mt-5 md:mt-0 py-8 md:px-12 border-none"
                    shadow="sm"
                >
                    <CardHeader className="justify-between flex flex-row">
                        <div className="text-lg gap-4 flex flex-row items-center font-bold mb-4">
                            <div>{data.description}</div>
                        </div>

                        <div className="gap-1 flex flex-row items-center justify-center">
                            <Delete status="title" id={data.id} />
                            <Edit status="title" file={data.description} id={data.id} />
                            <svg
                                className="ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d="M18 11.4585V8.3335L22 12.5002L18 16.6668V13.5418H13V18.7502H16L12 22.9168L8 18.7502H11V13.5418H6V16.6668L2 12.5002L6 8.3335V11.4585H11V6.25016H8L12 2.0835L16 6.25016H13V11.4585H18Z"
                                    fill="#B0B0B0"
                                />
                            </svg>
                        </div>
                    </CardHeader>
                    <CardBody className="gap-6 flex flex-col justify-between">
                        {data.blocks.map((block, index) => {
                            switch (block.type) {
                                case 'homework':
                                    return <SubmitArea data={block} key={index} editMode={editMode} />
                                case 'announcement':
                                    return (
                                        <div className="flex flex-row justify-between">
                                            <div key={index} className="flex flex-row justify-start gap-2">
                                                <Chip size="sm" color="warning" variant="bordered">
                                                    公告
                                                </Chip>
                                                {block.announcement.content}
                                            </div>
                                            {editMode && (
                                                <div className="gap-1 flex flex-row items-start">
                                                    <Delete id={block.announceId} status="announce" />
                                                    <Edit file={block} status="announce" id={block.announceId} />
                                                </div>
                                            )}
                                        </div>
                                    )
                                default:
                                    return (
                                        <div key={index} className="flex flex-row justify-between">
                                            <Link
                                                className="ml-5 gap-2"
                                                color="foreground"
                                                underline="hover"
                                                onPress={() => handleFileClick(block.fileId, block.path)}
                                            >
                                                {getFileIcon(block.path)}
                                                {block.name}
                                            </Link>
                                            {editMode && (
                                                <div className="gap-1 flex flex-row items-start">
                                                    <Delete />
                                                    <Edit file={block} status="file" />
                                                </div>
                                            )}
                                        </div>
                                    )
                            }
                        })}
                    </CardBody>
                    <CardFooter className="justify-end gap-4">
                        <AddSubmittedArea sectionId={data.id} classId={data.classId} blockOrder={data.order} />
                        <AddFileButton />
                        <AddTextButton sectionId={data.id} classId={data.classId} blockOrder={data.order} />
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    ) : (
        <Card className="bg-white rounded-[10px] w-full mt-5 md:mt-0 py-8 md:px-12 border-none" shadow="sm">
            <CardHeader className="justify-between flex flex-row">
                <div className="text-lg gap-4 flex flex-row items-center font-bold mb-4">
                    <div>{data.description}</div>
                </div>
            </CardHeader>
            <CardBody className="gap-6 flex flex-col justify-between">
                {data.blocks.map((block, index) => {
                    switch (block.type) {
                        case 'homework':
                            return <SubmitArea data={block} key={index} editMode={editMode} />
                        case 'announcement':
                            return (
                                <div key={index} className="flex flex-row justify-start gap-2">
                                    <Chip size="sm" color="warning" variant="bordered">
                                        公告
                                    </Chip>
                                    {block.announcement.content}
                                </div>
                            )
                        default:
                            return (
                                <div key={index} className="flex flex-row justify-between">
                                    <Link
                                        className="ml-5 gap-2"
                                        color="foreground"
                                        underline="hover"
                                        onPress={() => handleFileClick(block.fileId, block.path)}
                                    >
                                        {getFileIcon(block.path)}
                                        {block.name}
                                    </Link>
                                </div>
                            )
                    }
                })}
            </CardBody>
        </Card>
    )
}
export default WeekBlock
