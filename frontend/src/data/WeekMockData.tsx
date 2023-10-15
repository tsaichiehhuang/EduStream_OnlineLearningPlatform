import React from 'react'

export const WeekMockData: WeekData[] = [
    {
        title: 'Week1 Introduction',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        submit: [
            {
                name: 'week1作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: true,
                uploadTime: '2023年10月7日',
            },
        ],
    },
    {
        title: 'Week2 Communication and HCI',
        file: [
            { name: 'week2講義', path: 'syllabus.pdf' },
            { name: 'week2影片', path: 'vedio.mov' },
        ],
        submit: [
            {
                name: 'week2作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: false,
                uploadTime: '',
            },
        ],
    },
    {
        title: 'Week3 The Psychological Basis of HCI',
        file: [
            { name: 'week3講義', path: 'syllabus.pdf' },
            { name: 'week3影片', path: 'vedio.mp4' },
        ],
        submit: [
            {
                name: 'week3作業繳交',
                description: '請繳交作業',
                endTime: '2023-01-18T15:05:40.000Z',
                done: false,
                uploadTime: '',
            },
        ],
    },
]

export default WeekMockData
