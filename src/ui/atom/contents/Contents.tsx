import "./style.css";
import { ReactNode } from "react";

interface ContentsComponent {
  children?: ReactNode;
  style?: React.CSSProperties;
}

export default function Contents({
  children = "children",
  style,
}: ContentsComponent) {
  return (
    <div className='contents' style={style}>
      {children}
    </div>
  );
}
