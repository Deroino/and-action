<div align="center">

# 🎬 And Action - 监控您的GitHub Actions工作流

<div align="center">
  <div style="width: 100%; height: 2px; margin: 20px 0; background: linear-gradient(90deg, transparent, #00d9ff, transparent);"></div>
</div>

<div align="center">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; padding: 25px; text-align: center;">
    <p>
      <a href="README_CN.md"><img src="https://img.shields.io/badge/🇨🇳中文版-1a1a2e?style=for-the-badge"></a>
      <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸English-1a1a2e?style=for-the-badge"></a>
    </p>
  </div>
</div>

</div>

And Action 是一个用于监控 GitHub Actions 的网络应用，可在 [https://and-action-next.pages.dev/](https://and-action-next.pages.dev/) 访问。
它让您能够在一个地方跟踪所有相关仓库的状态。

它显示您仓库主分支的 GitHub Actions 工作流当前状态。
此外，它还显示您仓库的提交历史以及部署信息。
另外，您可以直接在 UI 中触发 GitHub 部署。

请阅读[文档](#文档)了解更多信息。

<img width="2547" height="1211" alt="image" src="https://github.com/user-attachments/assets/b88f45d1-0a93-4dcd-941c-f0bedca5260c" />
<img width="2554" height="1219" alt="image" src="https://github.com/user-attachments/assets/b4c76c27-3e40-420e-82a6-d80354f0dc37" />
<img width="2531" height="1206" alt="image" src="https://github.com/user-attachments/assets/a7f7ed8d-6cdc-4500-92d9-02b575b3643b" />


## 文档

本文档解释了如何使用 And Action。


### 先决条件

要运行 And Action，您需要一个 GitHub 账户来登录。
And Action 需要以下权限：

* 组织和团队：只读访问权限
* 仓库：公共和私有仓库


### 入门指南

在浏览器中打开 [https://and-action-next.pages.dev/](https://and-action-next.pages.dev/)。

首次登录 And Action 时，系统会要求您选择要监控的仓库。列表显示您的所有个人仓库以及您所属组织的仓库。使用要监控仓库旁边的复选框，然后点击保存。

接下来，您将被带到包含所有选定仓库的 Actions 视图。
要更改仓库选择，请点击顶部工具栏右侧的设置按钮。
在移动设备上，通过顶部工具栏右侧的汉堡按钮打开菜单，然后点击"设置"。

> **注意**
> 设置保存在您的浏览器中。因此它们不会在您的设备或不同浏览器之间同步。

现在您可以开始使用 And Action 的两个视图，即 [Actions](#actions) 和 [提交与部署](#提交与部署)。


### Actions

Actions 视图为每个仓库显示一张卡片。仓库按组织分组，并按仓库名称排序。每张卡片包含其主分支的名称。

点击仓库名称会打开[提交与部署](#提交与部署)视图，并滚动到点击的仓库。
点击分支名称会在新浏览器标签页中导航到 GitHub。

在卡片底部，您可以看到工作流标签。每个标签是为主分支配置的工作流。
如果至少存在一个工作流运行，则会显示工作流标签。

标签的颜色和标签右侧的图标表示最后一次工作流运行的状态。点击标签会在新浏览器标签页中导航到 GitHub 上的此工作流运行。

标签可以具有以下状态之一：

* 成功
* 错误
* 进行中
* 等待中
* 已跳过

为了更快地找到仓库，可以使用工具栏中的仓库过滤器。它会过滤所有在仓库名称某处包含输入文本的仓库。过滤器不区分大小写。您甚至可以有多个用","分隔的过滤值，例如，如果您过滤"one,two"，您将获得所有名称中包含"one"或"two"的仓库。

#### 配置选项

> **注意**
> 有关 And Action 配置的深入解释，请参阅[配置](#配置)。

关于 Actions 视图的选项在您的 `andaction.yml` 文件中的 `actions` 属性下设置。

目前，Actions 视图只有一个选项：`excluded-workflows`

##### excluded-workflows

可能有一些工作流您不希望出现在 Actions 视图中，例如在功能分支上运行检查的工作流或调度的工作流，因此总是在主分支的上下文中运行。

要从视图中排除它们，您可以在 And Action 配置文件中添加配置部分。

```yaml
actions:
  excluded-workflows:
    - Manually deploy app
```

列表中的项目是您在该工作流中定义的名称，**不是**文件名。

因此，上面的示例将排除以下工作流：

```yaml
# manual-deployment.yml
name: Manually deploy app

on: [workflow_dispatch]

jobs:
  job1:
    runs-on: ubuntu-latest
  # ...
```


### 提交与部署

提交与部署视图为每个仓库显示一列。仓库按组织分组，并按仓库名称排序。每个仓库列包含其主分支的名称。

点击仓库名称或分支名称会在新浏览器标签页中导航到 GitHub。

在主分支名称下方，您可以看到主分支中最新提交的提交历史，即您只看到在某个时候合并到主分支的提交。其他开放分支在此处**不**可见。

为了更快地找到仓库，可以以与 Actions 视图中相同的方式使用仓库过滤器。


#### 部署

如果提交通过 GitHub 的部署 API 进行了部署，则会在提交处显示一个标签，包含部署到的环境名称以及该部署的状态。显示活动部署以及非活动部署。非活动部署的标签比活动部署显示得更浅。每个环境都有自己的颜色。这些颜色没有特殊含义。它们不同以便于区分。标签右侧的图标表示部署的状态。

标签可以具有以下状态之一：

* 成功
* 错误
* 进行中
* 等待中
* 已跳过

如果为环境的部署设置了日志 URL，则标签是指向该 URL 的链接。


#### 触发部署

要为提交触发部署，您必须点击部署按钮（树状视图中提交信息右侧的火箭）。只有在配置了部署环境且仓库未归档时，才能使用部署对话框。

假设现在您已配置了三个部署环境，即 `dev`、`test` 和 `live`。

部署对话框显示所有三个环境及其状态。部署只能一个接一个地触发。因此，在此示例中，您可以先将提交部署到 dev 环境。

如果部署成功，您可以部署到 `test`。也可以重新部署 `dev`。

当满足以下条件时，可以部署到环境：

* 之前环境的部署已成功完成。
* 所选环境没有进行中的部署，即使对于其他提交也没有。
* 应该部署的提交处于成功状态，即默认分支的 GitHub 检查套件（不包含在[排除的工作流](#excluded-workflows)列表中的）都已成功完成。
* 提交历史是当前状态。否则，您需要先重新加载视图。


##### 创建部署的请求

触发部署时，And Action 调用 GitHub 的 REST API 来创建部署。因此，为所选环境创建一个状态为 pending 的新部署。

创建部署的 POST 请求在有效负载中包含以下属性：

* `auto_merge`: `false`
* `description`: `"Deployed via And Action"`
* `environment`: 触发部署的环境名称，例如 `dev`、`test` 或 `live`。
* `payload`: 包含附加信息的自定义有效负载。包含属性 `deployment_type`，其值为 `'forward'`、`'redeploy'` 或 `'rollback'` 之一。
* `production_environment`: 如果 `environment` 的值为 `'live'` 或 `'production'`，则为 `true`，否则为 `false`
* `ref`: 提交 sha


##### 部署工作流

在 GitHub 中创建部署时，它会启动具有触发器 `deployment` 的 GitHub Actions 工作流。此工作流应执行实际部署，另外还应负责为部署设置正确的状态，即在开始时将其设置为"进行中"，在结束时将其设置为"成功"或"失败"。此外，您应该设置 `log_url`。如果为部署设置了 `log_url`，And Action 将在提交与部署视图中将其链接到环境标签。可能，`log_url` 应设置为由部署触发的工作流运行。

部署工作流示例：
```yaml
# <repository_root>/.github/workflows/deploy.yaml
name: Deploy
on: [deployment]
jobs:
  deploy-heroku:
    runs-on: ubuntu-22.04
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    steps:
      - name: Set deployment state in progress
        run: |
          gh api \
          --method POST \
          -H "Accept: application/vnd.github.v3+json" \
          /repos/${{ github.repository_owner }}/${{ github.event.repository.name }}/deployments/${{ github.event.deployment.id }}/statuses \
          -f environment="${{ github.event.deployment.environment }}" \
          -f state="in_progress" \
          -f log_url="${{ github.event.deployment.url }}"

      - uses: actions/checkout@v3

      - name: Deploy
        # 执行到您的服务器的实际部署，例如 AWS、Heroku、Netlify、Vercel 等。

      - name: Set deployment state
        if: always()
        run: |
          gh api \
          --method POST \
          -H "Accept: application/vnd.github.v3+json" \
          /repos/${{ github.repository_owner }}/${{ github.event.repository.name }}/deployments/${{ github.event.deployment.id }}/statuses \
          -f environment="${{ github.event.deployment.environment }}" \
          -f state="${{ job.status == 'success' && 'success' || 'failure' }}"
```


#### 配置选项

> **注意**
> 有关 And Action 配置的深入解释，请参阅[配置](#配置)。

关于提交与部署视图的选项在您的 `andaction.yml` 文件中的 `deployment` 属性下设置。

目前，有两个关于部署的选项：`environments` 和 `excluded-workflows`

`deployment` 的配置示例：

```yaml
deployment:
  environments:
    - name: dev
    - name: test
    - name: staging
      requires:
        - dev
        - test
    - name: live
      requires:
        - staging
  excluded-workflows:
    - Deploy
    - Manually deploy app
```


##### environments

此属性包含可用环境的列表，按它们在部署对话框中出现的顺序排列。每个环境都有一个名称和一个可选的所需环境列表，这些环境需要在此环境之前部署。因此，在上面的示例中，有四个环境，即 `dev`、`test`、`staging` 和 `live`。`dev` 和 `test` 总是可以部署，而 `staging` 只能在 `dev` 和 `test` 部署后才能部署，`live` 只能在 `staging` 部署后才能部署。


##### excluded-workflows

要为提交触发部署，提交必须处于成功状态，即其所有检查和工作流运行都必须成功。可能存在配置了一些不应考虑用于该检查的工作流，例如手动将应用程序部署到某些演示服务器的工作流。

要从视图中排除它们，将它们列为 `excluded-workflows`。

列表中的项目是您在该工作流中定义的名称，**不是**文件名。

> **注意**
> 部署工作流**必须**包含在此列表中。否则，您永远无法重新部署具有失败部署的提交。


### 配置

以上章节已经解释了配置文件的可用属性。
本章解释 And Action 在哪里搜索配置文件以及它们如何组合。

通常，您可以在组织级别或仓库级别设置配置。
要为整个组织设置配置，您需要在该组织内创建一个仓库 `.github`。在该仓库中，您必须在 `.github` 目录中创建文件 `andaction.yml`。

示例：假设您的组织名称为 `my-org`，您创建仓库 `my-org/.github`。在该仓库中，您创建文件 `.github/andaction.yml`。

此外，可以为特定仓库设置配置。为此，您在特定仓库中创建文件 `.github/andaction.yml`。

如果同时存在组织级别的配置和仓库级别的配置，这些文件将被合并，仓库的配置优先于组织的配置。

顶级属性被合并。它们的子属性**不**被合并。组织的配置属性被设置并被仓库的属性覆盖。

#### 示例文件

```yaml
# 组织配置
actions:
  excluded-workflows:
    - Manually deploy app

deployment:
  environments:
    - name: dev
    - name: test
    - name: staging
      requires:
        - dev
        - test
    - name: live
      requires:
        - staging
  excluded-workflows:
    - Manually deploy app
```
```yaml
# 仓库配置
deployment:
  excluded-workflows:
    - Deploy
    - Test checks
```
```yaml
# 结果配置
actions:
  excluded-workflows:
    - Manually deploy app

deployment:
  environments:
    - name: dev
    - name: test
    - name: staging
      requires:
        - dev
        - test
    - name: live
      requires:
        - staging
  excluded-workflows:
    - Deploy
    - Test checks
```


## 开发


### 开发环境设置

要在您的机器上创建本地开发环境，请安装 [Node.js](https://nodejs.org)，克隆仓库并运行 `npm install`。


#### 配置 GitHub OAuth 应用

在生产环境中，And Action 利用 GitHub OAuth 应用"And Action"来处理登录。当在您的机器上本地开发 And Action 时，您需要有一个 GitHub OAuth 应用来处理登录，并在成功登录后将您重定向到 `http://localhost:4200`。

请按照以下步骤创建 GitHub OAuth 应用：

1. 在浏览器中打开您的 GitHub 个人资料或您希望 GitHub OAuth 应用所在的 GitHub 组织。
2. 打开设置 -> 开发者设置 -> OAuth 应用。
3. 点击"New OAuth App"。
4. 为您的应用起一些有意义的名称，如"And Action local development"。主页 URL 可以设置为一些随机值。授权回调 URL 必须是 `http://localhost:4200`。提交表单。
5. 生成新的客户端密钥。复制客户端 ID 和生成的客户端密钥。密钥以后无法显示。
6. 在您机器上克隆仓库的根文件夹中创建 `.env` 文件，并添加以下两个环境变量，值为您刚刚生成的值：
    ```
    GITHUB_CLIENT_ID=<GitHub client ID>
    GITHUB_CLIENT_SECRET=<GitHub client secret>
    ```

现在您的本地登录 API 应该能够正确处理您的登录请求。


#### 本地运行 And Action

运行 `npm start` 来启动 And Action。打开浏览器并导航到 `http://localhost:4200`。应用程序启动。`npm start` 也会启动本地登录 API。

本地登录 API 为 And Action 的本地开发提供简单的登录 API 实现。在 And Action 中点击"Login with GitHub"时，登录 API 使用您在 `.env` 文件中配置的客户端 ID 和客户端密钥重定向到 GitHub 上的登录表单。成功登录后，您将被重定向到 `http://localhost:4200`。现在您已登录，可以像生产环境中一样使用本地运行的应用程序。


### 发布

新功能在单独的功能分支中开发。将它们推送到 GitHub 会运行 GitHub Actions 中的 CI 工作流。将功能分支合并到 master 也会运行 CI 工作流。

应用部署在 Cloudflare Pages 上，每次推送到 master 分支会自动部署至 [https://and-action-next.pages.dev/](https://and-action-next.pages.dev/)。


### Renovate

And Action 使用 [MEND Renovate](https://www.mend.io/renovate/) 自动每周更新 NPM 包。配置在 `renovate.json` 中定义。


## 致谢

本项目受到原始 [And Action](https://github.com/and-action/and-action) 项目的启发并基于其开发。我们感谢原作者和贡献者的出色工作，为这个实现提供了坚实的基础。
