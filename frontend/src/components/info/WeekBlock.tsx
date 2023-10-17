import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from '@nextui-org/react'
import getFileIcon from '@/components/info/FileUtils'
import { Delete, Edit } from '@/components/info/EditMode'
import { AddSubmittedArea, AddFileButton } from '@/components/info/AddFile'
import { AddTextButton } from './AddText'
import { SubmitArea } from './SubmitArea'

type WeekBlockProps = {
    data: WeekData
    editMode: boolean
    index: number
}

const WeekBlock: React.FC<WeekBlockProps> = ({ data, editMode, index }) => {
    return editMode ? (
        <Draggable draggableId={data.blockId.toString()} index={index}>
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
                            <div>{data.title}</div>
                        </div>
                        {editMode && (
                            <div className="gap-1 flex flex-row items-center justify-center">
                                <Delete />
                                <Edit status="title" file={data.title} />
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
                        )}
                    </CardHeader>
                    <CardBody className="gap-6 flex flex-col justify-between">
                        {data.file.map((file, index) => (
                            <div key={index} className="flex flex-row justify-between">
                                <Link className="ml-5 gap-2" color="foreground" href={file.path} underline="hover">
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
                    <CardFooter className="justify-end gap-4">
                        <AddSubmittedArea />
                        <AddFileButton />
                        <AddTextButton />
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    ) : (
        <Card className="bg-white rounded-[10px] w-full mt-5 md:mt-0 py-8 md:px-12 border-none" shadow="sm">
            <CardHeader className="justify-between flex flex-row">
                <div className="text-lg gap-4 flex flex-row items-center font-bold mb-4">
                    <div>{data.title}</div>
                </div>
            </CardHeader>
            <CardBody className="gap-6 flex flex-col justify-between">
                {data.file.map((file, index) => (
                    <div key={index} className="flex flex-row justify-between">
                        <Link className="ml-5 gap-2" color="foreground" href={file.path} underline="hover">
                            {getFileIcon(file.path)}
                            {file.name}
                        </Link>
                    </div>
                ))}
                {data.submit.map((submit, index) => (
                    <SubmitArea data={submit} key={index} editMode={editMode} />
                ))}
            </CardBody>
        </Card>
    )
}
export default WeekBlock
