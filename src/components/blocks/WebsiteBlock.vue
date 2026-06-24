<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'

const props = defineProps<{
  block: BioBlock
}>()

const href = String(props.block.content.href ?? `https://${props.block.content.url}`)
</script>

<template>
  <a class="website-block" :href="href" target="_blank" rel="noopener noreferrer">
    <img
      class="website-block__favicon"
      :src="String(block.content.favicon)"
      :alt="String(block.content.title)"
      width="35"
      height="35"
    />
    <span class="website-block__title">{{ block.content.title }}</span>
    <span class="website-block__url">{{ block.content.url }}</span>
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.website-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 18px;
  color: inherit;
  cursor: pointer;
}

.website-block__favicon {
  width: 35px;
  height: 35px;
  border-radius: $radius-icon;
  object-fit: contain;
}

.website-block__title {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.15;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}

.website-block__url {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.15;
  color: $color-text-subtle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
