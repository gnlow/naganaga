import { el, v, h, div } from "../el.ts"
import { Word } from "../Lang.ts"

export const word = ({ index, word, meaning }: Word) =>
    v("p(0.5rem/1rem)", [
        h("hbox(bottom) font(24)", [
            v("", [
                ...Object.entries(word).map(
                    ([_script, val]) =>
                        div("500", [val])
                ),
            ]),
            div(`
                font(12)
                p(4)
            `, [String(index)]),
        ]),
        h("font(16)", [
            div("", meaning.filter(x => !!x).map(mean => [
                mean,
                el("br"),
            ]).flat()),
        ])
    ])