import "./style.css";
import { Activity } from "../../../interfaces";
import useActionsStore from "../../../store/actionsStore";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Contents from "../../atom/contents/Contents";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import Modal from "../../molecul/modal/Modal";
import UpdateActivity from "../../substance/update-activity/UpdateActivity";
import { useShallow } from "zustand/shallow";

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

  const handleShowModal = ({ name, color }: Activity) => {
    const modalId = document.getElementById(`update-activity-${name + color}`);
    modalId?.showPopover();
  };

  return (
    <FlexColumnCenter>
      <Collapse title='Activities' collapseLevel='settings'>
        <FlexWrap>
          {getActivities(actions).map((activity: Activity) => (
            <Contents key={activity.name + activity.color}>
              <ActionButton
                actionWithPayload={handleShowModal}
                payload={{
                  name: activity.name,
                  color: activity.color,
                }}
                bgColor={activity.color}
              >
                {activity.name}
              </ActionButton>
              <Modal id={`update-activity-${activity.name + activity.color}`}>
                <UpdateActivity
                  activity={activity}
                  updateActivity={updateActivity}
                  deleteActivity={deleteActivity}
                />
              </Modal>
            </Contents>
          ))}
        </FlexWrap>
      </Collapse>
    </FlexColumnCenter>
  );
}
