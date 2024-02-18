import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1QSqIbmShJiUiJWNB0x8dQzGbb6W1dqEz_LBlP363e_E").then(x => x.text()))

export const zasok: Lang = {
    words: data.map(
        ([index, latin, freq, n, adj, v, adv, prep, remark, _dfl, _dfw]) => ({
            index: Number(index),
            word: {
                latin,
            },
            meaning: [
                n,
                adj,
                v,
                adv,
                prep,
                remark,
            ],
            freq: Number(freq),
        })
    ),
    color: {
        light: "#FDDE59",
        dark: "#2C2C2C",
    }
}