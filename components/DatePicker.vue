<template>
    <div class="flex flex-col gap-2">
        <URadioGroup 
            orientation="horizontal" 
            default-value="Day"
            @change="calculatePeriod"
            v-model="presetPeriod" 
            :items="items" 
        />
        <div class="flex gap-2 items-center" v-if="presetPeriod==='Custom'">
            <p class="font-bold">From:</p>
            <input class="border-1 border-amber-50" type="date" v-model="startDateInput" />
            <p class="font-bold">To:</p>
            <input class="border-1 border-amber-50" type="date" v-model="endDateInput" />
            <UButton class="rounded-full" @click="validateAndEmitCustomPeriod">Apply</UButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const emit = defineEmits(['pricePeriodChange'])

const calculatePeriod = () => {
    let period: (Date | undefined)[] | null = null
    const end = new Date()
    const start = new Date()
    switch (presetPeriod.value) {
        case 'Day':
            start.setDate(end.getDate())
            period = [end, start]
            emit('pricePeriodChange', period)
            break
        case 'Week':
            start.setDate(end.getDate() - 7)
            period = [end, start]
            emit('pricePeriodChange', period)
            break
        case 'Month':
            start.setDate(end.getDate() - 31)
            period = [end, start]
            emit('pricePeriodChange', period)
            break
        case 'Year':
            start.setDate(end.getDate() - 365)
            // period = [format(end, 'yyyy-MM-dd'), format(start, 'yyyy-MM-dd')]
            period = [end, start]
            break
        default:
            return
    }
    emit('pricePeriodChange', { periodType: presetPeriod.value, period})
}

const validateAndEmitCustomPeriod = () => {
    if (!startDateInput.value || !endDateInput.value) {
        alert('Please select both start and end date')
        return
    }
    if (startDateInput.value > endDateInput.value) {
        alert('Start date cannot be later than end date')
        return
    }
    const period: Date[] = [new Date(endDateInput.value), new Date(startDateInput.value)]
    emit('pricePeriodChange', { periodType: "Custom", period})
}

const items = ref<RadioGroupItem[]>([
  {
    label: 'Day',
    value: 'Day'
  },
  {
    label: 'Week',
    value: 'Week'
  },
  {
    label: 'Month',
    value: 'Month'
  },
  {
    label: 'Year',
    value: 'Year'
  },
  {
    label: 'Custom',
    value: 'Custom'
  }
])
const presetPeriod = ref("Day")
const startDateInput = ref<Date>()
const endDateInput = ref<Date>()
</script>