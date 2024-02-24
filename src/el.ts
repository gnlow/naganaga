export type Attr = Record<string, string | (string | HTMLElement)[]>

export const el = (name: string, { children, ...attr }: Attr = {}) => {
    const elem = document.createElement(name)

    Object.entries(attr as Record<string, string>).forEach(([k, v]) => {
        elem.setAttribute(k, v)
    })
    elem.append(...(children || []))

    return elem
}

export const box = (cl: string) => (
    class_: string,
    children: (string | HTMLElement)[],
) => el("div", {
    class: cl + class_,
    children,
})
export const v = box("vbox ")
export const h = box("hbox ")
export const div = box("")