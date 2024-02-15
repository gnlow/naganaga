import { pad, onChange } from "./pad.ts"
import { search, normalize } from "./search.ts"
import { getSelection } from "./getSelection.ts"
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

const update = (str: string) => {
    console.log(normalize(str))

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
}

document.querySelector("#pad")!.append(pad)
onChange(update)

document.addEventListener("selectionchange", () => {
    console.log(getSelection())
    const [selectionFrom, selectionTo] = getSelection()
    const str = " " + pad.textContent! + " "

    const wordFrom = str.slice(0, selectionFrom).lastIndexOf(" ") + 1
    const wordTo = str.slice(selectionTo).indexOf(" ") + selectionTo

    console.log(str.slice(0, selectionFrom), "|", str.slice(selectionTo))

    console.log([str.slice(wordFrom, wordTo)])

    update(str.slice(wordFrom, wordTo))
})