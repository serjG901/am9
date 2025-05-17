import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Activity } from "../../../interfaces";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FormActivity from "../../molecul/form-activity/FormActivity";

interface FocusActivityComponent {
  focusActivity?: Activity;
  maybeActivities?: Activity[];
  hoistActivity?: (activity: Activity) => void;
}

export default function FocusActivity({
  focusActivity = { name: "", color: "" },
  maybeActivities = [],
  hoistActivity = () => {},
}: FocusActivityComponent) {
  return (
    <div className='focus-activity'>
      <FlexColumnCenter>
        <div className='focus-activity-input'>
          <FlexColumnCenter>
            <FormActivity
              hoistActivity={hoistActivity}
              nameFromParent={focusActivity.name}
              colorFromParent={focusActivity.color}
              activities={maybeActivities}
            />
            {maybeActivities.length ? (
              <Collapse collapseLevel='menu' title='activities'>
                <FlexWrap>
                  {maybeActivities.map((activity) => (
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
            ) : null}
          </FlexColumnCenter>
        </div>
      </FlexColumnCenter>
    </div>
  );
}
