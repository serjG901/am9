import "./style.css";
import { ReactNode } from "react";

interface GridComponent {
  children?: ReactNode;
  columns?: number;
}

export default function Grid({
  children = "children",
  columns = 3,
}: GridComponent) {
  return (
    <div
      className='grid'
      style={{ "--self-columns": columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
