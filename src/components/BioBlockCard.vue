<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'
import TitleBlock from '@/components/blocks/TitleBlock.vue'
import WebsiteBlock from '@/components/blocks/WebsiteBlock.vue'
import WebsiteImageBlock from '@/components/blocks/WebsiteImageBlock.vue'
import GithubBlock from '@/components/blocks/GithubBlock.vue'

defineProps<{
  block: BioBlock
}>()
</script>

<template>
  <TitleBlock v-if="block.type === 'title'" :block="block" />
  <WebsiteBlock v-else-if="block.type === 'website'" :block="block" />
  <WebsiteImageBlock v-else-if="block.type === 'website-image'" :block="block" />
  <GithubBlock v-else-if="block.type === 'github'" :block="block" />
</template>
