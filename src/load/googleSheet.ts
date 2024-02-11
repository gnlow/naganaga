import { parse } from "../deps/csv.ts"

export const googleSheet = async (id: string) => {
    const data = await fetch(`https://docs.google.com/spreadsheets/u/0/d/${id}/export?format=csv`).then(x => x.text())

    return parse(data)
}