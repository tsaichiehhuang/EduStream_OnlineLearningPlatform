import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useArchiveLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");
  

  const archiveLive = async () => {
    try {
      const response = await fetch(
        `https://api.one-stage.kkstream.io/bv/cms/v1/lives/${classid}/archive`,

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
          title: "直播封存成功",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire("直播封存失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { archiveLive };
}

export default useArchiveLive;
