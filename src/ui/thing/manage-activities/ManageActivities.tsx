import "./style.css";
import { useShallow } from "zustand/shallow";
import { Activity } from "../../../interfaces";
import useActionsStore from "../../../store/actionsStore";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Contents from "../../atom/contents/Contents";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import UpdateActivity from "../../substance/update-activity/UpdateActivity";
import { useState } from "react";

export default function ManageActivities() {
  const [actions, getActivities, updateActivity, deleteActivity] =
    useActionsStore(
      useShallow((state) => [
        state.actions,
        state.getActivities,
        state.updateActivity,
        state.deleteActivity,
      ])
    );
  const [activityToUpdate, setActivityToUpdate] = useState({
    name: "",
    color: "",
  });

  const handleShowModal = (activity: Activity) => {
    setActivityToUpdate(activity);
    const modalId = document.getElementById("update-modal");
    modalId?.showPopover();
  };

  return (
    <FlexColumnCenter>
      <Collapse title='activities' collapseLevel='settings'>
        <FlexWrap>
          {getActivities(actions).map((activity: Activity) => {
            return (
              <Contents key={activity.name + activity.color}>
                <ActionButton
                  actionWithPayload={handleShowModal}
                  payload={activity}
                  bgColor={activity.color}
                >
                  {activity.name}
                </ActionButton>
              </Contents>
            );
          })}
        </FlexWrap>
      </Collapse>

      <UpdateActivity
        activity={activityToUpdate}
        updateActivity={updateActivity}
        deleteActivity={deleteActivity}
      />
    </FlexColumnCenter>
  );
}
