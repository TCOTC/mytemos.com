<script setup vapor lang="ts">
import type { UserProfile } from '@/types/bio'

defineProps<{
  profile: UserProfile
}>()
</script>

<template>
  <section class="user-profile">
    <img
      class="user-profile__avatar"
      :src="profile.avatar"
      :alt="profile.nickname"
      width="150"
      height="150"
    />
    <h1 class="user-profile__nickname">{{ profile.nickname }}</h1>
    <p class="user-profile__description">{{ profile.description }}</p>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.user-profile {
  width: 100%;
  padding: 0 $block-padding-x;
  display: flex;
  flex-direction: column;
}

.user-profile__avatar {
  width: $avatar-size;
  height: $avatar-size;
  border-radius: calc($avatar-size / 2);
  object-fit: cover;
}

.user-profile__nickname {
  width: 100%;
  margin: 18px 0 0;
  padding: 8px 0;
  font-size: $nickname-size;
  font-weight: 700;
  line-height: 1.25;
  color: $color-text;
}

.user-profile__description {
  width: 100%;
  margin: 2px 0 0;
  padding: 8px 0;
  font-size: $description-size;
  line-height: 1.6;
  color: $color-text-muted;
  white-space: pre-wrap;
}
</style>
