import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"

type Row = [
    index: string,
    word: string,
    freq: string,
    n: string,
    adj: string,
    v: string,
    adv: string,
    prep: string,
    remark: string,
    dfl: string,
    dfw: string,
]

const data = parse(await fetch("https://gsheet.deno.dev/1QSqIbmShJiUiJWNB0x8dQzGbb6W1dqEz_LBlP363e_E").then(x => x.text())) as Row[]

export const zasok: Lang = {
    words: data.map(
        ([index, word, _freq, n, adj, v, adv, prep, remark]) => ({
            index: Number(index),
            word,
            meaning: [
                n,
                adj,
                v,
                adv,
                prep,
                remark,
            ],
        })
    )
}