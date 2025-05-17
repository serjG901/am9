import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import { Activity } from "../../../interfaces";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";

interface ActivitiesInActionComponent {
  activitiesInAction?: Activity[];
  hoistActivity?: (activity: Activity) => void;
}

export default function ActivitiesInAction({
  activitiesInAction = [],
  hoistActivity = () => {},
}: ActivitiesInActionComponent) {
  return (
    <Collapse
      collapseLevel='menu'
      title={`in action (${activitiesInAction.length})`}
    >
      <FlexWrap>
        {activitiesInAction.map((activity) => (
          <ActionButton
            key={activity.name + activity.color}
            actionWithPayload={hoistActivity}
            payload={{
              name: activity.name,
              color: activity.color,
            }}
            bgColor={activity.color}
          >
            {activity.name}
          </ActionButton>
        ))}
      </FlexWrap>
    </Collapse>
  );
}
