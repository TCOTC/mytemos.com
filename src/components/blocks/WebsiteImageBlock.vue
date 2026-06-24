<script setup vapor lang="ts">
import { computed } from 'vue'
import type { Block } from '@/types/block'
import { useWebsiteLink } from '@/composables/use-website-link'
import { githubIcon } from '@/data/assets'

type WebsiteImageBlockData = Extract<Block, { type: 'website-image' }>

const props = defineProps<{
  block: WebsiteImageBlockData
}>()

const content = computed(() => props.block.content)
const { href, isGitHub } = useWebsiteLink(content)
</script>

<template>
  <a class="website-image-block" :href="href" target="_blank" rel="noopener noreferrer">
    <div class="website-image-block__content">
      <img
        class="website-image-block__favicon"
        :src="isGitHub ? githubIcon : String(block.content.favicon)"
        :alt="String(block.content.title)"
        width="35"
        height="35"
      />
      <span class="website-image-block__title">{{ block.content.title }}</span>
      <span class="website-image-block__url">{{ block.content.url }}</span>
    </div>
    <div class="website-image-block__preview-wrap">
      <img
        class="website-image-block__preview"
        :src="String(block.content.image)"
        :alt="String(block.content.title)"
        width="115"
        height="115"
      />
    </div>
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.website-image-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 14px 16px;
  color: inherit;
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
  @include pixel-border(2px);
  background: #fff;
  image-rendering: pixelated;
}

.website-image-block__title {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  color: $color-text;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}

.website-image-block__url {
  margin-top: 8px;
  font-family: $font-pixel;
  font-size: 7px;
  line-height: 1.6;
  color: $color-text-subtle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.website-image-block__preview-wrap {
  flex-shrink: 0;
  padding: 4px;
  background: $memphis-yellow;
  @include pixel-border(2px);
  @include hard-shadow(var(--card-accent, $memphis-purple), 3px, 3px);
}

.website-image-block__preview {
  display: block;
  width: 105px;
  height: 105px;
  border-radius: 0;
  object-fit: cover;
  image-rendering: pixelated;
  @include pixel-border(2px);
}
</style>
