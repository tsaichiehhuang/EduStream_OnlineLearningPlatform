import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useEndLive from "@/hooks/live/useEndLive";

const apiUrl = process.env.API_DOMAIN;

function useCancelLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");
  const { endLive } = useEndLive();
  const cancelLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}/cancel`,

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
          title: "直播取消成功",
          showConfirmButton: false,
          timer: 1000,
        });
        endLive();
      } else {
        Swal.fire("直播取消失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { cancelLive };
}

export default useCancelLive;
