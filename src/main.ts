// @ts-nocheck

const template = `
 <div
    style="width:100%;height:300px;background:gray;display:flex;justify-content:center;align-items:center;"
  >
  <input
      placeholder="添加chii代理地址"
      style="width:200px;height:25px;padding-left:10px;"
      type="text"
      id="__remote_cache_url_input_chii__"
    />
</div>

`

export function runDebug() {
    const debugChii = new VConsole.VConsolePlugin("debug_chii", "DebugChii");

    debugChii.on("init", () => {
        const domain = localStorage.getItem("CHII_CACHE_URL");

        if (domain) {
            const script = document.createElement("script");
            script.src = `${domain}/target.js`;
            document.body.appendChild(script);
        }

    });

    debugChii.on('show', function () {
        const funcScript = document.createElement("script");
        funcScript.textContent = `
    const domain = localStorage.getItem("CHII_CACHE_URL") || "https://";
    const targetInput = document.getElementById("__remote_cache_url_input_chii__")
    if (!targetInput.value) targetInput.value = domain
`
        document.body.appendChild(funcScript);
    });


    debugChii.on("renderTab", (callback) => {
        const html = template
        callback(html)
    });

    debugChii.on("addTool", function (callback) {
        const button = {
            name: "确认",
            onClick: function (event) {
                const targetInput = document.getElementById("__remote_cache_url_input_chii__")
                console.log(targetInput.value, 'targetInput.value')
                localStorage.setItem("CHII_CACHE_URL", targetInput.value)
                location.reload()
            },
        };
        callback([button]);
    });

    vConsole.addPlugin(debugChii);
}

setTimeout(() => runDebug(), 500);