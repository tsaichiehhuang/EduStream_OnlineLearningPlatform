import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const dnd = () => {
    const [items, setItems] = useState(['A', 'B', 'C'])
    const [isBrowser, setIsBrowser] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsBrowser(true)
        }
    }, [])
    const onDragEnd = (event: any) => {
        console.log(event)
        const { source, destination } = event

        if (!destination) {
            return
        }

        // 拷貝新的items (來自state)
        let newItems = [...items]

        // splice(start, deleteCount, item )
        // 從source.index剪下被拖曳的元素
        const [remove] = newItems.splice(source.index, 1)

        //在destination.index位置貼上被拖曳的元素
        newItems.splice(destination.index, 0, remove)

        // 設定新的 items
        setItems(newItems)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1>Todo</h1>
            {isBrowser ? (
                <Droppable droppableId="drop-id">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {items.map((item, i) => (
                                <div key={item}>
                                    <Draggable draggableId={item} index={i} key={item}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ) : null}
        </DragDropContext>
    )
}
export default dnd
