export interface FetchData {
    UNIT: string
    TIMESTAMP: number
    OPEN: number
    HIGH: number
    LOW: number
    CLOSE: number
    TOTAL_INDEX_UPDATES: number
}

export interface FetchResult {
    Data: FetchData[]
}