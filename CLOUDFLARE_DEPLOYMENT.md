# Cloudflare Pages 部署指南

## 迁移说明

项目已从 Netlify 迁移到 Cloudflare Pages，主要改动：

- **后端函数**: `netlify/functions/` → `functions/`
- **API 路径**: `/.netlify/functions` → `/functions`
- **部署平台**: Netlify → Cloudflare Pages

## 前置要求

1. Cloudflare 账号
2. GitHub OAuth App (或创建新的)

## 部署步骤

### 1. 创建 Cloudflare Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **Create a project**
3. 连接你的 GitHub 仓库 `and-action`
4. 配置构建设置：
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/browser`

### 2. 配置环境变量

在 Cloudflare Pages 项目设置中添加以下环境变量：

- `GITHUB_CLIENT_ID`: 你的 GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET`: 你的 GitHub OAuth App Client Secret

**获取方式**:
1. 访问 https://github.com/settings/developers
2. 选择你的 OAuth App (或创建新的)
3. 复制 Client ID 和 Client Secret

### 3. 更新 GitHub OAuth App 回调 URL

在 GitHub OAuth App 设置中，更新 **Authorization callback URL**：

```
https://your-project.pages.dev
```

如果使用自定义域名：
```
https://your-domain.com
```

### 4. 部署

推送代码到 master 分支，Cloudflare Pages 会自动部署。

## 函数说明

项目包含两个 Cloudflare Pages Functions：

### `/functions/auth.ts`
处理 GitHub OAuth 授权重定向

**请求**: `GET /functions/auth`
**响应**: 302 重定向到 GitHub OAuth

### `/functions/access_token.ts`
交换 OAuth code 获取 access token

**请求**: `GET /functions/access_token?code={code}`
**响应**: JSON `{ access_token: "..." }`

## 本地开发

本地开发仍然使用原有方式：

```bash
npm start
```

这会启动：
- Angular dev server (http://localhost:4200)
- 本地 login API (ts-node)

## 成本对比

| 平台 | 免费额度 |
|------|----------|
| **Netlify** | 100GB 流量/月, 300 分钟构建 |
| **Cloudflare Pages** | 无限流量, 500 次构建/月, 100,000 请求/天 |

## 故障排查

### 函数 404 错误
检查路径是否正确：`/functions/auth` 而不是 `/.netlify/functions/auth`

### OAuth 失败
1. 检查环境变量是否设置正确
2. 验证 GitHub OAuth App 回调 URL 匹配部署域名
3. 查看 Cloudflare Pages 函数日志

### 构建失败
检查 `dist/browser` 目录是否正确生成：
```bash
npm run build
ls -la dist/browser
```

## 参考资料

- [Cloudflare Pages Functions 文档](https://developers.cloudflare.com/pages/functions/)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
