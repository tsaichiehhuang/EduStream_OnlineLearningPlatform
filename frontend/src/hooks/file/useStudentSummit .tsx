import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useStudentSummit() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");
  const [type, settype] = useState("");

  const studentsummit = async (id:string,hwid: string) => {
    const requestBody = {
        id: id,
    };

    try {
      const response = await fetch(`${apiUrl}/class/homework/${hwid}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "學生上傳本地確認成功",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire("學生上傳本地確認失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { studentsummit };
}

export default useStudentSummit;
