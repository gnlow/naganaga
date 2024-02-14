import { parse } from "https://tsm.deno.dev/https://deno.land/std@0.215.0/csv/mod.ts"

type DictRow = [
    index: string,
    word: string,
    n: string,
    adj: string,
    v: string,
    etc: string,
    origin: string,
]

const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text())) as DictRow[]
console.log(data)

export const normalize = (str: string) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export const search = (str: string) =>
    data.filter(([i, word]) =>
        normalize(word).includes(normalize(str))
    )
    .sort(
        (a, b) => 
            normalize(a[1]).startsWith(normalize(str))
            ? -1
            : normalize(b[1]).startsWith(normalize(str))
                ? 1
                : a[0] < b[0]
                    ? -1
                    : 1
    )
