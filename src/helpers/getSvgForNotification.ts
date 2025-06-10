export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r + g * 1.6 + b * 0.4) / 3;
  return brightness > 128 ? "#000000" : "#FFFFFF";
}

export default function getSvgForNotification(colorHex: string, text: string) {
  const svg = `
  <svg 
      xmlns="http://www.w3.org/2000/svg" 
      style="--self-bg: ${colorHex}" 
      width="96" 
      height="96"
  >
        <circle 
            class="ntf-circle" 
            cx="48" 
            cy="48" 
            r="48" 
            fill="${colorHex}"
        />
        <text 
            class="ntf-text" 
            x="50%" 
            y="60%" 
            font-size="64" 
            font-weight="bold" 
            font-family="Outfit, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            fill="${getContrastColor(colorHex)}"
        >
        ${text}
        </text>
    </svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}
