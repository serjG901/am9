import "./style.css";
import { ReactNode } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";

interface MenuComponent {
  choisedOption?: string;
  collapseLevel?: string;
  title?: string | ReactNode;
  options?: string[];
  actionWithPayload?: (payload: string) => void;
}

export default function Menu({
  choisedOption = "one",
  collapseLevel = "component",
  title = "menu",
  options = ["one", "two", "three"],
  actionWithPayload = () => {},
}: MenuComponent) {
  return (
    <div className='menu'>
      <Collapse collapseLevel={collapseLevel} title={title}>
        <FlexWrap>
          {options.map((opt) => {
            return (
              <ActionButton
                key={opt}
                actionWithPayload={actionWithPayload}
                payload={opt}
                showBorder={choisedOption === opt}
              >
                {opt}
              </ActionButton>
            );
          })}
        </FlexWrap>
      </Collapse>
    </div>
  );
}
