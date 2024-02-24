import { pad } from "./compo/pad.ts"

const getPos = (target: Node | null): number => {
    if (!target) return 0
    if (target instanceof HTMLElement)
        if (target.tagName == "DIV") return 0
    
    const prev = target.previousSibling
    if (prev) {
        return prev.textContent!.length + getPos(prev)
    } else {
        return getPos(target.parentNode)
    }
}

export const getSelection = () => {
    const {
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset,
    } = document.getSelection()!
    if (anchorNode!.parentElement!.closest("div") != pad) return false
    if (focusNode!.parentElement!.closest("div") != pad) return false

    return [
        getPos(anchorNode) + anchorOffset,
        getPos(focusNode) + focusOffset,
    ]
}

export const getSelectedWord = (fullStr: string) => {
    const selection = getSelection()
    console.log(selection)
    if (!selection) return ""

    const [selectionFrom, selectionTo] = selection
    const str = " " + fullStr + " "

    const wordFrom = str.slice(0, selectionFrom).lastIndexOf(" ")
    const wordTo = str.slice(selectionTo).indexOf(" ") + selectionTo

    console.log(str.slice(0, selectionFrom), "|", str.slice(selectionTo))

    console.log([str.slice(wordFrom, wordTo)])
    return fullStr.slice(wordFrom, wordTo).trim()
}