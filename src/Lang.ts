export interface Word {
    index: number
    /** Latin */
    word: string
    meaning: string[]
}

export interface Lang {
    words: Word[]
}