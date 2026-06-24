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
          <div class="github-block__icon-wrap">
            <GithubIcon class="github-block__icon" />
          </div>
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
      <div v-if="githubData.bio" class="github-block__aside">
        <span class="github-block__bio">“{{ githubData.bio }}”</span>
      </div>
    </div>
    <div class="github-block__graph">
      <div class="github-block__graph-header">
        <p class="github-block__graph-title">
          {{ githubData.totalContributions }} contributions in the last year
        </p>
        <div class="github-block__legend" aria-hidden="true">
          <span class="github-block__legend-label">Less</span>
          <span class="github-block__legend-cell" />
          <span class="github-block__legend-cell github-block__legend-cell--1" />
          <span class="github-block__legend-cell github-block__legend-cell--2" />
          <span class="github-block__legend-cell github-block__legend-cell--3" />
          <span class="github-block__legend-cell github-block__legend-cell--4" />
          <span class="github-block__legend-label">More</span>
        </div>
      </div>
      <ContributionGraph :weeks="githubData.weeks" />
    </div>
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.github-block {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 14px 16px;
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

.github-block__icon-wrap {
  width: 35px;
  height: 35px;
  padding: 4px;
  background: #fff;
  @include pixel-border(2px);
}

.github-block__icon {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.github-block__app-name {
  font-family: $font-display;
  font-size: 16px;
  line-height: 1.15;
  color: $color-text;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.github-block__username {
  margin-top: 10px;
  font-family: $font-pixel;
  font-size: 7px;
  line-height: 1.6;
  color: $color-text-secondary;
}

.github-block__stat {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  color: $color-text-secondary;
}

.github-block__stat-num {
  font-weight: 700;
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
  font-size: 13px;
  line-height: 1.4;
  color: $color-text-body;
  text-align: right;
  font-style: italic;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  padding: 4px 6px;
  background: rgb(255 255 255 / 60%);
  border-left: 3px solid $memphis-pink;
}

.github-block__graph {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding: 8px 10px 10px;
  background: rgb(255 255 255 / 50%);
  border: 2px dashed $memphis-black;
}

.github-block__graph-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.github-block__graph-title {
  margin: 0;
  font-family: $font-pixel;
  font-size: 6px;
  line-height: 1.6;
  color: $color-text-subtle;
  text-transform: uppercase;
}

.github-block__legend {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
}

.github-block__legend-label {
  font-family: $font-pixel;
  font-size: 5px;
  line-height: 1;
  color: $color-text-subtle;
}

.github-block__legend-cell {
  width: 8px;
  height: 8px;
  border: 1px solid rgb(26 26 46 / 12%);
  background-color: #ebedf0;

  &--1 {
    background-color: #9be9a8;
  }

  &--2 {
    background-color: #40c463;
  }

  &--3 {
    background-color: #30a14e;
  }

  &--4 {
    background-color: #216e39;
    border-color: #216e39;
  }
}
</style>
