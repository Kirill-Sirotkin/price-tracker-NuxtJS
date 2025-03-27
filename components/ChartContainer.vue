<template>
    <UContainer class="bg-slate-950 w-240 h-120 flex flex-col rounded-2xl p-4">
        <p class="text-xl" v-if="props.chartPeriodData?.periodType === 'Day'">
            Hourly price (USD $) for {{ format(props.chartPeriodData?.period[1], 'yyyy-MM-dd') }}
        </p>
        <p class="text-xl" v-else>
            Daily price (USD $)  from {{ format(props.chartPeriodData?.period[1], 'yyyy-MM-dd') }} to {{ format(props.chartPeriodData?.period[0], 'yyyy-MM-dd') }}
        </p>
        <VChart :option="option" />
    </UContainer>
</template>
<script setup lang="ts">
    import type { PeriodData, PeriodDataFull } from '~/models/PeriodData';
    import { format } from "date-fns";

    const props = defineProps<{ chartPeriodData: PeriodDataFull }>()
    const propsRefresh = computed(() => { return props.chartPeriodData })
    watch(propsRefresh, (value, oldValue) => {
        option.value = getData(value.datesArray, value.pricesArray)
    })

    const getData = (dates: string[], prices: number[]): ECOption => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: {
                type: 'category',
                data: dates
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: prices,
                type: 'line'
            }]
        }
    }
    const option = shallowRef<ECOption>(getData(props.chartPeriodData.datesArray, props.chartPeriodData.pricesArray))
</script>