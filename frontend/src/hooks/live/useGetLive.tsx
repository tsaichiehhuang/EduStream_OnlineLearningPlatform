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
  const [livestate, setlivestate] = useState("");
  const [livelink, setlivelink] = useState("");
  const [livekey, setlivekey] = useState("");
  const [livename, setlivename] = useState("");

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

      setlivestate(responseData.data.live.status);

      if (response.ok) {
        // Swal.fire({
        //   icon: "success",
        //   title: "直播資訊成功",
        //   // text: `Link: ${responseData.live.setup.links}\nKey: ${responseData.live.setup.key}`,
        //   showConfirmButton: false,
        //   timer: 1000,
        // });
        setliveurl(responseData.data.live.url);
        setlivestate(responseData.data.live.status);
        setlivelink(responseData.data.live.setup.links);
        setlivekey(responseData.data.live.setup.key);
        setlivename(responseData.data.live.name);
        // console.log("links",livelink);
        // console.log("keys",livekey);
      } else {
        setliveurl(responseData.data.live.url);
        setlivestate(responseData.data.live.status);
        setlivelink(responseData.data.live.setup.links);
        setlivekey(responseData.data.live.setup.key);
        setlivestate(responseData.data.live.status);
        setlivename(responseData.data.live.name);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
      //setlivestate(responseData.data.live.status);
    }
    // console.log("livestate", livestate);
    // console.log("link", livelink);
    // console.log("key", livekey);
  };

  return { getLive, liveurl, livestate, livelink, livekey, livename };
}

export default useGetLive;
