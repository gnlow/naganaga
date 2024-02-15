import { pad, onChange } from "./pad.ts"
import { search, normalize } from "./search.ts"
import { getSelectedWord } from "./getSelection.ts"
import { el } from "./el.ts"
import { Word } from "./Lang.ts"

const $search = document.querySelector("#search")!

const box = (cl: string) => (
    class_: string,
    children: (string | HTMLElement)[],
) => el("div", {
    class: cl + class_,
    children,
})
const v = box("vbox ")
const h = box("hbox ")
const div = box("")

const word = ({ index, word, meaning }: Word) =>
    v("m(0/0/10)", [
        h("hbox(bottom) font(24)", [
            div("500", [word]),
            div(`
                font(12)
                p(4)
                c(#333)
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

    console.log(str + "\n" + normalize(str))

    const result =
        str == cacheStr
            ? cacheResult
            : (
                cacheStr = str,
                cacheResult = search(str)
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