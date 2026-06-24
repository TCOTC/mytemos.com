<script setup vapor lang="ts">
import { computed } from 'vue'
import type { ContributionWeek } from '@/types/github'

const props = withDefaults(
  defineProps<{
    weeks: ContributionWeek[]
    visibleWeeks?: number
  }>(),
  {
    visibleWeeks: 22,
  },
)

const displayWeeks = computed(() => {
  const all = props.weeks
  if (all.length <= props.visibleWeeks) return all
  return all.slice(all.length - props.visibleWeeks)
})

const monthLabels = computed(() => {
  const labels: { month: string; index: number }[] = []
  const seen = new Set<string>()

  for (let index = 0; index < displayWeeks.value.length; index++) {
    const week = displayWeeks.value[index]
    if (!week) continue

    for (const day of week.days) {
      if (!day.date) continue

      const date = new Date(`${day.date}T00:00:00`)
      if (date.getDate() !== 1) continue

      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (seen.has(key)) break

      seen.add(key)
      labels.push({
        month: date.toLocaleString('en-US', { month: 'short' }),
        index,
      })
      break
    }
  }

  return labels
})
</script>

<template>
  <div class="contribution-graph" aria-hidden="true">
    <div class="contribution-graph__months">
      <span
        v-for="label in monthLabels"
        :key="`${label.month}-${label.index}`"
        class="contribution-graph__month"
        :style="{ left: `${label.index * 11}px` }"
      >
        {{ label.month }}
      </span>
    </div>
    <div class="contribution-graph__body">
      <div class="contribution-graph__days">
        <span />
        <span>Mon</span>
        <span />
        <span>Wed</span>
        <span />
        <span>Fri</span>
        <span />
      </div>
      <div class="contribution-graph__grid">
        <div
          v-for="(week, weekIndex) in displayWeeks"
          :key="week.days[0]?.date ?? weekIndex"
          class="contribution-graph__week"
        >
          <span
            v-for="day in week.days"
            :key="day.date"
            class="contribution-graph__cell"
            :class="`contribution-graph__cell--${day.level}`"
            :title="`${day.date}: ${day.count} contributions`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.contribution-graph {
  width: 100%;
}

.contribution-graph__months {
  position: relative;
  height: 14px;
  margin-left: 26px;
  margin-bottom: 4px;
}

.contribution-graph__month {
  position: absolute;
  top: 0;
  font-family: $font-pixel;
  font-size: 6px;
  line-height: 1.4;
  color: $color-text-subtle;
  white-space: nowrap;
}

.contribution-graph__body {
  display: flex;
  gap: 4px;
}

.contribution-graph__days {
  display: grid;
  grid-template-rows: repeat(7, 9px);
  gap: 2px;
  width: 22px;
  font-family: $font-pixel;
  font-size: 5px;
  line-height: 9px;
  color: $color-text-subtle;
}

.contribution-graph__grid {
  display: flex;
  gap: 2px;
}

.contribution-graph__week {
  display: grid;
  grid-template-rows: repeat(7, 9px);
  gap: 2px;
}

.contribution-graph__cell {
  width: 9px;
  height: 9px;
  border-radius: 0;
  border: 1px solid rgb(26 26 46 / 12%);
  // 空档：浅灰底
  background-color: #ebedf0;
  image-rendering: pixelated;

  // 由浅到深的绿色梯度，贡献越多颜色越深
  &--1 {
    background-color: #9be9a8;
    border-color: rgb(26 26 46 / 15%);
  }

  &--2 {
    background-color: #40c463;
    border-color: rgb(26 26 46 / 18%);
  }

  &--3 {
    background-color: #30a14e;
    border-color: rgb(26 26 46 / 22%);
  }

  &--4 {
    background-color: #216e39;
    border-color: #216e39;
  }
}
</style>
