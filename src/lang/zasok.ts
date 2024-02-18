import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"
import {
    charCodeDiff,
    moveCharCode,
} from "../util/char.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1QSqIbmShJiUiJWNB0x8dQzGbb6W1dqEz_LBlP363e_E").then(x => x.text()))


// ""
// "gnmsdvzlxktpchrfayouije"
const zeminTable = `
    g\ue050
    n\ue051
    m\ue052
    s\ue053
    d\ue056
    v\ue057
    z\ue058
    l\ue05b
    x\ue05d
    k\ue05f
    t\ue060
    p\ue061
    c\ue062
    h\ue063
    r\ue06a
    f\ue06f
    a\ue078
    y\ue079
    o\ue07a
    u\ue07b
    i\ue07c
    j\ue07c
    e\ue07e
`

const latinCharToZemin =
(char: string) =>
    zeminTable[zeminTable.indexOf(char) + 1]

const zemin = (str: string) =>
    str
        .normalize("NFD")
        .toLowerCase()
        .replaceAll("qu", "k")
        .replaceAll(/[a-z]/g, latinCharToZemin)
        .replaceAll(
            /.\u{0308}/gv, // Double dot above
            moveCharCode(
                charCodeDiff(
                    "\u{e088}", // Zemin Small letter A with double dot above
                    "\u{e078}", // Zemin Small letter A
                )
            ),
        )
        .replaceAll(
            /.\u{0327}/gv, // Cedilla
            ([char]) => char,
        )

export const zasok: Lang = {
    words: data.map(
        ([index, latin, freq, n, adj, v, adv, prep, remark, _dfl, _dfw]) => ({
            index: Number(index),
            word: {
                zemin: zemin(latin),
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