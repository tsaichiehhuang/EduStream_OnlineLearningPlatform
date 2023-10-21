import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

const apiUrl = process.env.API_DOMAIN;

function useGetLive() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const liveid = Cookies.get("liveid");
  const [liveurl, setliveurl] = useState("");

  const getLive = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/live/${liveid}`,

        {
          method: "GET",
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
          title: "直播資訊成功",
          text: `Link: ${responseData.live.setup.links}\nKey: ${responseData.live.setup.key}`,
          showConfirmButton: false,
          timer: 1000,
        });
        setliveurl(responseData.live.setup.url);
      } else {
        Swal.fire("直播資訊失敗", "", "warning");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "網路請求錯誤",
        text: "請稍後再試或通知我們的工程團隊。",
      });
    }
  };

  return { getLive, liveurl };
}

export default useGetLive;
