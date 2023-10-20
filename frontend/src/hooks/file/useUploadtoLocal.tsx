import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const apiUrl = process.env.API_DOMAIN;

function useUploadtoLocal() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const classid = Cookies.get("classId");

  const uploadtolocal = async (id: string, file: File) => {
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
        Swal.fire({
          icon: "success",
          title: "檔案上傳本地端成功",
          showConfirmButton: false,
          timer: 1000,
        });

        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire("檔案上傳本地端失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { uploadtolocal };
}

export default useUploadtoLocal;
