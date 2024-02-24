import { pad, onChange } from "./pad.ts"
import { search, normalize } from "./search.ts"
import { getSelectedWord } from "./getSelection.ts"
import { el, v, h, div } from "./el.ts"
import { Word } from "./Lang.ts"
import { style } from "./style.ts"

const $search = document.querySelector("#search")!

const word = ({ index, word, meaning }: Word) =>
    v("p(0.5rem/1rem)", [
        h("hbox(bottom) font(24)", [
            v("", [
                ...Object.entries(word).map(
                    ([_script, val]) =>
                        div("500", [val])
                ),
            ]),
            div(`
                font(12)
                p(4)
            `, [String(index)]),
        ]),
        h("font(16)", [
            div("", meaning.filter(x => !!x).map(mean => [
                mean,
                el("br"),
            ]).flat()),
        ])
    ])

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