import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useStartLive from "@/hooks/live/useStartLive";

const apiUrl = process.env.API_DOMAIN;

function usePreviewLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");
  const { startLive } = useStartLive();

  const previewLive = async () => {
    try {
      const response = await fetch(
        `https://api.one-stage.kkstream.io/bv/cms/v1/lives/${classid}/preview`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
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
        Swal.fire("直播準備失敗", "", "warning");
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
