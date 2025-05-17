import "./style.css";
import { useState } from "react";
import { Activity } from "../../../interfaces";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FormActivity from "../../molecul/form-activity/FormActivity";
import ButtonWithLoading from "../../molecul/buttonWithLoading/ButtonWithLoading";
import Modal from "../../molecul/modal/Modal";

interface UpdateActivityComponent {
  updateActivity?: ({
    oldActivity,
    newActivity,
  }: Record<"oldActivity" | "newActivity", Activity>) => void;
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

  const handleSetActivity = (activity: Activity) => {
    setName(activity.name);
    setColor(activity.color);
  };

  const hideModal = () => {
    const modalId = document.getElementById("update-modal");
    modalId?.hidePopover();
  };

  return (
    <Modal id='update-modal'>
      <FlexColumnCenter>
        <FormActivity
          nameFromParent={activity.name}
          colorFromParent={activity.color}
          hoistActivity={handleSetActivity}
        />
        <div>
          <ButtonWithLoading
            action={updateActivity}
            finishAction={hideModal}
            payload={{ oldActivity: activity, newActivity: { name, color } }}
          >
            update
          </ButtonWithLoading>
        </div>
        <div>
          <br />
          <ButtonWithLoading
            action={deleteActivity}
            finishAction={hideModal}
            payload={activity}
            alert
            needConfirm
          >
            delete
          </ButtonWithLoading>
        </div>
      </FlexColumnCenter>
    </Modal>
  );
}
