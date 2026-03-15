import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Tapé Paraguay — Your Path to Paraguay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a5632 0%, #2d7a4a 40%, #1a5632 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            opacity: 0.08,
            background:
              "repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 20px)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            display: "flex",
            background: "linear-gradient(90deg, #d4a017, #f0c040, #d4a017)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
            textAlign: "center",
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              color: "#d4a017",
              textTransform: "uppercase",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            &#x2726; &#x2726; &#x2726;
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "12px",
              display: "flex",
            }}
          >
            Tapé Paraguay
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "2px",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            Your Path to Paraguay
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#d4a017",
              marginBottom: "32px",
              display: "flex",
            }}
          />

          {/* Segments */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            <span style={{ display: "flex" }}>Adventure</span>
            <span style={{ display: "flex", color: "#d4a017" }}>&#x2022;</span>
            <span style={{ display: "flex" }}>Culture</span>
            <span style={{ display: "flex", color: "#d4a017" }}>&#x2022;</span>
            <span style={{ display: "flex" }}>Investment</span>
            <span style={{ display: "flex", color: "#d4a017" }}>&#x2022;</span>
            <span style={{ display: "flex" }}>Leisure</span>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "2px",
          }}
        >
          tapeparaguay.com
        </div>
      </div>
    ),
    { ...size }
  );
}
