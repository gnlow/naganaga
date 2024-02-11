import { parse } from "https://tsm.deno.dev/https://deno.land/std@0.215.0/csv/mod.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text()))

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
    children: ["Hi"],
})

document.body.append(pad)