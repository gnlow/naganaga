import { Word } from "./Lang.ts"
import { zasok } from "./lang/index.ts"

export const normalize = (str: string) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

const sort =
<T>(...sorters: ((a: T, b: T) => -1 | 0 | 1)[]) =>
(a: T, b: T) =>
    sorters.find(sorter => sorter(a, b))?.(a, b) || 0

const sortList = 
(str: string) =>
    sort<Word>(
        (a, b) => 
            normalize(a.word).startsWith(normalize(str))
                ? -1
                : normalize(b.word).startsWith(normalize(str))
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

export const search = (str: string) => {
    return filterLimited<Word>(20, ({ word }) =>
        normalize(word).includes(normalize(str))
    )(zasok.words)
    .sort(
        sortList(str)
    )
}