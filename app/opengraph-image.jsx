import { ImageResponse } from "next/og";
import { businessInfo } from "./lib/services";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const kennyImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#362f24",
        color: "#fffaf0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#d6a85f",
          }}
        >
          KB Folder Services
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 70,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              maxWidth: "650px",
            }}
          >
            Folder Machine Repair & Bindery Equipment Support
          </div>

          <div
            style={{
              fontSize: 25,
              lineHeight: 1.4,
              color: "rgba(255,250,240,0.82)",
              maxWidth: "625px",
            }}
          >
            Troubleshooting, training, preventive maintenance, parts support,
            and practical service for print shops, binderies, and production
            teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#d6a85f",
          }}
        >
          <span>{businessInfo.name}</span>
          <span>{businessInfo.phone}</span>
        </div>
      </div>

      <div
        style={{
          width: "390px",
          height: "100%",
          display: "flex",
          overflow: "hidden",

          padding: "3%",
        }}
      >
        <img
          src={kennyImage}
          alt="Kenny Behling"
          width="390"
          height="630"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            height: "100%",
            width: "100%",
            border: "12px solid  #030201",
          }}
        />
      </div>
    </div>,
    size,
  );
}
