import Modal from "./modal/index";

import { createApp } from 'vue'
import type { App } from 'vue'

const ShellComponentContainer = '__debug_remote_chii_container____'

let swapApp: App | null = null

export function open() {
    if (swapApp) swapApp.unmount()
    swapApp = createApp(Modal)
    swapApp.mount(`#${ShellComponentContainer}`)
}

export function destroy() {
    if (swapApp) swapApp.unmount()
}


const componentContainer = document.createElement("div");
componentContainer.id = "__debug_remote_chii_container____";
document.body.appendChild(componentContainer);

const domain = localStorage.getItem("CHII_CACHE_URL");

if (domain) {
    const script = document.createElement("script");
    script.src = `${domain}/target.js`;
    document.body.appendChild(script);
}

const touchCount: number = 6

const _window: any = window
let i = 0
let vTimer: any
document?.addEventListener('touchstart', e => {
    i++
    if (e.touches.length === touchCount && i >= touchCount) {
        i = 0
        clearTimeout(vTimer)
        vTimer = ''
        if (document.querySelector(ShellComponentContainer)) {
            _window._debug_chii__?.destroy()
        } else {
            _window._debug_chii__.open();
        }
    }
    if (vTimer) {
        setTimeout(() => {
            i = 0
            clearTimeout(vTimer)
            vTimer = ''
        }, 1000)
    }
})


if (window.__DEV__) {
    open()
}