#!/usr/bin/env node
// 一键发布新博客(B3):build 验证 → commit/push(Vercel 自动部署)→ IndexNow 推 Bing。
//
// 把"加一篇博客"剩下的机械活串成一条命令。人工把关后的内容一旦进 lib/posts.tsx
// (或迁移后的 content/blog/<slug>.mdx),跑这个即可上线。
//
// 用法:
//   node scripts/publish_blog.mjs <slug> [more slugs...]
//   node scripts/publish_blog.mjs what-is-a-good-dividend-payout-ratio
//   node scripts/publish_blog.mjs --skip-build <slug>     # 已 build 过,跳过验证
//   node scripts/publish_blog.mjs --dry-run <slug>        # 只打印将执行的步骤,不跑
//
// 流程:① npm run build(失败则中止,不 push)② git add/commit/push main
//      ③ node scripts/indexnow.mjs <新 URL>  ④ 提醒 GSC 手动请求索引(GSC 无 API)
// 幂等:build 失败/中途断不会重复 push(push 前才 commit;commit 失败不影响远程)。

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.dividendpayoutcalculator.com';
const BASE = `https://${HOST}`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipBuild = args.includes('--skip-build');
const slugs = args.filter((a) => !a.startsWith('-'));

if (slugs.length === 0) {
  console.error('Usage: node scripts/publish_blog.mjs <slug> [more slugs...] [--skip-build] [--dry-run]');
  console.error('  slug = lib/posts.tsx 里的 slug(也是 URL 段 /blog/<slug>)');
  process.exit(1);
}

const urls = slugs.map((s) => `${BASE}/blog/${s}`);

function run(cmd, args, { stdio = 'inherit', cwd = REPO_ROOT } = {}) {
  // 统一子进程调用:非零退出抛错,由调用方决定是否中止。
  const res = spawnSync(cmd, args, { stdio, cwd, shell: process.platform === 'win32' });
  if (res.status !== 0) {
    throw new Error(`\`${[cmd, ...args].join(' ')}\` 退出码 ${res.status}`);
  }
  return res;
}

function step(label, fn) {
  console.log(`\n━━━ ${label} ━━━`);
  if (dryRun) {
    console.log('(dry-run 跳过)');
    return;
  }
  fn();
}

try {
  const todo = [`build × ${skipBuild ? '跳过' : '1'}`, 'git commit/push main', `IndexNow ${urls.length} URL`];
  console.log(`publish_blog · slugs: ${slugs.join(', ')}`);
  console.log(`将执行:${todo.join(' · ')}`);
  urls.forEach((u) => console.log(`  → ${u}`));

  // ① build 验证(失败必停,绝不 push 一个 build 不过的提交)
  if (!skipBuild) {
    step('① npm run build(验证编译)', () => run('npm', ['run', 'build']));
  } else {
    console.log('\n━━━ ① npm run build(--skip-build,跳过)━━━');
  }

  // ② commit + push
  step('② git commit + push main(触发 Vercel)', () => {
    run('git', ['add', '-A']);
    const msg = `blog: publish ${slugs.join(', ')}`;
    run('git', ['commit', '-m', msg]);
    run('git', ['push', 'origin', 'main']);
  });

  // ③ IndexNow 推 Bing/Yandex(失败不致命)
  step('③ IndexNow(推 Bing)', () => {
    try {
      run('node', [join('scripts', 'indexnow.mjs'), ...urls]);
    } catch (e) {
      console.warn(`⚠️ IndexNow 失败(不致命):${e.message}`);
      console.warn('   墙内可改用 indexnow.mjs 文件头注释里的 curl + -x 代理方式手推。');
    }
  });

  // ④ GSC 手动提醒(纯人工,GSC 无公开 API)
  console.log('\n━━━ ④ GSC 请求索引(人工,最后一步)━━━');
  console.log('打开 https://search.google.com/search-console → 网址检查 → 逐个「请求编入索引」:');
  urls.forEach((u) => console.log(`  ${u}`));

  console.log(`\n✅ 发布完成。${slugs.length} 篇已上线 + 推 Bing。Vercel 部署约 1-2 分钟后生效。`);
} catch (e) {
  console.error(`\n❌ 中止:${e.message}`);
  console.error('build 不过就别 push —— 先修到 build 绿,再重跑本脚本。');
  process.exit(1);
}
