import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useGetLive from "@/hooks/live/useGetLive";
const apiUrl = process.env.API_DOMAIN;

function useStartLive() {
  const { getLive, livelink, livekey } = useGetLive();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");

  const startLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}/start`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        getLive();
        Swal.fire({
          icon: "success",
          title: "直播開啟成功",
          text: `請記得在 OBS 輸入以下資訊`,
          showConfirmButton: true,
          timer: 1000,
        });
      } else {
        getLive();
        Swal.fire({
          icon: "success",
          title: "直播開啟成功",
          text: `請記得在 OBS 輸入以下資訊`,
          showConfirmButton: true,
          timer: 1000,
        });
        console.log("直播開啟失敗");
        // Swal.fire("直播開啟失敗", "", "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { startLive };
}

export default useStartLive;
