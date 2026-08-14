import { ImageResponse } from "next/og";

// Imagen de previsualización (link preview) para redes/DM/WhatsApp/email.
export const alt = "Northvale — Premium Property Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "76px 84px",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#3a3a38" strokeWidth="3" />
            <path
              d="M26 72 L50 34 L74 72"
              fill="none"
              stroke="#f4f3f0"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M37 72 L50 52 L63 72"
              fill="none"
              stroke="#f4f3f0"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
            <circle cx="50" cy="34" r="5.5" fill="#e03131" />
          </svg>
          <div style={{ display: "flex", fontSize: 42, color: "#f4f3f0", letterSpacing: -1 }}>
            Northvale
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column", letterSpacing: -2 }}>
          <div style={{ display: "flex", fontSize: 90, color: "#f4f3f0", lineHeight: 1.05 }}>
            Property that
          </div>
          <div style={{ display: "flex", fontSize: 90, color: "#e03131", lineHeight: 1.05 }}>
            sells itself.
          </div>
        </div>

        {/* Pie */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "#9a9a96", letterSpacing: 3 }}>
          <div style={{ display: "flex", width: 46, height: 2, background: "#e03131" }} />
          <div style={{ display: "flex" }}>PREMIUM PROPERTY MARKETING</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
