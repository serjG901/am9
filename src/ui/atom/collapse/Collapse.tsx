import "./style.css";
import { ReactNode, useEffect, useState } from "react";
import correctionScrollPosition from "../../../helpers/correctionScrollPosition";

interface CollapseComponent {
  collapseLevel?: string;
  title?: string | ReactNode;
  children?: ReactNode;
  setHueByDefault?: () => void;
  openFromParrent?: boolean;
}

export default function Collapse({
  collapseLevel = "collapse",
  title = "collapse",
  children = "children",
  setHueByDefault = () => {},
  openFromParrent = false,
}: CollapseComponent) {
  const [open, setOpen] = useState(openFromParrent);

  useEffect(() => {
    setOpen(openFromParrent);
  }, [openFromParrent]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (e: any) => {
    setOpen(e.target.open);
    if (e.target.open) {
      correctionScrollPosition(e.target);
    } else {
      setHueByDefault();
    }

    e.stopPropagation();
  };

  return (
    <details
      className='collapse'
      name={collapseLevel}
      open={open}
      onToggle={handleToggle}
    >
      <summary>{title}</summary>
      {open ? <div className='collapse-content'>{children}</div> : null}
    </details>
  );
}
