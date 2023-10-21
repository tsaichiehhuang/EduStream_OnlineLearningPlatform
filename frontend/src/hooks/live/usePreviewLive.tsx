import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useStartLive from "@/hooks/live/useStartLive";
import useGetLive from "@/hooks/live/useGetLive";
const apiUrl = process.env.API_DOMAIN;

function usePreviewLive() {
  const { getLive } = useGetLive();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");

  const { startLive } = useStartLive();

  const previewLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}/preview`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "直播準備成功",
          showConfirmButton: false,
          timer: 1000,
        });
        startLive();
      } else {
        console.log("直播準備失敗")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { previewLive };
}

export default usePreviewLive;
