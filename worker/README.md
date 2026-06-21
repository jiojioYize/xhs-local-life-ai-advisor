# Serverless AI 代理说明

这个目录提供一个 Cloudflare Worker 示例，用于把前端的“AI 诊断”请求代理到 OpenAI Responses API。

## 为什么需要代理

GitHub Pages 是纯静态前端，不能安全保存 API Key。真实 AI 调用必须经过 serverless 代理：

- 前端只发送结构化门店信息。
- Worker 从环境变量读取 `OPENAI_API_KEY`。
- Worker 返回固定结构的诊断报告 JSON。
- 前端如果请求失败，会自动回退到浏览器本地的模拟诊断。

## 环境变量

- `OPENAI_API_KEY`：必填，OpenAI API Key。
- `OPENAI_MODEL`：可选，默认 `gpt-5.1`。

## 前端接入方式

部署 Worker 后，把 `demo.html` 里的：

```js
const aiEndpoint = "/api/generate-advisor-report";
```

改成 Worker 的公开地址，例如：

```js
const aiEndpoint = "https://xhs-advisor.your-subdomain.workers.dev";
```

不要把 API Key 写进前端代码或 GitHub 仓库。
