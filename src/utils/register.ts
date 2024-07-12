import { createApp } from 'vue'
import type { App, Component } from 'vue'

const ShellComponentContainer = '__vConsole-local-chii-plugins-container__'

let swapApp: App | null = null

export function registerEl(target: Component) {
    if (swapApp) {
        swapApp.unmount()
        swapApp = null;
        return;
    }
    swapApp = createApp(target)
    swapApp.mount(`#${ShellComponentContainer}`)
}