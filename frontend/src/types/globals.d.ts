import { type } from 'os'

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
        map(arg0: (data: any, index: any) => import('react').JSX.Element): import('react').ReactNode
        description: string
        id: number
        order: number
        classId: number
        blocks: {
            type: string
            name: string
            path: string
            id: number
        }[]
    }

    interface ClassData {
        name: string
        id: number
        teacher: string
    }
    // interface InstructorClassData {
    //     name: string
    //     id: number
    // }
}
