import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text()))

export const loca: Lang = {
    words: data.map(
        ([index, latin, n, adj, v, etc, _origin]) => ({
            index: Number(index),
            word: {
                latin,
            },
            meaning: [
                n,
                adj,
                v,
                etc,
            ],
            freq: 0,
        })
    )
}