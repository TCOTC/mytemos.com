<script setup lang="ts">
import type { Block } from '@/types/block'
import TitleBlock from '@/components/blocks/TitleBlock.vue'
import WebsiteBlock from '@/components/blocks/WebsiteBlock.vue'
import WebsiteImageBlock from '@/components/blocks/WebsiteImageBlock.vue'
import GitHubBlock from '@/components/blocks/GitHubBlock.vue'

defineProps<{
  block: Block
}>()
</script>

<template>
  <TitleBlock v-if="block.type === 'title'" :block="block" />
  <WebsiteBlock v-else-if="block.type === 'website'" :block="block" />
  <WebsiteImageBlock v-else-if="block.type === 'website-image'" :block="block" />
  <GitHubBlock v-else-if="block.type === 'github'" />
</template>
