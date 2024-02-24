import { pad, onChange } from "./compo/pad.ts"
import { search, normalize } from "./search.ts"
import { getSelectedWord } from "./getSelection.ts"
import { style } from "./style.ts"

import type { Word } from "./Lang.ts"
import { word } from "./compo/word.ts"

const $search = document.querySelector("#search")!

let cacheStr = ""
let cacheResult: Word[] = []

const update = () => {
    const str = getSelectedWord(pad.textContent!)
    if (!str) return

    console.log(str + "\n" + normalize(str))

    const result =
        str == cacheStr
            ? cacheResult
            : (
                cacheStr = str,
                cacheResult = search(zasok.words)(str)
            )

    console.log(result)
    
    $search.replaceChildren(
        ...result
            .map(word)
    )
    $search.scrollTop = 0
}

document.querySelector("#pad")!.append(pad)
onChange(update)

document.addEventListener("selectionchange", update)

import { zasok } from "./lang/zasok.ts"

const light = style.light = zasok.color!.light
const dark = style.dark =  zasok.color!.dark

Array(11).fill(0).forEach((_, n) => {
    style["theme-" + n * 10] =
        `color-mix(
            in oklab,
            ${light} ${n * 10}%,
            ${dark}
        )`
})