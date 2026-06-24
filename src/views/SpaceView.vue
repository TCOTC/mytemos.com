<script setup vapor lang="ts">
import type { SpaceProfile } from '@/types/bio'
import UserProfile from '@/components/UserProfile.vue'
import BentoGrid from '@/components/BentoGrid.vue'

defineProps<{
  space: SpaceProfile
}>()
</script>

<template>
  <div class="space-view">
    <div class="space-view__layout">
      <aside class="space-view__sidebar">
        <UserProfile :profile="space.user" />
      </aside>

      <main class="space-view__main">
        <BentoGrid :blocks="space.blocks" />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.space-view {
  background-color: $color-bg;
}

.space-view__layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
}

.space-view__sidebar {
  width: 100%;
  max-width: $grid-width-desktop;
}

.space-view__main {
  width: 100%;
  max-width: $grid-width-desktop;
}

@media (min-width: $breakpoint-wide) {
  .space-view__layout {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding-top: 40px;
    padding-bottom: 0;
  }

  .space-view__sidebar {
    width: $profile-width-wide;
    margin-right: $profile-gap-wide;
    position: sticky;
    top: 40px;
    flex-shrink: 0;
    align-self: flex-start;
  }

  .space-view__main {
    width: $grid-width-desktop;
    max-width: $grid-width-desktop;
    flex-shrink: 0;
  }
}

@media (max-width: $breakpoint-mobile) {
  .space-view__sidebar {
    width: $grid-width-mobile;
    max-width: $grid-width-mobile;
  }

  .space-view__main {
    width: $grid-width-mobile;
    max-width: $grid-width-mobile;
  }
}
</style>
