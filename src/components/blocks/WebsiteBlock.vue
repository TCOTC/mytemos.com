<script setup vapor lang="ts">
import { computed } from 'vue'
import type { Block } from '@/types/block'
import { useWebsiteLink } from '@/composables/use-website-link'
import { githubIcon } from '@/data/assets'

type WebsiteBlockData = Extract<Block, { type: 'website' }>

const props = defineProps<{
  block: WebsiteBlockData
}>()

const content = computed(() => props.block.content)
const { href, isGitHub } = useWebsiteLink(content)
</script>

<template>
  <a class="website-block" :href="href" target="_blank" rel="noopener noreferrer">
    <img
      class="website-block__favicon"
      :src="isGitHub ? githubIcon : String(block.content.favicon)"
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
@use '@/assets/scss/mixins' as *;

.website-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 14px 16px;
  color: inherit;
}

.website-block__favicon {
  width: 35px;
  height: 35px;
  border-radius: $radius-icon;
  object-fit: contain;
  @include pixel-border(2px);
  background: #fff;
  image-rendering: pixelated;
}

.website-block__title {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  color: $color-text;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}

.website-block__url {
  margin-top: 8px;
  font-family: $font-pixel;
  font-size: 7px;
  line-height: 1.6;
  color: $color-text-subtle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
