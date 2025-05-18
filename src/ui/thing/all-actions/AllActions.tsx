import "./style.css";
import { Action, Activity } from "../../../interfaces";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
import toLocalDateTime from "../../../helpers/toLocalDateTime";
import getHMS from "../../../helpers/getHMS";
import Collapse from "../../atom/collapse/Collapse";

interface AllActionsComponent {
  actions: Action[];
  focusActivity: Activity | null;
  timestamp?: number;
  startPeriod?: number | null;
  endPeriod?: number | null;
}

export default function AllActions({
  actions = [],
  focusActivity = null,
  timestamp = Date.now(),
  startPeriod = null,
  endPeriod = null,
}: AllActionsComponent) {
  const actionsByPeriod =
    startPeriod === null || endPeriod === null
      ? actions
      : actions.filter(
          (action) =>
            action.startTime > startPeriod! && action.startTime < endPeriod!
        );

  const sortedActions = actionsByPeriod.toSorted(
    (aAction, bAction) => bAction.startTime - aAction.startTime
  );
  const filtredActions = !focusActivity
    ? sortedActions
    : sortedActions.filter(
        (action) =>
          action.activity.name === focusActivity.name &&
          action.activity.color === focusActivity.color
      );
  return (
    <Contents>
      {startPeriod === null || endPeriod === null ? null : (
        <div>
          {" "}
          {toLocalDateTime(startPeriod)} - {toLocalDateTime(endPeriod)}
        </div>
      )}
      <Collapse
        title={
          <div>
            actions
            {!focusActivity ? null : (
              <Contents>
                {" "}
                by{" "}
                <HighlightText bgColor={focusActivity.color} simple padding>
                  {focusActivity.name}
                </HighlightText>
              </Contents>
            )}
          </div>
        }
        collapseLevel='menu'
      >
        <div className='all-actions'>
          <Grid columns={4}>
            <div>activity</div>
            <div>start</div>
            <div>stop</div>
            <div>spend</div>
            <div className='divider'></div>
            {filtredActions.map(({ activity, startTime, endTime }, i) => {
              return (
                <Contents key={activity.name + activity.color + i}>
                  <div>
                    <HighlightText bgColor={activity.color} simple padding>
                      {activity.name}
                    </HighlightText>
                  </div>
                  <div>{toLocalDateTime(startTime)}</div>
                  <div>{endTime ? toLocalDateTime(endTime) : "in action"}</div>
                  <div>
                    {getHMS(
                      endTime ? endTime - startTime : timestamp - startTime
                    )}
                  </div>
                  <div className='divider'></div>
                </Contents>
              );
            })}
          </Grid>
        </div>
      </Collapse>
    </Contents>
  );
}
