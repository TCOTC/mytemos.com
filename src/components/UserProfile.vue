<script setup vapor lang="ts">
import type { UserProfile } from '@/types/bio'

defineProps<{
  profile: UserProfile
}>()
</script>

<template>
  <section class="user-profile">
    <div class="user-profile__avatar-wrap">
      <img
        class="user-profile__avatar"
        :src="profile.avatar"
        :alt="profile.nickname"
        width="150"
        height="150"
      />
      <span class="user-profile__avatar-badge" aria-hidden="true">ONLINE</span>
    </div>

    <h1 class="user-profile__nickname">
      <span class="user-profile__nickname-text">{{ profile.nickname }}</span>
    </h1>

    <p class="user-profile__description">{{ profile.description }}</p>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.user-profile {
  width: 100%;
  padding: 0 $block-padding-x;
  display: flex;
  flex-direction: column;
}

.user-profile__avatar-wrap {
  position: relative;
  width: fit-content;
}

.user-profile__avatar {
  width: $avatar-size;
  height: $avatar-size;
  border-radius: 0;
  object-fit: cover;
  image-rendering: pixelated;
  @include pixel-border(4px);
  @include hard-shadow($memphis-pink, 6px, 6px);
  background: $memphis-yellow;
}

.user-profile__avatar-badge {
  @include sticker($memphis-lime, 4deg);
  position: absolute;
  bottom: -8px;
  right: -12px;
  z-index: 1;
}

.user-profile__nickname {
  width: 100%;
  margin: 22px 0 0;
  padding: 0;
  font-family: $font-display;
  font-size: $nickname-size;
  font-weight: 400;
  line-height: 1.15;
  color: $color-text;
}

.user-profile__nickname-text {
  display: inline;
  background: linear-gradient(180deg, transparent 55%, $memphis-yellow 55%);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  text-shadow: 2px 2px 0 rgb(255 61 143 / 35%);
}

.user-profile__description {
  margin: 14px 0 0;
  padding: 0 0 8px;
  font-size: $description-size;
  font-weight: 500;
  line-height: 1.7;
  color: $color-text-muted;
  white-space: pre-wrap;
  background: none;
  border: none;
  box-shadow: none;
  background-image:
    linear-gradient($memphis-cyan, $memphis-cyan),
    repeating-linear-gradient(
      90deg,
      $memphis-pink 0,
      $memphis-pink 6px,
      transparent 6px,
      transparent 10px
    );
  background-size:
    56px 3px,
    40px 3px;
  background-repeat: no-repeat;
  background-position:
    0 100%,
    64px 100%;
}

</style>
