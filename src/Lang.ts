export interface Word {
    index: number
    /** Latin */
    word: string
    meaning: string[]
    freq: number
}

export interface Lang {
    words: Word[]

    color?: {
        light: string
        dark: string
    }
}