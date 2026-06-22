export const colors = {
  ink: "#17201c",
  muted: "#66736d",
  paper: "#fbfaf7",
  line: "#d9e3dd",
  green: "#12664f",
  greenSoft: "#e3f4eb",
  rose: "#e74767",
  roseSoft: "#ffe7ed",
  gold: "#a86514",
  goldSoft: "#fff1d9",
  blue: "#2c5a8a",
  blueSoft: "#e6f1fb"
};

export const steps = [
  ["1", "门店信息", "输入门店、套餐、困惑和数据"],
  ["2", "诊断报告", "查看诊断卡片和决策依据"],
  ["3", "执行方案", "内容样片 + 今日行动"],
  ["4", "复盘记录", "三天后看核销、加购、复购"]
];

export const timeline = [
  { start: 0, duration: 120, label: "痛点开场" },
  { start: 120, duration: 150, label: "四步流程" },
  { start: 270, duration: 210, label: "Step 1 / 门店信息" },
  { start: 480, duration: 240, label: "Step 2 / 诊断报告" },
  { start: 720, duration: 240, label: "Step 3 / 执行方案" },
  { start: 960, duration: 240, label: "Step 4 / 复盘记录" }
];

export const uiShots = {
  step1: "ui/step1.png",
  step2: "ui/step2.png",
  step3: "ui/step3.png",
  step4: "ui/step4.png"
};

export const diagnosisCards = [
  ["套餐诊断", "曝光高但核销低，不急着加预算。"],
  ["套餐改造", "把低价套餐改成有场景的到店理由。"],
  ["核销提升", "评论区引导 + 到店话术一起设计。"],
  ["下一次测试", "试 3 天，只看核销、加购、券领取。"]
];

export const actionItems = ["改套餐标题", "评论区固定领取关键词", "店员按新话术承接 3 天"];

export const reviewRows = [
  ["核销", "是否真的到店"],
  ["加购", "是否多花一点"],
  ["复购券", "有没有下次理由"],
  ["报告对比", "这一轮比上一轮改了什么"]
];

export const narration = [
  "商家看到核销低，最怕的是不知道该改内容、改套餐，还是先停投。",
  "这个 Demo 把原本挤在一起的功能，拆成一条可演示的四步流程。",
  "先填门店信息和近 7 天数据，再生成诊断。",
  "报告先给结论，再给依据和下一步决策。",
  "执行方案直接落到内容样片、镜头脚本和三件事。",
  "三天后再用复盘表、历史记录和报告对比决定下一轮。"
];
