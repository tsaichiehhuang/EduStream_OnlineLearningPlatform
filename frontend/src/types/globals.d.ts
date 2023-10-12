export {}

declare global {
    interface WeekData {
        week: number
        description: string
        file: { name: string; path: string }[]
        hw: { name: string; endTime: string; done: boolean; uploadTime: string }[]
    }
    interface CourseData {
        name: string
        id: number
        announcement: string
        file: { name: string; path: string }[]
    }
}
