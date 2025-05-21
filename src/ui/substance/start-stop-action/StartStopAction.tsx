import "./style.css";
import { Activity } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import HighlightText from "../../atom/highlight-text/HighlightText";
import Blinker from "../../atom/blinker/Blinker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

interface StartStopActionComponent {
  activity?: Activity;
  startAction?: (activity: Activity) => void;
  stopAction?: (activity: Activity) => void;
  isActivityInAction?: boolean;
}

export default function StartStopAction({
  activity = { name: "", color: "" },
  startAction = () => {},
  stopAction = () => {},
  isActivityInAction = false,
}: StartStopActionComponent) {
  const toogleActivity = (activity: Activity) => {
    if (activity.name) {
      if (isActivityInAction) stopAction(activity);
      else startAction(activity);
    }
  };

  return (
    <div className='start-stop-action'>
      <ActionButton
        disabled={!activity.name}
        actionWithPayload={toogleActivity}
        payload={activity}
      >
        <FlexColumnCenter>
          {isActivityInAction ? (
            <div className='action'>End</div>
          ) : (
           <div className='action'>Start</div>
          )}
          {activity.name && (
            <Blinker isBlink={isActivityInAction} deep={0.2}>
              <HighlightText bgColor={activity.color} simple padding>
                {activity.name}
              </HighlightText>
            </Blinker>
          )}
        </FlexColumnCenter>
      </ActionButton>
    </div>
  );
}
