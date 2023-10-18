import React from 'react'

export const WeekMockData: WeekData[] = [
    {
        title: 'Week1 Introduction',
        blockId: 1,
        file: [
            {
                name: 'week1講義',
                path: './1111 設計理論與方法 Week 1 (1).pptx',
                fileId: 1,
            },
            { name: 'week1影片', path: 'vedio.mp4', fileId: 2 },
        ],
        submit: [
            {
                name: 'week1作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: true,
                uploadTime: '2023年10月7日',
                fileId: 3,
            },
        ],
    },
    {
        title: 'Week2 Communication and HCI',
        blockId: 2,
        file: [
            { name: 'week2講義', path: './東京五天.pdf', fileId: 4 },
            // { name: 'week2圖片', path: './範例.jpeg', fileId: 5 },
        ],
        submit: [
            {
                name: 'week2作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: false,
                uploadTime: '',
                fileId: 6,
            },
        ],
    },
    {
        title: 'Week3 The Psychological Basis of HCI',
        blockId: 3,
        file: [
            { name: 'week3講義', path: 'syllabus.pdf', fileId: 7 },
            { name: 'week3影片', path: 'vedio.mp4', fileId: 8 },
        ],
        submit: [
            {
                name: 'week3作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: false,
                uploadTime: '',
                fileId: 9,
            },
        ],
    },
]

export default WeekMockData
