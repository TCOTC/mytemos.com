<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'

defineProps<{
  block: BioBlock
}>()
</script>

<template>
  <h2 class="title-block">{{ String(block.content.text ?? '') }}</h2>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.title-block {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  color: $color-text;
}
</style>
