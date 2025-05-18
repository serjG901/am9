import "./style.css";

interface BlinkerComponent {
  children?: React.ReactNode;
  isBlink?: boolean;
  frequency?: number;
  delay?: number;
}

export default function Blinker({
  children = "",
  isBlink = true,
  frequency = 1,
  delay = 0,
}: BlinkerComponent) {
  return (
    <div
      className={isBlink ? "blinker" : ""}
      style={
        {
          "--frequency": `${Math.round((1000 * 1) / frequency)}ms`,
          "--delay": `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
