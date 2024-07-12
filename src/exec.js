
export function runDebug(vConsole) {

  const localChii = new VConsole.VConsolePlugin("local_chii", "Local Chii");
  localChii.on("init", () => {
    const componentContainer = document.createElement("div");
    componentContainer.id = "__vConsole-local-chii-plugins-container__";
    document.body.appendChild(componentContainer);
    const script = document.createElement("script");
    script.src = `http://10.49.65.11:8888/index.iife.js`;
    document.body.appendChild(script);
    const localUrl = localStorage.getItem("localchiiurl");
    const localPort = localStorage.getItem("localchiiport");
    if (localUrl && localPort) {
      const script = document.createElement("script");
      script.src = `http://${localUrl}:${localPort}/target.js`;
      document.body.appendChild(script);
    }
  });

  localChii.on("renderTab", (callback) => {
    const html = `<div style="gap: 20px; display: flex; flex-direction: column">
  <h1 style="margin-top: 100px">打开设置面板添加本地调试URL</h1>
  <ol>
    <li>
      确保本地已经启动<b>chii</b>,以8080端口为例。&nbsp;
      <p style="background-color: black; color: #fff; padding: 10px">
        $ chii start -p 8080
      </p>
    </li>
    <li>打开IP设置本地IP地址和端口号</li>
    <li>
      本地打开<b>chii</b>操作面板&nbsp;
      <p style="background-color: black; color: #fff; padding: 10px">
        $ http://localhost:8080
      </p>
    </li>
  </ol>
</div>

`
    callback(html)
  });
  vConsole.addPlugin(localChii);

  localChii.on("addTool", function (callback) {
    const button = {
      name: "打开设置面板",

      onClick: function (event) {

        if (window.__vconsole_local_chii__) {

          window.__vconsole_local_chii__.register("modal");
          vConsole.hide();
        }
      },
    };
    callback([button]);
  });
}