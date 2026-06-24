<script setup vapor lang="ts">
import SpaceView from '@/views/SpaceView.vue'
import { spaceProfile } from '@/data/content'
</script>

<template>
  <SpaceView :space="spaceProfile" />
</template>
