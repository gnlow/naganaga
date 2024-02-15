import { Word } from "./Lang.ts"
import { zasok } from "./lang/index.ts"

const dict = zasok.words.sort((a, b) => b.freq - a.freq)

const wansung = {
    chosung: "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
    jungsung: "ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅗㅏ,ㅗㅐ,ㅗㅣ,ㅛ,ㅜ,ㅜㅓ,ㅜㅔ,ㅜㅣ,ㅡ,ㅡㅣ,ㅣ".split(","),
    jongsung: "ㄱ,ㄲ,ㄱㅅ,ㄴ,ㄴㅈ,ㄴㅎ,ㄷ,ㄹ,ㄹㄱ,ㄹㅁ,ㄹㅂ,ㄹㅅ,ㄹㅌ,ㄹㅍ,ㄹㅎ,ㅁ,ㅂ,ㅂㅅ,ㅅ,ㅆ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ".split(",")
}

const charCodeDiff =
(a: string, b: string) =>
    a.charCodeAt(0) - b.charCodeAt(0)

export const normalize =
(str: string) => str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

    /* 조합형을 완성형으로 */
    .replaceAll(
        /[ᄀ-ᄒ]/g,
        x => wansung.chosung[
            charCodeDiff(x, "ᄀ")
        ],
    )
    .replaceAll(
        /[ᅡ-ᅵ]/g,
        x => wansung.jungsung[
            charCodeDiff(x, "ᅡ")
        ],
    )
    .replaceAll(
        /[ᆨ-ᇂ]/g,
        x => wansung.jongsung[
            charCodeDiff(x, "ᆨ")
        ],
    )

const sort =
<T>(...sorters: ((a: T, b: T) => -1 | 0 | 1)[]) =>
(a: T, b: T) =>
    sorters.find(sorter => sorter(a, b))?.(a, b) || 0

const nLift =
<T>(f: (a: string, b: string) => T) =>
(a: string, b: string) =>
f(normalize(a), normalize(b))

const startsWith = nLift((a, b) => a.startsWith(b))

const sortList = 
(str: string) =>
    sort<Word>(
        (a, b) => 
            startsWith(a.word, str)
                ? -1
                : startsWith(b.word, str)
                    ? 1
                    : 0,
        (a, b) =>
            a.meaning.find(x => startsWith(x, str))
                ? -1
                : b.meaning.find(x => startsWith(x, str))
                    ? 1
                    : 0,
        (a, b) =>
            a.index < b.index
                ? -1
                : 1
    )

const filterLimited =
<T>
(
    limit: number,
    cond: (val: T) => boolean,
) =>
(list: T[]) => {
    const result: T[] = []
    list.find(val => {
        if (cond(val)) {
            result.push(val)
        }
        if (result.length == limit) {
            return true
        }
    })
    return result
}

const isHangul = (str: string) => /\p{sc=Hangul}+/v.test(str)

const match =
(str: string) =>
({ word, meaning }: Word) => {
    const where = normalize(
        isHangul(str)
            ? meaning.join("\n")
            : word
    )
    const what = normalize(str)
    return where.includes(what)
}

export const search = (str: string) => {
    return filterLimited(20, match(str))(dict)
    .sort(
        sortList(str)
    )
}