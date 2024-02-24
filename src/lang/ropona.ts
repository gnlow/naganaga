import { Lang } from "../Lang.ts"
import { parse } from "../deps/csv.ts"

const data = parse(await fetch("https://gsheet.deno.dev/1v4Gn5c1xeTBF5VLdSKdDFF9HtpoIaq5GUJnJyDv_-vo?gid=0").then(x => x.text()))

console.log(data)

export const ropona: Lang = {
    words: data.map(
        ([hanzi, hd, js, gd, cy, type, mean, accent, oldHanzi], i) => ({
            index: i + 1,
            word: {
                hanzi,
                latin: hd,
            },
            meaning: [
                ...mean.split(",").map(x => x.trim())
            ],
            freq: 0
        })
    ),
    color: {
        light: "#fff",
        dark: "#377241",
    }
}