import { pad, onChange } from "./compo/pad.ts"
import { search, normalize } from "./search.ts"
import { getSelectedWord } from "./getSelection.ts"
import { style } from "./style.ts"

import type { Lang, Word } from "./Lang.ts"
import { word } from "./compo/word.ts"

const langName = location.pathname.slice(1)

const lang: Lang = (await import(`./lang/${langName}.ts`))[langName]
console.log(lang)

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
                cacheResult = search(lang.words)(str)
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

const light = style.light = lang.color?.light || "#eef"
const dark = style.dark =  lang.color?.dark || "#222"

Array(11).fill(0).forEach((_, n) => {
    style["theme-" + n * 10] =
        `color-mix(
            in oklab,
            ${light} ${n * 10}%,
            ${dark}
        )`
})