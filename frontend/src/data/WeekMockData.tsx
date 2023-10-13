import React from 'react'

export const WeekMockData: WeekData[] = [
    {
        title: 'Week1 Introduction',
        file: [
            { name: 'week1講義', path: 'syllabus.pdf' },
            { name: 'week1影片', path: 'vedio.mp4' },
        ],
        submit: [{ name: 'week1作業繳交', endTime: '2023年10月7日', done: true, uploadTime: '2023年10月7日' }],
    },
    {
        title: 'Week2 Communication and HCI',
        file: [
            { name: 'week2講義', path: 'syllabus.pdf' },
            { name: 'week2影片', path: 'vedio.mov' },
        ],
        submit: [{ name: 'week2作業繳交', endTime: '2023年10月10日', done: false, uploadTime: '' }],
    },
    {
        title: 'Week3 The Psychological Basis of HCI',
        file: [
            { name: 'week3講義', path: 'syllabus.pdf' },
            { name: 'week3影片', path: 'vedio.mp4' },
        ],
        submit: [{ name: 'week3作業繳交', endTime: '2023年10月12日', done: false, uploadTime: '' }],
    },
]

export default WeekMockData
