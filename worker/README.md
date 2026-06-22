# Serverless AI 代理说明

这个目录提供一个 Cloudflare Worker 示例，用于把前端的“AI 诊断”请求代理到 DeepSeek Chat Completions API。

## 为什么需要代理

GitHub Pages 是纯静态前端，不能安全保存 API Key。真实 AI 调用必须经过 serverless 代理：

- 前端只发送结构化门店信息。
- Worker 从部署平台环境变量读取 `DEEPSEEK_API_KEY`。
- Worker 调用 DeepSeek 后返回固定结构的诊断报告 JSON。
- 前端如果请求失败，会自动回退到浏览器本地的模拟诊断。

## 环境变量

- `DEEPSEEK_API_KEY`：必填，DeepSeek API Key。
- `DEEPSEEK_MODEL`：可选，默认 `deepseek-chat`。

不要把 Key 写进 `demo.html`，也不要提交到 GitHub。建议只在 Cloudflare Worker 控制台或部署平台的 Secret / Environment Variables 中配置。

## 前端接入方式

部署 Worker 后，把 `demo.html` 里的：

```js
const aiEndpoint = "/api/generate-advisor-report";
```

改成 Worker 的公开地址，例如：

```js
const aiEndpoint = "https://xhs-advisor.your-subdomain.workers.dev";
```

Worker 返回结构保持：

```json
{ "report": { "...": "..." } }
```

如果 DeepSeek 请求失败、返回非 JSON，或缺少前端需要的字段，Worker 会返回简短错误，前端会自动使用模拟诊断 fallback。
