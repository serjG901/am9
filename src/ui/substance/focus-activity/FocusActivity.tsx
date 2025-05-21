import "./style.css";
import { Action, Activity } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FormActivity from "../../molecul/form-activity/FormActivity";
import Blinker from "../../atom/blinker/Blinker";
import getHMS from "../../../helpers/getHMS";
import toNormalDateTime from "../../../helpers/toLocalDateTime";
import Contents from "../../atom/contents/Contents";

interface FocusActivityComponent {
  timestamp?: number;
  activitiesInAction?: Action[];
  focusActivity?: Activity;
  maybeActivities?: Activity[];
  hoistActivity?: (activity: Activity) => void;
}

export default function FocusActivity({
  timestamp = Date.now(),
  activitiesInAction = [],
  focusActivity = { name: "", color: "" },
  maybeActivities = [],
  hoistActivity = () => {},
}: FocusActivityComponent) {
  const pendingActivities = maybeActivities.filter(
    (activity) =>
      !activitiesInAction.find(
        (action) =>
          action.activity.name === activity.name &&
          action.activity.color === activity.color
      )
  );
  return (
    <div className='focus-activity'>
      <FlexColumnCenter>
        {maybeActivities.length ? (
          <Collapse
            openFromParrent={!!activitiesInAction.length}
            collapseLevel='activities'
            title={
              activitiesInAction.length
                ? `activities (${activitiesInAction.length} in action)`
                : "activities"
            }
          >
            <br />
            {!activitiesInAction.length ? null : (
              <Contents>
                <div className='activity-in-action'>
                  <FlexColumnCenter>
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
                            <div className='time'>
                              {toNormalDateTime(startTime)}
                            </div>
                            <div className='time'>
                              {getHMS(timestamp - startTime) || "00s"}
                            </div>
                          </ActionButton>
                        </Blinker>
                      ))}
                    </FlexWrap>
                  </FlexColumnCenter>
                </div>
                {pendingActivities.length ? <hr /> : null}
              </Contents>
            )}

            <FlexWrap>
              {pendingActivities.map((activity) => (
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
            <br />
          </Collapse>
        ) : null}
        <FormActivity
          hoistActivity={hoistActivity}
          nameFromParent={focusActivity.name}
          colorFromParent={focusActivity.color}
          activities={maybeActivities}
        />
      </FlexColumnCenter>
    </div>
  );
}
