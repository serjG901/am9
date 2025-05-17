import "./style.css";
import { useShallow } from "zustand/shallow";
import { Activity } from "../../../interfaces";
import useActionsStore from "../../../store/actionsStore";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Contents from "../../atom/contents/Contents";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import Modal from "../../molecul/modal/Modal";
import UpdateActivity from "../../substance/update-activity/UpdateActivity";

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

  return (
    <FlexColumnCenter>
      <Collapse title='activities' collapseLevel='settings'>
        <FlexWrap>
          {getActivities(actions).map((activity: Activity) => {
            const handleShowModal = () => {
              const modalId = document.getElementById(
                `update-activity-${activity.name + activity.color}`
              );
              modalId?.showPopover();
            };
            const handleHideModal = () => {
              const modalId = document.getElementById(
                `update-activity-${activity.name + activity.color}`
              );
              modalId?.hidePopover();
            };

            return (
              <Contents key={activity.name + activity.color}>
                <ActionButton
                  actionWithPayload={handleShowModal}
                  bgColor={activity.color}
                >
                  {activity.name}
                </ActionButton>
                <Modal
                  id={`update-activity-${activity.name + activity.color}`}
                  hideModal={handleHideModal}
                >
                  <UpdateActivity
                    activity={activity}
                    updateActivity={updateActivity}
                    deleteActivity={deleteActivity}
                  />
                </Modal>
              </Contents>
            );
          })}
        </FlexWrap>
      </Collapse>
    </FlexColumnCenter>
  );
}
