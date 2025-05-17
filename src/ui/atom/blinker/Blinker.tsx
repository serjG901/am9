import "./style.css";

interface BlinkerComponent {
  children?: React.ReactNode;
  isBlink?: boolean;
  frequency?: number;
}

export default function Blinker({
  children = "",
  isBlink = true,
  frequency = 1,
}: BlinkerComponent) {
  return (
    <div
      className={isBlink ? "blinker" : ""}
      style={
        {
          "--frequency": `${Math.round((1000 * 1) / frequency)}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
