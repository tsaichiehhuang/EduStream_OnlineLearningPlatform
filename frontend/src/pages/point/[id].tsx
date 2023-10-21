import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Skeleton, Image } from '@nextui-org/react'
import Header from '@/components/header'
import { AddCourseButton } from '@/components/home/AddCourse'
import Cookies from 'js-cookie'
import useGetClass from '@/hooks/home/useGetClass'
import NextImage from 'next/image'
import useGetSummary from '@/hooks/Info/useGetSummary'

// export async function getServerSideProps(context: any) {
//     const { req, res } = context
//     const accessToken = req.cookies.accessToken
//     if (!accessToken) {
//         res.writeHead(302, { Location: '/login' })
//         res.end()
//         return { props: {} }
//     }

//     return {
//         props: {},
//     }
// }

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState('light')
    const [userRole, setUserRole] = useState<string | null>('')
    const { getSummary, summaryData } = useGetSummary()
    const [fileId, setFileId] = useState<any>('')
    const [fileName, setFileName] = useState<any>('')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    useEffect(() => {
        setFileId(Cookies.get('fileId'))
        getSummary(fileId)
        setFileName(Cookies.get('fileName'))
    }, [])
    return (
        <>
            <Header toggleTheme={toggleTheme} theme={theme} />
            {/* <div className={`${theme} text-foreground bg-background`}> */}
            <main className=" p-10 w-full  flex flex-col justify-center items-center gap-8 ">
                {!loading ? (
                    <Card shadow="sm" className=" p-5 w-2/3 ">
                        <CardHeader>
                            <h3 className="  font-bold text-2xl">{`${fileName}的重點整理`}</h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="overflow-visible p-10 h-[200px]">{summaryData}</CardBody>
                    </Card>
                ) : (
                    <>
                        <Skeleton className="max-w-[400px] h-[140px] rounded-lg ">
                            <Card shadow="sm" className=" p-5 w-2/3 ">
                                <CardHeader>
                                    <h3 className="  font-bold text-2xl">file名稱的重點整理</h3>
                                </CardHeader>
                                <Divider />
                                <CardBody className="overflow-visible p-10 h-[200px]"></CardBody>
                            </Card>
                        </Skeleton>
                    </>
                )}
            </main>
            {/* </div> */}
        </>
    )
}
