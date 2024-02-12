import { el } from "./el.ts"
import { search } from "./search.ts"

export const pad = el("div", {
    class: `
        w(100%)
        h(100%)
        p(1rem)
        font(64)
    `,
    contentEditable: "true",
    children: [
        "Hello, ",
        el("span", {
            class: "c(orange)",
            children: "World",
        }),
        "!",
    ],
})

const getPos = (target: Node | null): number => {
    if (!target) return 0
    if (target == pad) return 0
    
    const prev = target.previousSibling
    if (prev) {
        return prev.textContent!.length + getPos(prev)
    } else {
        return getPos(target.parentNode)
    }
}

const getSelection = () => {
    const {
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset,
    } = document.getSelection()!
    return [
        getPos(anchorNode) + anchorOffset,
        getPos(focusNode) + focusOffset,
    ]
}

document.addEventListener("selectionchange", () => {
    console.log(getSelection())
})

const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ type }) => {
        if (type == "characterData") {
            console.log(pad.textContent)
            console.log(search(pad.textContent!))
        }
    })
})

observer.observe(pad, {
    subtree: true,
    characterData: true,
})