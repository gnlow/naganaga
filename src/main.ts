import { pad } from "./pad.ts"

import { getSelection } from "./getSelection.ts"

document.querySelector("#pad")!.append(pad)

document.addEventListener("selectionchange", () => {
    console.log(getSelection())
})