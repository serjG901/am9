import "./style.css";
import { Action, Activity } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import getHMS from "../../../helpers/getHMS";
import toNormalDateTime from "../../../helpers/toLocalDateTime";
import Blinker from "../../atom/blinker/Blinker";

interface ActivitiesInActionComponent {
  activitiesInAction?: Action[];
  hoistActivity?: (activity: Activity) => void;
  timestamp?: number;
}

export default function ActivitiesInAction({
  activitiesInAction = [],
  hoistActivity = () => {},
  timestamp = Date.now(),
}: ActivitiesInActionComponent) {
  return !activitiesInAction.length ? null :
    (<div className='activity-in-action'>
      <FlexColumnCenter>
        <Collapse
          collapseLevel='actions'
          title={`in action (${activitiesInAction.length})`}
          openFromParrent={!!activitiesInAction.length}
        >
          <FlexWrap>
            {activitiesInAction.map(({ activity, startTime }) => (
              <Blinker>
                <ActionButton
                  key={activity.name + activity.color}
                  actionWithPayload={hoistActivity}
                  payload={{
                    name: activity.name,
                    color: activity.color,
                  }}
                  bgColor={activity.color}
                >
                  <div>{activity.name}</div>
                  <div className='time'>{toNormalDateTime(startTime)}</div>
                  <div className='time'>{getHMS(timestamp - startTime)}</div>
                </ActionButton>
              </Blinker>
            ))}
          </FlexWrap>
        </Collapse>
      </FlexColumnCenter>
    </div>
  );
}
