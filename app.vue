<template>
  <UContainer class="py-8 flex flex-col gap-4">
    <h1 class="text-3xl">BITCOIN CLOSING PRICE TRACKER</h1>
    <ChartContainer :chart-period-data="periodData" />
    <DatePicker @pricePeriodChange="updatePricePeriod" class="pl-10" />
  </UContainer>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import type { PeriodData, PeriodDataFull } from './models/PeriodData'
  import type { Price } from "@prisma/client";
  import { format } from "date-fns";
  import type { FetchResult } from './models/FetchData';

  const timestamp = ref((new Date()).getTime())
  const days = ref(24)
  const unit = ref("hours")
  const { data, refresh } = await useFetch<FetchResult>("/api/price", {
    query: { timestamp, days, unit }
  })

  const updatePricePeriod = async (newData: PeriodData) => {
    const periodDataFull: PeriodDataFull = {
      period: newData.period,
      datesArray: [],
      pricesArray: [],
      periodType: newData.periodType
    }
    if (!newData.period) return
    const timestampDifference = newData.period[0].getTime() - newData.period[1].getTime()
    const millisecondsInDay = 1000 * 60 * 60 * 24
    const daysBetweenDates = Math.floor(timestampDifference / millisecondsInDay)

    if (newData.periodType !== "Day") {
      timestamp.value = newData.period[0].getTime()
      days.value = daysBetweenDates
      unit.value = "days"
    } else {
      timestamp.value = newData.period[0].getTime()
      days.value = 24
      unit.value = "hours"
    }
    await refresh()
    if (!data.value) return
    data.value.Data.forEach((element) => {
      if (periodDataFull.periodType === 'Day') {
        periodDataFull.datesArray.push(format(element.TIMESTAMP * 1000, 'yyyy-MM-dd HH:mm'))
      } else {        
        periodDataFull.datesArray.push(format(element.TIMESTAMP * 1000, 'yyyy-MM-dd'))
      }
      periodDataFull.pricesArray.push(element.CLOSE)
    })
    periodData.value = periodDataFull
  } 
  const periodData = ref<PeriodDataFull>({ 
    periodType: 'Day', 
    period: [new Date(), new Date()],
    pricesArray: [],
    datesArray: []
  })
</script>
