# mytemos.com

Jeffrey Chen 的个人主页，基于 Vue 3 + TypeScript + Vite 构建。

## 技术栈

- Vue 3.6（Composition API）
- TypeScript
- Vite 8
- SCSS

## 本地开发

```bash
pnpm install
pnpm dev
```

`predev` 会自动拉取 GitHub 贡献数据（若缺失）并构建字体子集。

## 构建

```bash
pnpm build
pnpm preview
```

构建流程会拉取最新 GitHub 数据、生成字体子集、类型检查并打包。

可选环境变量（`scripts/fetch-github.mjs`）：

| 变量 | 说明 |
|------|------|
| `GITHUB_TOKEN` | GitHub API Token，提高请求限额 |
| `GITHUB_USERNAME` | 用户名，默认 `TCOTC` |

## 内容配置

页面文案与卡片布局在 [`src/data/content.json`](src/data/content.json) 中维护；图片放在 [`src/assets/images/`](src/assets/images/)。

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 Cloudflare Pages（见 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)）。

需要立即重新构建时，在仓库的 Actions 页面手动运行 `Deploy to Cloudflare Pages`。

### 每日定时构建

页面上的 GitHub 贡献图需要每天重新构建，所以每天 UTC 21:00（北京时间次日 05:00）会触发一次部署。

公开仓库的定时工作流会在仓库连续 60 天「没有活动」后被 GitHub 自动停用，而且**不发出任何通知**。只有提交算活动，定时运行本身不算。

`deploy.yml` 的 `keepalive` job 处理这件事：只在定时运行时执行，若 `main` 已经安静 45 天以上，就提交一个空提交把计时器清零。正常开发期间不会产生任何额外提交；完全安静时一年最多约 8 个。
