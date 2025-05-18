import "./style.css";

interface BlinkerComponent {
  children?: React.ReactNode;
  isBlink?: boolean;
  frequency?: number;
  delay?: number;
  deep?: number;
}

export default function Blinker({
  children = "",
  isBlink = true,
  frequency = 1,
  delay = 0,
  deep = 0.5,
}: BlinkerComponent) {
  return (
    <div
      className={isBlink ? "blinker" : ""}
      style={
        {
          "--frequency": `${Math.round((1000 * 1) / frequency)}ms`,
          "--delay": `${delay}ms`,
          "--deep": deep,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
