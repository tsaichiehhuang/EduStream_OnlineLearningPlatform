export {}

declare global {
    interface DefaultData {
        blockId: number
        announcement: string
        file: {
            name: string
            path: string
            fileId: number
        }[]
    }
    interface WeekData {
        title: string
        blockId: number
        file: {
            name: string
            path: string
            fileId: number
        }[]
        submit: {
            name: string
            description: string
            endTime: string
            done: boolean
            uploadTime: string
            fileId: number
        }[]
    }

    interface ClassData {
        name: string
        id: number
        teacher: string
    }
    interface InstructorClassData {
        name: string
        id: number
    }
}
