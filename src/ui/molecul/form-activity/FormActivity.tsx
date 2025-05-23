import "./style.css";
import { useEffect, useState } from "react";
import { Activity } from "../../../interfaces";
import Colorpicker from "../../atom/colorpicker/Colorpicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";

interface FormActivityComponent {
  hoistActivity?: (newActivity: Activity, oldActivity?: Activity) => void;
  nameFromParent?: string;
  colorFromParent?: string;
  actionType?: "add" | "update";
  deleteActivity?: (activity: Activity) => void;
  activities?: Activity[];
}

export default function FormActivity({
  hoistActivity = () => {},
  nameFromParent = "",
  colorFromParent = "#000000",
  activities = [],
}: FormActivityComponent) {
  const [name, setName] = useState<string>(nameFromParent);
  const [color, setColor] = useState<string>(colorFromParent);

  useEffect(() => {
    hoistActivity({ name, color });
  }, [name, color]);

  useEffect(() => {
    setName(nameFromParent);
    setColor(colorFromParent);
  }, [nameFromParent, colorFromParent]);

  return (
    <FlexColumnCenter>
      <div>
        <InputWithOptions
          id={`add-activity-name-${nameFromParent + colorFromParent}`}
          name='name'
          valueFromParent={name}
          hoistValue={setName}
          options={[...new Set(activities.map((a) => a.name))]}
        />
      </div>
      <div>
        <Colorpicker
          id={`add-tag-color-${nameFromParent + colorFromParent}`}
          name='color'
          valueFromParent={color}
          hoistValue={setColor}
        />
      </div>
    </FlexColumnCenter>
  );
}
