import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardHeader, CardBody, Button, Divider, Link, Chip } from '@nextui-org/react'
import Header from '@/components/header'
import WeekBlock from '@/components/info/WeekBlock'
import DefaultBlock from '@/components/info/DefaultBlock'
import Cookies from 'js-cookie'
import { AddBlockButton, AddBlockSquare } from '@/components/info/AddBlock'
import { CreateLiveButton } from '@/components/info/CreateLive'
import useGetDefault from '@/hooks/Info/useGetDefault'
import useGetWeeks from '@/hooks/Info/useGetWeek'
import { useRouter } from 'next/router'
import useOrderSection from '@/hooks/Info/useOrderSection'

export default function Info() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const [userRole, setUserRole] = useState<string | null>('')
    const [theme, setTheme] = useState('light')
    const [editMode, setEditMode] = useState(false)
    const [isBrowser, setIsBrowser] = useState(false)
    const [blockPositions, setBlockPositions] = useState<Record<number, number>>({})
    const { getDefault, defaultInfoData } = useGetDefault(id)
    const { getWeeks, weeksData } = useGetWeeks(id)
    const [weekData, setWeekData] = useState<any>()
    const [className, setClassName] = useState<string | null>('')
    const { orderSection } = useOrderSection()
    const [requestbody, setRequestbody] = useState<any>([])

    useEffect(() => {
        getDefault()
        getWeeks(setLoading)
        if (typeof window !== 'undefined') {
            setIsBrowser(true)
        }
        setUserRole(Cookies.get('userRole'))
        setClassName(Cookies.get('className'))
        setWeekData(weeksData)
    }, [editMode, id])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    let outputArray: { id: number; order: number }[] = []
    const onDragEnd = (event: any) => {
        console.log('dragend')
        const { source, destination } = event
        if (!destination) {
            return
        }
        const sourceIndex = source.index
        const destinationIndex = destination.index
        const newBlockPositions: Record<number, number> = { ...blockPositions }
        const [draggedBlock] = weekData.splice(sourceIndex, 1)
        weekData.splice(destinationIndex, 0, draggedBlock)
        weekData.forEach((item: any, index: number) => {
            newBlockPositions[item.id] = index + 1
        })
        setBlockPositions(newBlockPositions)
        setWeekData(weekData)
        console.log('newBlockPositions', newBlockPositions)
        const newRequestbody: { id: number; order: number }[] = []

        for (const key in newBlockPositions) {
            if (newBlockPositions.hasOwnProperty(key)) {
                const id = parseInt(key)
                const order = newBlockPositions[key]
                const newItem = { id, order }
                newRequestbody.push(newItem)
                // setRequestbody(outputArray)
            }
        }
        setRequestbody(newRequestbody)

        console.log(requestbody.length)
    }

    const handleEditMode = async () => {
        setEditMode(!editMode)
        if (requestbody.length !== 0) {
            const requestBodyObject = { section: requestbody }
            orderSection(requestBodyObject, id)
        }
    }
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <div className={`${theme} text-foreground bg-background`}>
                <main className="p-10 w-full h-screen flex flex-col">
                    <div className="text-2xl font-medium py-10 md:p-6">{className}</div>
                    <div className="flex w-full justify-end md:flex-row flex-col-reverse md:justify-around">
                        <div className="w-full mt-5 md:w-7/12 md:mt-0 border-none gap-4 flex-col flex mb-12">
                            <DefaultBlock data={defaultInfoData} editMode={editMode} />
                            {editMode ? (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    {isBrowser ? (
                                        <Droppable droppableId="weekBlocks">
                                            {(provided) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="gap-4 flex flex-col"
                                                >
                                                    {loading ? (
                                                        <div>loading</div>
                                                    ) : (
                                                        weekData &&
                                                        weekData.map((data: any, index: number) => (
                                                            <WeekBlock
                                                                key={data.id}
                                                                data={data}
                                                                editMode={editMode}
                                                                index={index}
                                                                id={data.classId}
                                                            />
                                                        ))
                                                    )}

                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    ) : null}
                                </DragDropContext>
                            ) : (
                                weeksData.map((data, index) => (
                                    <WeekBlock
                                        key={data.id}
                                        data={data}
                                        editMode={editMode}
                                        index={index}
                                        id={data.classId}
                                    />
                                ))
                            )}

                            {editMode || (weeksData.length === 0 && <AddBlockSquare />)}
                        </div>
                        <div className="flex-col gap-8 flex w-full md:w-1/3">
                            {userRole === 'student' ? (
                                <>
                                    <Link href="/live">
                                        <Button className="w-full" size="lg" color="primary" variant="shadow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12 1.5C9.9233 1.5 7.89323 2.11581 6.16652 3.26957C4.4398 4.42332 3.09399 6.0632 2.29927 7.98182C1.50455 9.90045 1.29661 12.0116 1.70176 14.0484C2.1069 16.0852 3.10693 17.9562 4.57538 19.4246C6.04383 20.8931 7.91476 21.8931 9.95156 22.2982C11.9884 22.7034 14.0996 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3938 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM17.5853 12.6713L8.58525 17.1713C8.47088 17.2284 8.3438 17.2554 8.21607 17.2496C8.08835 17.2438 7.96422 17.2055 7.85548 17.1382C7.74674 17.0709 7.65701 16.977 7.59479 16.8653C7.53257 16.7536 7.49995 16.6279 7.5 16.5V7.5C7.50007 7.37221 7.53279 7.24655 7.59506 7.13495C7.65733 7.02336 7.74708 6.92952 7.8558 6.86235C7.96452 6.79519 8.0886 6.75691 8.21626 6.75116C8.34392 6.74541 8.47094 6.77238 8.58525 6.8295L17.5853 11.3295C17.7097 11.3919 17.8143 11.4876 17.8874 11.606C17.9605 11.7244 17.9992 11.8608 17.9992 12C17.9992 12.1392 17.9605 12.2756 17.8874 12.394C17.8143 12.5124 17.7097 12.6081 17.5853 12.6705V12.6713Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            線上教學
                                        </Button>
                                    </Link>

                                    <Card className="max-w-[400px] border-l-5 border-mainGreen">
                                        <CardHeader className="flex gap-3">
                                            <h2 className="text-mainGreen text-xl font-bold">近日繳交事項</h2>
                                        </CardHeader>

                                        <CardBody>
                                            {weeksData.some((week: any) =>
                                                week.blocks.some(
                                                    (block: any) => block.type === 'homework' && !block.homework?.done
                                                )
                                            ) ? (
                                                weeksData.map((week: any) =>
                                                    week.blocks
                                                        .filter(
                                                            (block: any) =>
                                                                block.type === 'homework' && !block.homework?.done
                                                        )
                                                        .map((homework: any) => (
                                                            <p key={homework.id}>
                                                                尚未完成：{homework.homework?.title}
                                                            </p>
                                                        ))
                                                )
                                            ) : (
                                                <div>無尚未完成事項</div>
                                            )}
                                        </CardBody>
                                    </Card>
                                </>
                            ) : (
                                <>
                                    <Button
                                        disableRipple
                                        className={`relative overflow-visible hover:-translate-y-1 px-12 shadow-xl after:content-[''] after:absolute after:inset-0 ${
                                            editMode ? ' text-danger' : ' text-mainGreen'
                                        } after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
                                        size="lg"
                                        color={editMode ? 'danger' : 'success'}
                                        onPress={handleEditMode}
                                        variant="bordered"
                                    >
                                        {editMode ? '關閉' : '開啟'}編輯模式
                                    </Button>

                                    <CreateLiveButton />
                                    {editMode && <AddBlockButton />}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
