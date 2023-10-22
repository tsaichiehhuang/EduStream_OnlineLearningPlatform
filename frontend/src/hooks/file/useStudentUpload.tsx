import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import useSUploadtoLocal from "@/hooks/file/useSUploadtoLocal";

const apiUrl = process.env.API_DOMAIN;

function useStudentUpload() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");
  const [type, settype] = useState("");
  const { suploadtolocal } = useSUploadtoLocal();

  const studentupload = async (name: string, file: File, hwid: string) => {
    const requestBody = {
      name: name,
      size: file.size,
    };
    try {
      const response = await fetch(`${apiUrl}/file/upload/init`, {
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
          title: "檔案準備上傳成功",
          showConfirmButton: false,
          timer: 1000,
        });

        if (responseData.location == "local") {
          suploadtolocal(responseData.id, file, hwid);
      
        } else if (responseData.location == "kkCompany") {
          
        }
      } else {
        Swal.fire("檔案準備上傳失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { studentupload };
}

export default useStudentUpload;
