import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const LiveStreamPlayer = ({ source }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize the Video.js player
      const player = videojs("live-stream", {
        controls: true,
        width: 640,
        height: 360,
      });

      // Define the video source
      const src = {
        src: source,
        type: "application/dash+xml",
      };

      // Set the source and play the video
      player.src(src);
      player.play();
    }
  }, [source]);

  return (
    <div>
      <video
        id="live-stream"
        className="video-js vjs-default-skin"
        controls
        width="640"
        height="360"
      ></video>
    </div>
  );
};

export default LiveStreamPlayer;
