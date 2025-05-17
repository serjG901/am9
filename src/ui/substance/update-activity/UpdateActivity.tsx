import "./style.css";
import { useEffect, useState } from "react";
import { Activity } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import LoadingDots from "../../atom/loading-dots/LoadingDots";
import FormActivity from "../../molecul/form-activity/FormActivity";

interface UpdateActivityComponent {
  updateActivity?: (oldActivity: Activity, newActivity: Activity) => void;
  activity?: Activity;
  deleteActivity?: (activity: Activity) => void;
}

export default function UpdateActivity({
  updateActivity = () => {},
  activity = { name: "", color: "" },
  deleteActivity = () => {},
}: UpdateActivityComponent) {
  const [name, setName] = useState<string>(activity.name);
  const [color, setColor] = useState<string>(activity.color);

  const [isActionStatus, setIsActionStatus] = useState(1);
  const [isDeleteStatus, setIsDeleteStatus] = useState(1);

  const handleSetActivity = (activity: Activity) => {
    setName(activity.name);
    setColor(activity.color);
  };

  const handleUpdateActivity = () => {
    if (activity.name + activity.color !== name + color) {
      setIsActionStatus(2);
    }
  };

  const handleDeleteActivity = () => {
    const agree = confirm(`Delete all actions that activity?`);
    if (agree) {
      setIsDeleteStatus(2);
    }
  };

  useEffect(() => {
    if (name !== activity.name) setName(activity.name);
  }, [activity.name]);

  useEffect(() => {
    if (color !== activity.color) setColor(activity.color);
  }, [activity.color]);

  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      const oldActivity = { name: activity.name, color: activity.color };
      const newActivity = { name, color };
      updateActivity(oldActivity, newActivity);
      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);

  useEffect(() => {
    if (isDeleteStatus === 2) {
      setIsDeleteStatus(3);
    }
    if (isDeleteStatus === 3) {
      const activityForDelete = { name: activity.name, color: activity.color };
      deleteActivity(activityForDelete);
    }
  }, [isDeleteStatus]);

  return (
    <FlexColumnCenter>
      <FormActivity
        nameFromParent={activity.name}
        colorFromParent={activity.color}
        hoistActivity={handleSetActivity}
      />
      <div>
        {isActionStatus === 2 || isActionStatus === 3 ? (
          <ActionButton>
            <LoadingDots>updating</LoadingDots>
          </ActionButton>
        ) : isActionStatus === 4 ? (
          <ActionButton>
            <div>done</div>
          </ActionButton>
        ) : (
          <ActionButton actionWithPayload={handleUpdateActivity}>
            update
          </ActionButton>
        )}
      </div>
      <div>
        <br />
        {isDeleteStatus === 2 ? (
          <ActionButton alert>
            <LoadingDots>deleting</LoadingDots>
          </ActionButton>
        ) : (
          <ActionButton actionWithPayload={handleDeleteActivity} alert>
            delete
          </ActionButton>
        )}
      </div>
    </FlexColumnCenter>
  );
}
