<script setup vapor lang="ts">
import { computed } from 'vue'
import type { BioBlock } from '@/types/bio'
import GithubIcon from '@/components/icons/GithubIcon.vue'

type WebsiteBlockData = Extract<BioBlock, { type: 'website' }>

const props = defineProps<{
  block: WebsiteBlockData
}>()

const href = String(props.block.content.href ?? `https://${props.block.content.url}`)

const isGithub = computed(() => {
  try {
    return new URL(href).hostname === 'github.com'
  } catch {
    return String(props.block.content.url) === 'github.com'
  }
})
</script>

<template>
  <a class="website-block" :href="href" target="_blank" rel="noopener noreferrer">
    <div v-if="isGithub" class="website-block__favicon website-block__favicon--github">
      <GithubIcon />
    </div>
    <img
      v-else
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
@use '@/assets/scss/mixins' as *;

.website-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 14px 16px;
  color: inherit;
  cursor: pointer;
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

.website-block__favicon--github {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  svg {
    width: 100%;
    height: 100%;
  }
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
