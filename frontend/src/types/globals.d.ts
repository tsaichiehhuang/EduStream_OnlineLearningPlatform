export {}

declare global {
    interface WeekData {
        week: number
        description: string
        file: { name: string; path: string }[]
        hw: { name: string; endTime: string; done: boolean; uploadTime: string }[]
    }
}
