<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'

type TitleBlockData = Extract<BioBlock, { type: 'title' }>

defineProps<{
  block: TitleBlockData
}>()
</script>

<template>
  <div class="title-block">
    <h2 class="title-block__text">{{ String(block.content.text) }}</h2>
    <svg class="title-block__squiggle" viewBox="0 0 120 12" aria-hidden="true">
      <path
        d="M2 8 C 20 2, 40 10, 60 6 S 100 2, 118 8"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
    <span class="title-block__deco" aria-hidden="true">///</span>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.title-block {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: $title-block-inner-gap;
  width: 100%;
}

.title-block__text {
  margin: 0;
  font-family: $font-display;
  font-size: $title-block-font-size;
  font-weight: 400;
  line-height: $title-block-line-height;
  color: $color-text;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.title-block__squiggle {
  width: 100px;
  height: $title-block-squiggle-height;
  color: var(--title-accent, $memphis-pink);
  filter: drop-shadow(1px 1px 0 $memphis-black);
}

.title-block__deco {
  position: absolute;
  top: 0;
  right: 0;
  font-family: $font-pixel;
  font-size: 8px;
  color: $memphis-purple;
  letter-spacing: 0.2em;
  opacity: 0.7;
}
</style>
