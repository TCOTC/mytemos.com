<script setup lang="ts">
import { computed } from 'vue'
import { githubContributions } from '@/data/github'
import { ui } from '@/data/content'
import { githubIcon } from '@/data/assets'
import ContributionGraph from '@/components/blocks/github/ContributionGraph.vue'

const metrics = computed(() => [
  { key: 'repos', value: githubContributions.repos, label: ui.github.reposLabel },
  { key: 'followers', value: githubContributions.followers, label: ui.github.followersLabel },
  { key: 'following', value: githubContributions.following, label: ui.github.followingLabel },
  { key: 'starred', value: githubContributions.starred, label: ui.github.starredLabel },
  {
    key: 'streak',
    value: githubContributions.currentStreak,
    label: ui.github.streakLabel,
    suffix: ui.github.streakSuffix,
  },
])
</script>

<template>
  <a class="github-block" :href="githubContributions.href" target="_blank" rel="noopener noreferrer">
    <div class="github-block__top">
      <div class="github-block__header">
        <div class="github-block__brand">
          <div class="github-block__icon-wrap">
            <img class="github-block__icon" :src="githubIcon" alt="" width="27" height="27" />
          </div>
          <span class="github-block__app-name">{{ ui.github.appName }}</span>
        </div>
        <span class="github-block__handle">{{ ui.github.loginPrefix }}{{ githubContributions.login }}</span>
      </div>

      <div class="github-block__summary">
        <p v-if="githubContributions.bio" class="github-block__bio">
          {{ ui.github.bioQuoteOpen }}{{ githubContributions.bio }}{{ ui.github.bioQuoteClose }}
        </p>

        <ul class="github-block__metrics">
        <li
          v-for="metric in metrics"
          :key="metric.key"
          class="github-block__metric"
          :class="`github-block__metric--${metric.key}`"
        >
          <span class="github-block__metric-value">
            {{ metric.value }}<span v-if="metric.suffix" class="github-block__metric-suffix">{{
              metric.suffix
            }}</span>
          </span>
          <span class="github-block__metric-label">{{ metric.label }}</span>
        </li>
        </ul>
      </div>
    </div>

    <div class="github-block__graph">
      <div class="github-block__graph-header">
        <p class="github-block__graph-title">
          {{ githubContributions.totalContributions }} {{ ui.github.contributionsSuffix }}
        </p>
        <div class="github-block__legend" aria-hidden="true">
          <span class="github-block__legend-label">{{ ui.github.less }}</span>
          <span class="github-block__legend-cell" />
          <span class="github-block__legend-cell github-block__legend-cell--1" />
          <span class="github-block__legend-cell github-block__legend-cell--2" />
          <span class="github-block__legend-cell github-block__legend-cell--3" />
          <span class="github-block__legend-cell github-block__legend-cell--4" />
          <span class="github-block__legend-label">{{ ui.github.more }}</span>
        </div>
      </div>
      <ContributionGraph :weeks="githubContributions.weeks" />
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
}

.github-block__top {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.github-block__summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.github-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.github-block__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
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
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.github-block__handle {
  flex-shrink: 0;
  font-family: $font-pixel;
  font-size: 7px;
  line-height: 1.6;
  color: $memphis-purple;
}

.github-block__bio {
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  line-height: 1.45;
  color: $color-text-muted;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  background: linear-gradient(180deg, transparent 58%, rgb(0 229 255 / 26%) 58%);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.github-block__metrics {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.github-block__metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 44px;
  min-width: 0;
  padding: 4px 2px;
  background: rgb(255 255 255 / 70%);
  @include pixel-border(2px);
}

.github-block__metric-value {
  font-family: $font-display;
  font-size: 13px;
  line-height: 1.1;
  color: $color-text;
  white-space: nowrap;
}

.github-block__metric-suffix {
  margin-left: 1px;
  font-family: $font-body;
  font-size: 9px;
  font-weight: 500;
}

.github-block__metric-label {
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
  color: $color-text-secondary;
  text-align: center;
  white-space: nowrap;
}

.github-block__metric--streak {
  background: rgb(191 255 0 / 22%);

  .github-block__metric-value {
    color: #2d6b1f;
  }
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
  @include contribution-level-colors;
}

@media (max-width: $breakpoint-mobile) {
  .github-block__metric {
    min-height: 36px;
    padding: 3px 1px;
  }

  .github-block__metric-value {
    font-size: 10px;
  }

  .github-block__metric-label {
    font-size: 7px;
  }
}
</style>
