<script setup vapor lang="ts">
import SpaceView from '@/views/SpaceView.vue'
import { jeffProfile } from '@/data/jeff'
</script>

<template>
  <SpaceView :space="jeffProfile" />
</template>
