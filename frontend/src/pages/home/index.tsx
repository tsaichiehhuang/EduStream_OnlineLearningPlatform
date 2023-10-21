import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
  Skeleton,
  Image,
} from "@nextui-org/react";
import Header from "@/components/header";
import { AddCourseButton } from "@/components/home/AddCourse";
import Cookies from "js-cookie";
import useGetClass from "@/hooks/home/useGetClass";
import NextImage from "next/image";

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
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [userRole, setUserRole] = useState<string | null>("");
  const { getClass, classData } = useGetClass();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState<string | undefined>();
  const [formattedDate, setFormattedDate] = useState<string | undefined>();
  const handleClassClick = (classId: number, className: string) => {
    Cookies.set("className", className);
    Cookies.set("classId", String(classId));
    window.location.href = `/info/${classId}`;
  };
  useEffect(() => {
    getClass(setLoading);
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      setFormattedTime(() => newTime.toLocaleTimeString());
      setFormattedDate(() => newTime.toLocaleDateString());
    }, 1000);

    setUserRole(Cookies.get("userRole"));

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const getCurrentDayOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    return dayOfWeek;
  };

  const currentDayOfWeek = getCurrentDayOfWeek();

  // 過濾出今天的課程
  const todayClasses = classData.filter(
    (data: any) => data.time === currentDayOfWeek
  );
  const renderTodayClasses = () => {
    if (todayClasses.length === 0) {
      return <p className="text-mainRed">今日無課程</p>;
    } else {
      return todayClasses.map((data: any, index: number) => (
        <div key={index}>{data.className}</div>
      ));
    }
  };
  const photo = [
    {
      img: "/photo1.jpg",
    },
    {
      img: "/photo2.jpg",
    },
    {
      img: "/photo3.jpg",
    },
  ];

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      {/* <div className={`${theme} text-foreground bg-background`}> */}
      <main className=" p-10 w-full  flex flex-col justify-center items-center gap-8 ">
        <div className="flex w-8/12 relative">
          <div className="z-10 flex absolute top-1/2 right-1/3 transform -translate-y-1/2 flex-col justify-start">
            <h2 className=" text-xl font-bold ">今日課程</h2>
            <div className="ml-20">{renderTodayClasses()}</div>
          </div>
          <NextImage
            alt="banner"
            className="w-full h-[230px] rounded-lg shadow z-0 flex "
            src="/banner.jpg"
            width={800}
            height={150}
          />
        </div>

        <div className="w-8/12 flex-col  gap-8 flex">
          <h3 className="  font-bold text-2xl">你的課程</h3>

          <div className="gap-4 grid md:grid-cols-4 grid-cols-1">
            {userRole === "instructor" && <AddCourseButton />}

            {!loading ? (
              classData.map((data: any, index: number) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => handleClassClick(data.id, data.className)}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt="photo"
                      className="w-full object-cover h-[140px]"
                      src={`/photo${(index % 3) + 1}.jpg`}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>
                      {data.className.length > 14
                        ? data.className.substring(0, 14) + "..."
                        : data.className}
                    </b>
                    {userRole === "student" && "teacher" in data && (
                      <div className="text-xs text-darkGray">
                        {data.teacher}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <>
                <Skeleton className="max-w-[400px] h-[140px] rounded-lg ">
                  <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]">
                    <CardBody className="flex-row justify-between"></CardBody>
                  </Card>
                </Skeleton>
                <Skeleton className="max-w-[400px] rounded-lg h-[140px]">
                  <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]">
                    <CardBody className="flex-row justify-between"></CardBody>
                  </Card>
                </Skeleton>
                <Skeleton className="max-w-[400px] rounded-lg h-[140px]">
                  <Card className="max-w-[400px] border-l-5 border-mainOrange hover:bg-[#f8fafc]">
                    <CardBody className="flex-row justify-between"></CardBody>
                  </Card>
                </Skeleton>
              </>
            )}
          </div>
        </div>
      </main>
      {/* </div> */}
    </>
  );
}
