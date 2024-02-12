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
    return [
        getPos(anchorNode) + anchorOffset,
        getPos(focusNode) + focusOffset,
    ]
}