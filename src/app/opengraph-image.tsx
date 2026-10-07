import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#040508",
          color: "#edf0ee",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#8a9099" }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
            {siteConfig.hero.lines[0]}
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
            {siteConfig.hero.lines[1]}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(237,240,238,0.15)",
            paddingTop: 28,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700, letterSpacing: 3 }}>
            {siteConfig.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", color: "#c6f24e" }}>{siteConfig.role}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
