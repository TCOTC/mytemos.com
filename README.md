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
