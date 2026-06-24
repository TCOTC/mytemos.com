<script setup lang="ts">
import type { SpaceProfile } from '@/types/block'
import UserProfile from '@/components/profile/UserProfile.vue'
import BlockGrid from '@/components/block/BlockGrid.vue'

defineProps<{
  space: SpaceProfile
}>()
</script>

<template>
  <div class="space-view">
    <div class="space-view__deco" aria-hidden="true">
      <span class="space-view__shape space-view__shape--circle space-view__shape--pink" />
      <span class="space-view__shape space-view__shape--triangle space-view__shape--cyan" />
      <span class="space-view__shape space-view__shape--zigzag space-view__shape--yellow" />
      <span class="space-view__shape space-view__shape--dots space-view__shape--purple" />
      <span class="space-view__shape space-view__shape--cross space-view__shape--lime" />
    </div>

    <div class="space-view__layout">
      <aside class="space-view__sidebar">
        <UserProfile :profile="space.user" />
      </aside>

      <main class="space-view__main">
        <BlockGrid :blocks="space.blocks" />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.space-view {
  position: relative;
  min-height: 100vh;
  background-color: transparent;
  overflow-x: clip;
}

.space-view__deco {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.space-view__shape {
  position: absolute;
  display: block;
}

.space-view__shape--circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid $memphis-black;
  top: 6%;
  right: 8%;
  opacity: 0.55;
}

.space-view__shape--triangle {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid $memphis-cyan;
  bottom: 12%;
  left: 5%;
  opacity: 0.5;
  filter: drop-shadow(3px 3px 0 $memphis-black);
}

.space-view__shape--zigzag {
  width: 80px;
  height: 24px;
  top: 42%;
  left: 3%;
  background: repeating-linear-gradient(
    90deg,
    $memphis-yellow 0,
    $memphis-yellow 8px,
    transparent 8px,
    transparent 16px
  );
  transform: rotate(-12deg);
  opacity: 0.7;
}

.space-view__shape--dots {
  width: 64px;
  height: 64px;
  bottom: 28%;
  right: 6%;
  background-image: radial-gradient($memphis-purple 3px, transparent 3px);
  background-size: 12px 12px;
  opacity: 0.45;
}

.space-view__shape--cross {
  width: 48px;
  height: 48px;
  top: 18%;
  left: 12%;
  opacity: 0.4;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: $memphis-lime;
    border: 2px solid $memphis-black;
  }

  &::before {
    width: 100%;
    height: 12px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &::after {
    width: 12px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
}

.space-view__shape--pink {
  background: $memphis-pink;
  box-shadow: 5px 5px 0 $memphis-black;
}

.space-view__layout {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: $space-view-padding-top;
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
    padding-top: $space-view-padding-top-wide;
    padding-bottom: 0;
  }

  .space-view__sidebar {
    width: $profile-width-wide;
    position: sticky;
    top: $space-view-padding-top-wide;
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

  .space-view__shape--circle,
  .space-view__shape--triangle {
    opacity: 0.3;
    transform: scale(0.7);
  }
}
</style>
