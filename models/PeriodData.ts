export interface PeriodData {
    periodType: string
    period: Date[]
}

export interface PeriodDataFull extends PeriodData {
    datesArray: string[]
    pricesArray: number[]
}