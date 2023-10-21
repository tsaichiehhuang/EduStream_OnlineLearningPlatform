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
  const [livestate, setlivestate] = useState("88");

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
        setliveurl(responseData.data.live.setup.url);
        setlivestate(responseData.data.live.status);
        console.log(livestate);
      } else {
        setlivestate(responseData.data.live.status);
      }
    } catch (error) {
      console.log("yl k7x");
      //setlivestate(responseData.data.live.status);
    }
  };

  return { getLive, liveurl, livestate };
}

export default useGetLive;
