import prisma from "~/lib/prisma"
import { Price } from "@prisma/client"
import { FetchData, FetchResult } from "~/models/FetchData";
import { format } from "date-fns";

export default defineEventHandler(async (event): Promise<Price[]> => {
    const query = getQuery(event);
    
    const timestamp = query.timestamp ? Number(query.timestamp) : null;
    const days = query.days ? Number(query.days) + 1 : null;
    const unit = query.unit ? String(query.unit) : null;
    if (!timestamp || !days || !unit) return []

    if (unit === 'hours') {
        const responsePromise = await fetch(`https://data-api.coindesk.com/index/cc/v1/historical/${unit}?market=cadli&instrument=BTC-USD&limit=${days}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&to_ts=${Math.floor(timestamp / 1000)}&groups=OHLC,MESSAGE`,
            {
                headers: {
                    'Accept-Encoding': 'identity'
                }
            }
        )
        const response: FetchResult = await responsePromise.json()
        const hourlyPrices: Price[] = response.Data.map((p, index) => ({price: p.CLOSE, date: new Date(p.TIMESTAMP * 1000), id: index}))
        return hourlyPrices
    }

    const startDate = new Date(timestamp)
    const requiredDates: Date[] = [];
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() - i)
        requiredDates.push(date)
    }

    const prices: Price[] = await prisma.price.findMany({
        where: {
            date: {
                gte: requiredDates[requiredDates.length - 1],
                lte: requiredDates[0]
            }
        }
    })
    const existingDates = new Set(prices.map(price => format(price.date.getTime(), "yyyy-MM-dd")))
    const queriedDates = requiredDates.map(date => format(date.getTime(), "yyyy-MM-dd")).slice(0, -1)
    const missingDates = queriedDates.filter(date => !existingDates.has(date))
    const isAllDatesExist = missingDates.length === 0
    
    if (isAllDatesExist) {
        console.log("Database has dates!")
        return prices
    }

    const responsePromise = await fetch(`https://data-api.coindesk.com/index/cc/v1/historical/${unit}?market=cadli&instrument=BTC-USD&limit=${days}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&to_ts=${Math.floor(timestamp / 1000)}&groups=OHLC,MESSAGE`,
        {
            headers: {
                'Accept-Encoding': 'identity'
            }
        }
    )
    const response: FetchResult = await responsePromise.json()
    const dailyPrices: Price[] = response.Data.map((p, index) => ({price: p.CLOSE, date: new Date(p.TIMESTAMP * 1000), id: index}))

    dailyPrices.map(async (p) => {
        await prisma.price.upsert({
          where: { date: p.date },
          update: { price: p.price },
          create: { price: p.price, date: p.date }
        });
    })

    return dailyPrices
})