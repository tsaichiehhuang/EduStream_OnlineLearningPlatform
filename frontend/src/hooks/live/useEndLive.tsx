import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useArchiveLive from "@/hooks/live/useArchiveLive";
import useGetLive from "@/hooks/live/useGetLive";

const apiUrl = process.env.API_DOMAIN;

function useEndLive() {
  const { getLive, liveurl, livestate, livename } = useGetLive();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");
  const { archiveLive } = useArchiveLive();

  const endLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}/end`,

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
        Swal.fire({
          icon: "success",
          title: "直播結束成功",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        console.log("直播結束失敗", "", "warning");
        archiveLive();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { endLive };
}

export default useEndLive;
