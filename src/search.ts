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

const sort =
<T>(...sorters: ((a: T, b: T) => -1 | 0 | 1)[]) =>
(a: T, b: T) =>
    sorters.find(sorter => sorter(a, b))?.(a, b) || 0

const sortList = 
(str: string) =>
    sort<DictRow>(
        (a, b) => 
            normalize(a[1]).startsWith(normalize(str))
                ? -1
                : normalize(b[1]).startsWith(normalize(str))
                    ? 1
                    : 0,
        (a, b) =>
        a[0] < b[0]
            ? -1
            : 1
    )

export const search = (str: string) =>
    data.filter(([i, word]) =>
        normalize(word).includes(normalize(str))
    )
    .sort(
        sortList(str)
    )
