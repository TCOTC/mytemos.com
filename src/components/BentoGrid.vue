<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'
import BioBlockCard from '@/components/BioBlockCard.vue'

defineProps<{
  blocks: BioBlock[]
}>()

function blockClass(block: BioBlock) {
  return block.type === 'title' ? 'bento-block--title' : 'bento-block--card'
}
</script>

<template>
  <div class="bento-grid">
    <BioBlockCard
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      class="bento-block"
      :class="[blockClass(block), `bento-block--${block.id}`]"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/grid';
</style>
