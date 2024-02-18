export const charCodeDiff =
(a: string, b: string) =>
    a.charCodeAt(0) - b.charCodeAt(0)

export const moveCharCode =
(n: number) =>
(str: string) =>
    String.fromCharCode(str.charCodeAt(0) + n)