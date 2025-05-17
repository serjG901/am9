import "./style.css";
import { ReactNode } from "react";

interface FlexColumnCenterComponent {
  children?: ReactNode;
}

export default function FlexColumnCenter({
  children = "children",
}: FlexColumnCenterComponent) {
  return <div className='flex-column-center'>{children}</div>;
}
