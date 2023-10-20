// LiveStreamPage.js

import React, { useEffect } from 'react';
import videojs from 'video.js';

const LiveStreamPage = (props:any) => {
  // 通过 props 获取传递的参数
  const eventData = props.eventData;

  useEffect(() => {
    // 使用 eventData 中的参数进行处理
    const player = videojs('live-stream');

    player.ready(function () {
      const src = {
        src: eventData.live.source,
        type: eventData.live.type === 'LIVE_TYPE_LIVE' ? 'application/dash+xml' : 'application/x-mpegURL',
      };
      player.src(src);
      player.play();
    });
  }, [eventData]);

  return (
    <div>
      <video id="live-stream" className="video-js vjs-default-skin" controls width="640" height="360"></video>
      <div id="chat-container"></div>
    </div>
  );
};

export default LiveStreamPage;
