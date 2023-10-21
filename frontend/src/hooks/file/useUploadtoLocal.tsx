import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useTeacherLocalFinal from "@/hooks/file/useTeacherLocalFinal";
import { string } from "yup";

const apiUrl = process.env.API_DOMAIN;

function useUploadtoLocal() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");
  const { teacherlocalfinal } = useTeacherLocalFinal();

  const uploadtolocal = async (id: string, file: File,sectionId:string) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/file/upload/binary`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // 使用 FormData 作為請求主體
      });

      const responseData = await response.json();
      if (response.ok) {
        teacherlocalfinal(id,sectionId);
        console.log("檔案上傳本地端成功");
      } else {
        console.log("檔案上傳本地端失敗");
        teacherlocalfinal(id,sectionId);
      }
    } catch (error) {
      teacherlocalfinal(id,sectionId);
      console.log("網路請求錯誤");
    }
  };

  return { uploadtolocal };
}

export default useUploadtoLocal;
