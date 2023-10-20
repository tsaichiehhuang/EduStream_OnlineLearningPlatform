import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useCreateLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");

  const createlive = async (name: string, classid: string) => {
    const requestBody = {
      name: name,
      classID: classid,
    };
    try {
      const response = await fetch(
        `https://api.one-stage.kkstream.io/bv/cms/v1/lives`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "直播創建成功",
          showConfirmButton: false,
          timer: 1000,
        });
        Cookies.set("accessToken", responseData.data.access_token);
        Cookies.set("userName", responseData.data.name);

        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 1000);
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
