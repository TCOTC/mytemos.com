<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'

const props = defineProps<{
  block: BioBlock
}>()

const href = String(props.block.content.href ?? `https://${props.block.content.url}`)
</script>

<template>
  <a class="website-image-block" :href="href" target="_blank" rel="noopener noreferrer">
    <div class="website-image-block__content">
      <img
        class="website-image-block__favicon"
        :src="String(block.content.favicon)"
        :alt="String(block.content.title)"
        width="35"
        height="35"
      />
      <span class="website-image-block__title">{{ block.content.title }}</span>
      <span class="website-image-block__url">{{ block.content.url }}</span>
    </div>
    <img
      class="website-image-block__preview"
      :src="String(block.content.image)"
      :alt="String(block.content.title)"
      width="115"
      height="115"
    />
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.website-image-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 18px;
  color: inherit;
  cursor: pointer;
  gap: 12px;
}

.website-image-block__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  height: 100%;
}

.website-image-block__favicon {
  width: 35px;
  height: 35px;
  border-radius: $radius-icon;
  object-fit: contain;
}

.website-image-block__title {
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

.website-image-block__url {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.15;
  color: $color-text-subtle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.website-image-block__preview {
  flex-shrink: 0;
  width: 115px;
  height: 115px;
  border-radius: 12px;
  object-fit: cover;
}
</style>
