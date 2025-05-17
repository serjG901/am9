import "./style.css";
import { useShallow } from "zustand/shallow";
import { useSettingsStore } from "../../store/settingsStore";
import Page from "../../ui/atom/page/Page";
import InputRange from "../../ui/atom/input-range/InputRange";
import ManageData from "../../ui/thing/manage-data/ManageData";
import HighlightText from "../../ui/atom/highlight-text/HighlightText";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
import ManageActivities from "../../ui/thing/manage-activities/ManageActivities";
import hslToRgb from "../../helpers/hslToRgb";
import useActionsStore from "../../store/actionsStore";
import Contents from "../../ui/atom/contents/Contents";

export default function Settings() {
  const [hue, setHue] = useSettingsStore(
    useShallow((state) => [state.hue, state.setHue])
  );

  const [actions] = useActionsStore(useShallow((state) => [state.actions]));

  return (
    <Page>
      <div className='settings-view'>
        <FlexColumnCenter>
          <h1>Settings</h1>
          <hr />
          <div>
            <h2>Colors</h2>
            <div>
              main color:{" "}
              <HighlightText bgColor={hslToRgb(+hue, 100, 20)} padding>
                {hslToRgb(+hue, 100, 20)}
              </HighlightText>
            </div>
            <InputRange
              id='change-hue'
              name='change main color'
              min={0}
              max={360}
              valueFromParent={hue}
              hoistValue={setHue}
            />
          </div>
          {actions.length ? (
            <Contents>
              <hr />
              <div>
                <h2>Manage activities</h2>
                <ManageActivities />
              </div>
              <hr />
              <div>
                <h2>Manage data</h2>
                <ManageData />
              </div>
            </Contents>
          ) : null}
        </FlexColumnCenter>
      </div>
    </Page>
  );
}
