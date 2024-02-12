import { pad, onChange } from "./pad.ts"
import { search } from "./search.ts"
import { getSelection } from "./getSelection.ts"

document.querySelector("#pad")!.append(pad)
onChange(str => {
    console.log(str)
    console.log(search(str))
})

document.addEventListener("selectionchange", () => {
    console.log(getSelection())
})