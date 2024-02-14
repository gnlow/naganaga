import { pad, onChange } from "./pad.ts"
import { search } from "./search.ts"
import { getSelection } from "./getSelection.ts"
import { el } from "./el.ts"

const $search = document.querySelector("#search")!

document.querySelector("#pad")!.append(pad)
onChange(str => {
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
})

document.addEventListener("selectionchange", () => {
    console.log(getSelection())
})