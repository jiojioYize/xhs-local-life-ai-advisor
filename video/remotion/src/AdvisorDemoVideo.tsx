import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import {
  BigTitle,
  CaptionBar,
  Header,
  Magnifier,
  Panel,
  PhoneHighlight,
  PhoneFrame,
  Pop,
  StepRail,
  TapPulse,
  pageStyle
} from "./components";
import { actionItems, colors, diagnosisCards, narration, reviewRows, timeline, uiShots } from "./assets";

const sceneProgress = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emphasis = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 120 } });
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="路演展示版" />
      <BigTitle
        eyebrow="本地生活商家最怕的不是没流量"
        title={"核销低\n到底卡在哪里？"}
        subtitle="内容、套餐、到店承接，任何一环没接住，投放都会变成短期热闹。"
      />
      <Pop delay={34} style={{ position: "absolute", left: 70, right: 70, top: 690 }}>
        <Panel style={{ padding: 34, background: colors.greenSoft }}>
          <div style={{ color: colors.green, fontSize: 32, fontWeight: 950, marginBottom: 16 }}>店主真正要的答案</div>
          <div style={{ fontSize: 44, lineHeight: 1.28, fontWeight: 950, transform: `scale(${interpolate(emphasis, [0, 1], [0.98, 1])})` }}>
            不是再来一篇文案，而是一套能试跑、能复盘的经营动作。
          </div>
        </Panel>
      </Pop>
      <CaptionBar text={narration[0]} progress={sceneProgress(frame, 0, 120)} />
    </AbsoluteFill>
  );
};

const FlowOverviewScene = () => {
  const frame = useCurrentFrame();
  const active = Math.min(3, Math.floor(frame / 38));
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="从长页面变成引导流程" />
      <BigTitle
        eyebrow="四步式 Demo"
        title={"先填信息\n再看诊断\n最后复盘"}
        subtitle="把原本挤在一个长页面里的能力，拆成店主自然能跟着走的流程。"
      />
      <StepRail active={active} />
      <CaptionBar text={narration[1]} progress={sceneProgress(frame, 0, 150)} />
    </AbsoluteFill>
  );
};

const StepOneScene = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 210], [1, 1.04], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 210], [0, -2200], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="Step 1 / 门店信息" />
      <PhoneFrame src={uiShots.step1} zoom={zoom} y={y} style={{ left: 175, top: 260 }}>
        <PhoneHighlight x={52} y={1004} width={588} height={70} delay={128} />
        <TapPulse x={594} y={1039} delay={146} />
      </PhoneFrame>
      <Pop delay={12} style={{ position: "absolute", left: 58, right: 58, top: 150 }}>
        <div style={{ color: colors.rose, fontSize: 32, fontWeight: 950 }}>真实 UI 流程</div>
        <div style={{ marginTop: 10, fontSize: 54, fontWeight: 950 }}>先填门店信息，再生成诊断</div>
      </Pop>
      <Magnifier src={uiShots.step1} label="生成模式保留：模拟诊断 / AI 诊断" style={{ right: 54, top: 720 }} />
      <CaptionBar text={narration[2]} progress={sceneProgress(frame, 0, 210)} />
    </AbsoluteFill>
  );
};

const StepTwoScene = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1, 1.05], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 240], [-760, -1010], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="Step 2 / 诊断报告" />
      <PhoneFrame src={uiShots.step2} zoom={zoom} y={y} style={{ left: 72, top: 330 }}>
        <PhoneHighlight x={42} y={408} width={594} height={278} delay={16} />
        <TapPulse x={548} y={210} delay={98} />
      </PhoneFrame>
      <div style={{ position: "absolute", right: 52, top: 310, width: 430, display: "grid", gap: 16 }}>
        {diagnosisCards.map((card, index) => (
          <Pop key={card[0]} delay={28 + index * 8}>
            <Panel style={{ padding: 22, background: index === 3 ? colors.goldSoft : "white" }}>
              <div style={{ color: index === 3 ? colors.gold : colors.green, fontSize: 25, fontWeight: 950 }}>{card[0]}</div>
              <div style={{ color: colors.muted, fontSize: 21, lineHeight: 1.35, marginTop: 8 }}>{card[1]}</div>
            </Panel>
          </Pop>
        ))}
      </div>
      <CaptionBar text={narration[3]} progress={sceneProgress(frame, 0, 240)} />
    </AbsoluteFill>
  );
};

const StepThreeScene = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1, 1.05], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 240], [-700, -960], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="Step 3 / 执行方案" />
      <PhoneFrame src={uiShots.step3} zoom={zoom} y={y} style={{ right: 80, top: 300 }}>
        <PhoneHighlight x={138} y={400} width={514} height={154} delay={18} />
        <TapPulse x={545} y={246} delay={104} />
      </PhoneFrame>
      <Pop delay={10} style={{ position: "absolute", left: 58, top: 250, width: 420 }}>
        <Panel style={{ padding: 28, background: colors.roseSoft }}>
          <div style={{ color: colors.rose, fontSize: 26, fontWeight: 950, marginBottom: 12 }}>内容样片</div>
          <div style={{ fontSize: 38, lineHeight: 1.24, fontWeight: 950 }}>不是空泛建议，是今天就能拍。</div>
        </Panel>
      </Pop>
      <div style={{ position: "absolute", left: 58, top: 580, width: 420, display: "grid", gap: 16 }}>
        {actionItems.map((item, index) => (
          <Pop key={item} delay={46 + index * 10}>
            <Panel style={{ display: "grid", gridTemplateColumns: "54px 1fr", alignItems: "center", gap: 16, padding: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: colors.green, color: "white", display: "grid", placeItems: "center", fontSize: 24, fontWeight: 950 }}>{index + 1}</div>
              <div style={{ fontSize: 24, fontWeight: 850 }}>{item}</div>
            </Panel>
          </Pop>
        ))}
      </div>
      <CaptionBar text={narration[4]} progress={sceneProgress(frame, 0, 240)} />
    </AbsoluteFill>
  );
};

const StepFourScene = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1, 1.05], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 240], [-660, -940], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={pageStyle}>
      <Header label="Step 4 / 复盘记录" />
      <PhoneFrame src={uiShots.step4} zoom={zoom} y={y} style={{ left: 80, top: 300 }}>
        <PhoneHighlight x={34} y={160} width={606} height={660} delay={20} tone="gold" />
      </PhoneFrame>
      <div style={{ position: "absolute", right: 58, top: 315, width: 380, display: "grid", gap: 14 }}>
        {reviewRows.map((row, index) => (
          <Pop key={row[0]} delay={34 + index * 9}>
            <Panel style={{ padding: 20, background: index === 0 ? colors.goldSoft : "white" }}>
              <div style={{ color: index === 0 ? colors.gold : colors.green, fontSize: 25, fontWeight: 950 }}>{row[0]}</div>
              <div style={{ color: colors.muted, fontSize: 20, lineHeight: 1.35, marginTop: 6 }}>{row[1]}</div>
            </Panel>
          </Pop>
        ))}
      </div>
      <CaptionBar text={narration[5]} progress={sceneProgress(frame, 0, 240)} />
    </AbsoluteFill>
  );
};

export const AdvisorDemoVideo = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={timeline[0].duration}>
      <HookScene />
    </Sequence>
    <Sequence from={timeline[1].start} durationInFrames={timeline[1].duration}>
      <FlowOverviewScene />
    </Sequence>
    <Sequence from={timeline[2].start} durationInFrames={timeline[2].duration}>
      <StepOneScene />
    </Sequence>
    <Sequence from={timeline[3].start} durationInFrames={timeline[3].duration}>
      <StepTwoScene />
    </Sequence>
    <Sequence from={timeline[4].start} durationInFrames={timeline[4].duration}>
      <StepThreeScene />
    </Sequence>
    <Sequence from={timeline[5].start} durationInFrames={timeline[5].duration}>
      <StepFourScene />
    </Sequence>
  </AbsoluteFill>
);
