import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import { colors, steps } from "./assets";

export const pageStyle: React.CSSProperties = {
  background: colors.paper,
  color: colors.ink,
  fontFamily: '"Microsoft YaHei", "PingFang SC", Arial, sans-serif',
  overflow: "hidden"
};

export const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div
    style={{
      border: `2px solid ${colors.line}`,
      borderRadius: 20,
      background: "rgba(255,255,255,0.94)",
      boxShadow: "0 22px 60px rgba(23,32,28,0.08)",
      ...style
    }}
  >
    {children}
  </div>
);

export const Pop: React.FC<React.PropsWithChildren<{ delay?: number; style?: React.CSSProperties }>> = ({
  children,
  delay = 0,
  style
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 130 } });
  return (
    <div
      style={{
        opacity: interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(s, [0, 1], [36, 0])}px) scale(${interpolate(s, [0, 1], [0.97, 1])})`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const Header = ({ label }: { label: string }) => (
  <div style={{ position: "absolute", top: 54, left: 58, right: 58, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div
      style={{
        padding: "10px 22px",
        borderRadius: 999,
        background: "white",
        border: `2px solid rgba(18,102,79,0.24)`,
        color: colors.green,
        fontWeight: 800,
        fontSize: 24
      }}
    >
      小红书本地推 AI 参谋
    </div>
    <div style={{ color: colors.muted, fontSize: 24, fontWeight: 700 }}>{label}</div>
  </div>
);

export const BigTitle = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 178 }}>
    <Pop>
      <div style={{ color: colors.rose, fontWeight: 900, fontSize: 34, marginBottom: 22 }}>{eyebrow}</div>
      <div style={{ fontWeight: 950, fontSize: 70, lineHeight: 1.12, letterSpacing: 0, whiteSpace: "pre-line" }}>{title}</div>
      <div style={{ color: colors.muted, fontSize: 30, lineHeight: 1.45, marginTop: 28 }}>{subtitle}</div>
    </Pop>
  </div>
);

export const CaptionBar = ({ text, progress }: { text: string; progress: number }) => (
  <div style={{ position: "absolute", left: 58, right: 58, bottom: 54 }}>
    <Panel style={{ padding: 24, background: "rgba(255,255,255,0.96)" }}>
      <div style={{ color: colors.ink, fontSize: 30, fontWeight: 900, lineHeight: 1.25 }}>{text}</div>
      <div style={{ marginTop: 18, height: 8, borderRadius: 999, background: colors.greenSoft, overflow: "hidden" }}>
        <div style={{ width: `${Math.max(8, Math.min(100, progress * 100))}%`, height: "100%", background: colors.green, borderRadius: 999 }} />
      </div>
    </Panel>
  </div>
);

export const StepRail = ({ active }: { active: number }) => (
  <div style={{ position: "absolute", left: 58, right: 58, bottom: 170, display: "grid", gap: 18 }}>
    {steps.map((step, index) => (
      <div
        key={step[0]}
        style={{
          display: "grid",
          gridTemplateColumns: "76px 1fr",
          gap: 18,
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: 18,
          background: index === active ? colors.greenSoft : "white",
          border: `2px solid ${index === active ? "rgba(18,102,79,0.34)" : colors.line}`,
          boxShadow: index === active ? "0 16px 36px rgba(18,102,79,0.12)" : "none"
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            background: index === active ? colors.green : colors.paper,
            color: index === active ? "white" : colors.green,
            display: "grid",
            placeItems: "center",
            fontSize: 28,
            fontWeight: 900
          }}
        >
          {step[0]}
        </div>
        <div>
          <div style={{ color: colors.green, fontSize: 28, fontWeight: 900 }}>{step[1]}</div>
          <div style={{ color: colors.muted, fontSize: 22, marginTop: 3 }}>{step[2]}</div>
        </div>
      </div>
    ))}
  </div>
);

export const PhoneFrame = ({
  src,
  zoom = 1,
  x = 0,
  y = 0,
  children,
  style
}: {
  src: string;
  zoom?: number;
  x?: number;
  y?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      width: 730,
      height: 1120,
      borderRadius: 54,
      background: "#111",
      padding: 18,
      boxShadow: "0 32px 70px rgba(23,32,28,0.24)",
      overflow: "hidden",
      ...style
    }}
  >
    <div style={{ position: "absolute", top: 18, left: "50%", width: 150, height: 28, marginLeft: -75, borderRadius: 999, background: "#111", zIndex: 3 }} />
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", background: colors.paper }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          transformOrigin: "50% 0%"
        }}
      />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{children}</div>
    </div>
  </div>
);

export const PhoneHighlight = ({
  x,
  y,
  width,
  height,
  delay = 0,
  tone = "rose"
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  tone?: "rose" | "gold";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 150 } });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = tone === "gold" ? colors.gold : colors.rose;
  const fill = tone === "gold" ? "rgba(255,241,217,0.26)" : "rgba(255,231,237,0.24)";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        borderRadius: 22,
        border: `4px solid ${color}`,
        background: fill,
        boxShadow: `0 0 28px ${tone === "gold" ? "rgba(168,101,20,0.22)" : "rgba(231,71,103,0.24)"}`,
        transform: `scale(${interpolate(entrance, [0, 1], [0.97, 1])})`,
        transformOrigin: "50% 50%"
      }}
    />
  );
};

export const TapPulse = ({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 8, delay + 54, delay + 66], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const pulse = interpolate((frame - delay) % 32, [0, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x - 34, top: y - 34, width: 68, height: 68, opacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          border: `4px solid ${colors.rose}`,
          transform: `scale(${1 + pulse * 0.72})`,
          opacity: 0.72 - pulse * 0.62
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 17,
          top: 17,
          width: 34,
          height: 34,
          borderRadius: 999,
          background: colors.rose,
          boxShadow: "0 10px 24px rgba(231,71,103,0.36)"
        }}
      />
    </div>
  );
};

export const Magnifier = ({ src, label, style }: { src: string; label: string; style?: React.CSSProperties }) => (
  <Panel style={{ position: "absolute", width: 380, padding: 18, background: "white", ...style }}>
    <div style={{ color: colors.green, fontSize: 24, fontWeight: 900, marginBottom: 10 }}>{label}</div>
    <div style={{ height: 250, borderRadius: 16, overflow: "hidden", border: `2px solid ${colors.line}` }}>
      <Img src={staticFile(src)} style={{ width: "120%", height: "120%", objectFit: "cover", objectPosition: "center 42%" }} />
    </div>
  </Panel>
);
