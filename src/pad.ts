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