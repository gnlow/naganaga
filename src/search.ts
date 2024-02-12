import { parse } from "https://tsm.deno.dev/https://deno.land/std@0.215.0/csv/mod.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text()))
console.log(data)

export const normalize = (str: string) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export const search = (str: string) =>
    data.filter(([i, word]) =>
        normalize(word).includes(normalize(str))
    )
