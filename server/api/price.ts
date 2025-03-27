import prisma from "~/lib/prisma"
import { Price } from "@prisma/client"
import { FetchData, FetchResult } from "~/models/FetchData";

// export default defineEventHandler(async (event): Promise<Price[]> => {
    export default defineEventHandler(async (event): Promise<FetchResult | null> => {
    const query = getQuery(event);
    
    const timestamp = query.timestamp ? Number(query.timestamp) : null;
    const days = query.days ? Number(query.days) : null;
    const unit = query.unit ? String(query.unit) : null;

    if (!timestamp || !days || !unit) return null

    const responsePromise = await fetch(`https://data-api.coindesk.com/index/cc/v1/historical/${unit}?market=cadli&instrument=BTC-USD&limit=${days}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&to_ts=${Math.floor(timestamp / 1000)}&groups=OHLC,MESSAGE`,
        {
            headers: {
                'Accept-Encoding': 'identity'
            }
        }
    )
    const response: FetchResult = await responsePromise.json()

    return response

    // return prisma.price.findMany()
})