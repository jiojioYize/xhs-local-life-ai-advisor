const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: [
    "hint",
    "diagnosis",
    "packageFix",
    "redeemFix",
    "reviewLogic",
    "decision",
    "title",
    "body",
    "shots",
    "rows",
    "reasons",
    "actions",
    "followup",
    "variants"
  ],
  properties: {
    hint: { type: "string" },
    diagnosis: { type: "string" },
    packageFix: { type: "string" },
    redeemFix: { type: "string" },
    reviewLogic: { type: "string" },
    decision: {
      type: "object",
      additionalProperties: false,
      required: ["action", "reason", "test"],
      properties: {
        action: { type: "string" },
        reason: { type: "string" },
        test: { type: "string" }
      }
    },
    title: { type: "string" },
    body: { type: "string" },
    shots: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "array",
        minItems: 2,
        maxItems: 2,
        items: { type: "string" }
      }
    },
    rows: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" }
      }
    },
    reasons: { type: "array", minItems: 3, maxItems: 5, items: { type: "string" } },
    actions: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
    followup: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
    variants: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } }
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

function extractText(response) {
  if (response.output_text) return response.output_text;
  const chunks = [];
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
    }
  }
  return chunks.join("\n");
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
    if (!env.OPENAI_API_KEY) return json({ error: "missing_openai_api_key" }, 500);

    const body = await request.json().catch(() => null);
    const input = body?.input;
    if (!input || typeof input !== "object") return json({ error: "invalid_input" }, 400);

    const prompt = [
      "你是小红书本地生活小商家的经营参谋。",
      "请根据门店信息生成一份可执行诊断报告。",
      "不要承诺爆单，不要编造真实经营数据，不要只写文案。",
      "输出必须是中文，并严格符合 JSON schema。",
      "",
      `门店信息：${JSON.stringify(input, null, 2)}`
    ].join("\n");

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-5.1",
        input: prompt,
        text: {
          format: {
            type: "json_schema",
            name: "advisor_report",
            strict: true,
            schema
          }
        }
      })
    });

    if (!openaiResponse.ok) {
      return json({ error: "openai_request_failed", status: openaiResponse.status }, 502);
    }

    const result = await openaiResponse.json();
    const text = extractText(result);
    const report = JSON.parse(text);
    return json({ report });
  }
};
