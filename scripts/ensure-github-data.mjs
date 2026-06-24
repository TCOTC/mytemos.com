import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'src/data/github-contributions.json')

if (!existsSync(output)) {
  console.log('github-contributions.json 不存在，正在拉取…')
  const result = spawnSync('node', ['scripts/fetch-github.mjs'], {
    cwd: root,
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
