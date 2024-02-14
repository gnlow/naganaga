import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"

type Row = [
    index: string,
    word: string,
    n: string,
    adj: string,
    v: string,
    etc: string,
    origin: string,
]

const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text())) as Row[]

export const loca: Lang = {
    words: data.map(
        ([index, word, n, adj, v, etc, _origin]) => ({
            index: Number(index),
            word,
            meaning: [
                n,
                adj,
                v,
                etc,
            ],
        })
    )
}