import { registerEl } from "./utils/register";
import Modal from "./modal/index";
import "./autoexec"

export function open() {
    registerEl(Modal)
}

if (window.__DEV__) {
    open()
}