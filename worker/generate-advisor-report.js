const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const requiredStringFields = [
  "hint",
  "diagnosis",
  "packageFix",
  "redeemFix",
  "reviewLogic",
  "title",
  "body"
];

const requiredListFields = ["reasons", "actions", "followup", "variants"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

function parseModelJson(content) {
  if (typeof content !== "string" || !content.trim()) return null;
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function isStringList(value, minItems = 1) {
  return Array.isArray(value) && value.length >= minItems && value.every(item => typeof item === "string" && item.trim());
}

function isStringTupleList(value, tupleSize, minItems = 1) {
  return Array.isArray(value) &&
    value.length >= minItems &&
    value.every(row => Array.isArray(row) && row.length === tupleSize && row.every(item => typeof item === "string" && item.trim()));
}

function isValidReport(report) {
  if (!report || typeof report !== "object" || Array.isArray(report)) return false;
  if (!requiredStringFields.every(field => typeof report[field] === "string" && report[field].trim())) return false;
  if (!report.decision || typeof report.decision !== "object") return false;
  if (!["action", "reason", "test"].every(field => typeof report.decision[field] === "string" && report.decision[field].trim())) return false;
  if (!isStringTupleList(report.shots, 2, 4)) return false;
  if (!isStringTupleList(report.rows, 3, 4)) return false;
  if (!requiredListFields.every(field => isStringList(report[field], field === "actions" || field === "variants" ? 3 : 1))) return false;
  return true;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
    if (!env.DEEPSEEK_API_KEY) return json({ error: "missing_deepseek_api_key" }, 500);

    const body = await request.json().catch(() => null);
    const input = body?.input;
    if (!input || typeof input !== "object") return json({ error: "invalid_input" }, 400);

    const fieldGuide = [
      "请只返回一个 JSON object，字段必须完整：",
      "hint, diagnosis, packageFix, redeemFix, reviewLogic, title, body 为字符串。",
      "decision 为对象，包含 action, reason, test 三个字符串。",
      "shots 为至少 4 组 [time, text]。",
      "rows 为至少 4 组 [metric, what, next]。",
      "reasons, actions, followup, variants 为字符串数组，其中 actions 和 variants 至少 3 项。",
      "不要输出 Markdown，不要添加 JSON 以外的解释。"
    ].join("\n");

    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": ["Bearer", env.DEEPSEEK_API_KEY].join(" "),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.DEEPSEEK_MODEL || "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是小红书本地生活小商家的经营参谋。只输出 JSON，不要输出 Markdown，不要承诺爆单，不要编造真实经营数据。"
          },
          {
            role: "user",
            content: [
              "根据以下门店信息生成诊断报告：",
              JSON.stringify(input, null, 2),
              "",
              fieldGuide
            ].join("\n")
          }
        ],
        response_format: { type: "json_object" },
        stream: false
      })
    });

    if (!deepseekResponse.ok) {
      return json({ error: "deepseek_request_failed" }, 502);
    }

    const result = await deepseekResponse.json().catch(() => null);
    const content = result?.choices?.[0]?.message?.content;
    const report = parseModelJson(content);
    if (!isValidReport(report)) {
      return json({ error: "invalid_model_output" }, 502);
    }

    return json({ report });
  }
};
