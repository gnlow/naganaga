export interface Word {
    index: number
    word: Record<string, string>
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