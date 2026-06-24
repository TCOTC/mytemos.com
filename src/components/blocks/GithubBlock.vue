<script setup vapor lang="ts">
import type { BioBlock } from '@/types/bio'
import { githubContributions as githubData } from '@/data/github'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import ContributionGraph from '@/components/blocks/ContributionGraph.vue'

defineProps<{
  block: BioBlock
}>()
</script>

<template>
  <a class="github-block" :href="githubData.href" target="_blank" rel="noopener noreferrer">
    <div class="github-block__top">
      <div class="github-block__info">
        <div class="github-block__brand">
          <GithubIcon class="github-block__icon" />
          <span class="github-block__app-name">GitHub</span>
        </div>
        <span class="github-block__username">{{ githubData.name }}</span>
        <span class="github-block__stat">
          仓库：<span class="github-block__stat-num">{{ githubData.repos }}</span>
        </span>
        <span class="github-block__stat">
          粉丝：<span class="github-block__stat-num">{{ githubData.followers }}</span>
        </span>
      </div>
      <div class="github-block__aside">
        <span v-if="githubData.bio" class="github-block__bio">“{{ githubData.bio }}”</span>
        <span class="github-block__btn">查看</span>
      </div>
    </div>
    <div class="github-block__graph">
      <p class="github-block__graph-title">
        {{ githubData.totalContributions }} contributions in the last year
      </p>
      <ContributionGraph :weeks="githubData.weeks" />
    </div>
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.github-block {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 18px;
  color: inherit;
  cursor: pointer;
}

.github-block__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
}

.github-block__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.github-block__brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.github-block__icon {
  width: 35px;
  height: 35px;
  border-radius: $radius-icon;
}

.github-block__app-name {
  font-size: 15px;
  line-height: 1.15;
  color: $color-text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.github-block__username {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.15;
  color: $color-text-secondary;
}

.github-block__stat {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.15;
  color: $color-text-secondary;
}

.github-block__stat-num {
  color: $color-text;
}

.github-block__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.github-block__bio {
  max-width: 120px;
  font-size: 14px;
  line-height: 1.4;
  color: $color-text-body;
  text-align: right;
  font-style: italic;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.github-block__btn {
  margin-top: 8px;
  padding: 4px 14px;
  font-size: 13px;
  line-height: 1.4;
  color: #fff;
  background-color: #000;
  border-radius: 14px;
}

.github-block__graph {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 12px;
  min-height: 0;
  overflow: visible;
}

.github-block__graph-title {
  margin: 0 0 8px;
  font-size: 12px;
  line-height: 1.3;
  color: $color-text-subtle;
}
</style>
