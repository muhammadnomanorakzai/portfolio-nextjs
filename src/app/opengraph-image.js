import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Muhammad Noman - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #3B82F6, #A855F7, #EC4899)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: 20,
        }}>
        Muhammad Noman
      </div>
      <div
        style={{
          fontSize: 30,
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
        }}>
        Full Stack Developer & UI/UX Expert
      </div>
    </div>,
    {
      ...size,
    },
  );
}
