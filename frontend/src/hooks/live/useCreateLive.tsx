import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useCreateLive() {
  const router = useRouter();
  // const token = Cookies.get("accessToken");

  const createlive = async (name: string) => {
    const classid = Cookies.get("classId");
    const token = Cookies.get("accessToken");
    console.log(token);
    console.log(classid);
    const requestBody = {
      name: name,
      classID: Number(classid),
    };
    try {
      const response = await fetch(`${apiUrl}/live`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(name),
          classID: Number(classid),
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "直播創建成功",
          showConfirmButton: false,
          timer: 1000,
        });
        Cookies.set("liveid", responseData.data.live.id);
        window.location.href = `/teacher/setting${responseData.data.live.id}`;
        console.log("發送成功");
      } else {
        Swal.fire("直播創建失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { createlive };
}

export default useCreateLive;
