import { pad, onChange } from "./pad.ts"
import { search } from "./search.ts"
import { getSelection } from "./getSelection.ts"
import { el } from "./el.ts"

const $search = document.querySelector("#search")!

const update = (str: string) => {
    console.log(str)
    console.log(search(str))
    
    $search.replaceChildren(
        ...search(str)
            .map(x => [
                x.index,
                x.word,
                ...x.meaning,
            ].join(" "))
            .map(x => el("div", {
                children: [
                    x
                ]
            }))
    )
}

document.querySelector("#pad")!.append(pad)
//onChange(update)

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