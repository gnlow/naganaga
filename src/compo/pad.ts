import { el } from "../el.ts"

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

export const onChange = (f: (str: string) => void) => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ type }) => {
            if (type == "characterData") {
                f(pad.textContent!)
            }
        })
    })
    
    observer.observe(pad, {
        subtree: true,
        characterData: true,
    })
}