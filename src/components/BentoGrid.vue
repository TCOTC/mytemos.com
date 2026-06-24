<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'
import BioBlockCard from '@/components/BioBlockCard.vue'
import { blockPlacementStyle, blockThemeStyle, gridContainerStyle } from '@/utils/bento-grid'

const props = defineProps<{
  blocks: BioBlock[]
}>()

function blockClass(block: BioBlock) {
  const classes = [block.type === 'title' ? 'bento-block--title' : 'bento-block--card']
  if (block.sectionGap) classes.push('bento-block--section-gap')
  return classes
}

function blockStyle(block: BioBlock) {
  return {
    ...blockPlacementStyle(block),
    ...blockThemeStyle(block.theme),
  }
}
</script>

<template>
  <div class="bento-grid" :style="gridContainerStyle(props.blocks)">
    <BioBlockCard
      v-for="block in props.blocks"
      :key="block.id"
      :block="block"
      class="bento-block"
      :class="blockClass(block)"
      :style="blockStyle(block)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/grid';
</style>
