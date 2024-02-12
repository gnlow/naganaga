import { parse } from "https://tsm.deno.dev/https://deno.land/std@0.215.0/csv/mod.ts"

// const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text()))

type Attr = Record<string, string | (string | HTMLElement)[]>

const el = (name: string, { children, ...attr }: Attr = {}) => {
    const elem = document.createElement(name)

    Object.entries(attr as Record<string, string>).forEach(([k, v]) => {
        elem.setAttribute(k, v)
    })
    elem.append(...(children || []))

    return elem
}

const pad = el("div", {
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
        }
    })
})

observer.observe(pad, {
    subtree: true,
    characterData: true,
})

document.querySelector("#pad")!.append(pad)