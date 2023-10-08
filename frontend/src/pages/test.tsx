import React, { useEffect } from 'react';

function TestPage() {
  const iframeStyle = {
    border: '0px #ffffff none',
    marginHeight: '0px',
    marginWidth: '0px',
    height: '400px',
    width: '600px',
  };

  // 在组件加载后添加message事件监听
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.command === 'ping') {
        // 向所有iframe发送'pong'命令
        Array.from(document.querySelectorAll('iframe')).forEach((iframe) => {
          iframe.contentWindow.postMessage({ command: 'pong' }, '*');
        });
      }
    });
  }, []);

  return (
    <div>
      <iframe
        src="https://kahoot.it/?pin=8048405&refer_method=linkk"
        style={iframeStyle}
        name="myiFrame"
        scrolling="no"
        frameBorder="1"
        allowFullScreen
      ></iframe>
      <iframe
        src="https://showroom.one.blendvision.com/embed?token={token}"
        width="640"
        height="360"
        allow="autoplay; encrypted-media; clipboard-write"
        frameBorder="0" // 修正frameBorder属性名称
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default TestPage;
