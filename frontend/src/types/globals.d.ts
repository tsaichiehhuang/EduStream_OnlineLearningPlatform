export {}

declare global {
    interface DefaultData {
        announcement: string
        file: {
            name: string
            path: string
        }[]
    }
    interface WeekData {
        title: string
        file: {
            name: string
            path: string
        }[]
        submit: {
            name: string
            description: string
            endTime: string
            done: boolean
            uploadTime: string
        }[]
    }

    interface CourseData {
        name: string
        id: number
    }
}
