import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useArchiveLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");
  const classid = Cookies.get("classId");

  const archiveLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}/archive`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify({
            classID: Number(classid), // Make sure classid is a number
          }),
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
        console.log("直播封存成功");
      } else {
        console.log("直播封存失敗");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { archiveLive };
}

export default useArchiveLive;
