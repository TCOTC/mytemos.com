<script setup vapor lang="ts">
import type { Block } from '@/types/block'
import BlockRenderer from '@/components/block/BlockRenderer.vue'
import { blockPlacementStyle, blockThemeStyle, gridContainerStyle } from '@/utils/block-grid'

const props = defineProps<{
  blocks: Block[]
}>()

function itemClass(block: Block) {
  const classes = [block.type === 'title' ? 'block-grid__item--title' : 'block-grid__item--card']
  if (block.sectionGap) classes.push('block-grid__item--section-gap')
  return classes
}

function itemStyle(block: Block) {
  return {
    ...blockPlacementStyle(block),
    ...blockThemeStyle(block.theme),
  }
}
</script>

<template>
  <div class="block-grid" :style="gridContainerStyle(props.blocks)">
    <BlockRenderer
      v-for="block in props.blocks"
      :key="block.id"
      :block="block"
      class="block-grid__item"
      :class="itemClass(block)"
      :style="itemStyle(block)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/grid';
</style>
