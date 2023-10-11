import React from 'react'

// WeekMockData.ts
interface File {
    name: string
    path: string
}

interface WeekData {
    week: number
    description: string
    file: File[]
    hw: { name: string; endTime: string; done: boolean; uploadTime: string }[]
}

export const WeekMockData: WeekData[] = [
    {
        week: 1,
        description: 'Introduction',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月7日', done: true, uploadTime: '2023年10月7日' }],
    },
    {
        week: 2,
        description: 'Communication and HCI',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mov' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月10日', done: false, uploadTime: '' }],
    },
    {
        week: 3,
        description: 'The Psychological Basis of HCI',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        hw: [{ name: 'week1講義', endTime: '2023年10月12日', done: false, uploadTime: '' }],
    },
]

export default WeekMockData
