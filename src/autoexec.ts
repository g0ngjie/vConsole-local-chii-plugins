// @ts-nocheck

const template = `
<style>
  ._local_chii_container_ {
    width: 100%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    font-size: 14px;
  }
  ._local_chii_container_ h1 {
    margin-top: 70px;
  }
  ._local_chii_container_ ul {
    margin-top: 30px;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  ._local_chii_container_ li {
    width: 100%;
    text-align: start;
  }
  ._local_chii_container_ p {
    background-color: #2b2d39;
    color: #81d1e0;
    padding: 5px 10px;
    border-radius: 3px;
    text-align: start;
  }
</style>
<div class="_local_chii_container_">
  <h1>打开设置面板添加本地调试URL</h1>
  <ul>
    <li>
      1. 确保本地已经启动<b>chii</b>【以8080端口为例】&nbsp;
      <p>$ chii start -p 8080</p>
    </li>
    <li>2. 打开 <b>打开设置面板</b> 调整本地IP地址【必须用同一网段的IP】</li>
    <li>
      3. 浏览器访问 <b>chii</b> 操作面板&nbsp;
      <p>$ http://localhost:8080</p>
    </li>
  </ul>
</div>
`

export function runDebug() {
  const localChii = new VConsole.VConsolePlugin("local_chii", "LocalChii");

  localChii.on("init", () => {
    const componentContainer = document.createElement("div");
    componentContainer.id = "__vConsole-local-chii-plugins-container__";
    document.body.appendChild(componentContainer);
    const localUrl = localStorage.getItem("localchiiurl");
    const localPort = localStorage.getItem("localchiiport");

    if (localUrl && localPort) {
      if (!['127.0.0.1', 'localhost'].includes(localUrl)) {
        const script = document.createElement("script");
        script.src = `//${localUrl}:${localPort}/target.js`;
        document.body.appendChild(script);
      }
    }
  });


  localChii.on("renderTab", (callback) => {
    const html = template
    callback(html)
  });

  localChii.on("addTool", function (callback) {
    console.log("[debug]22:", 22)
    const button = {
      name: "打开设置面板",


      onClick: function (event) {

        if (window.__vconsole_local_chii__) {

          window.__vconsole_local_chii__.open();
          vConsole.hide();
        }
      },
    };
    callback([button]);
  });

  vConsole.addPlugin(localChii);
}

setTimeout(() => runDebug(), 500);