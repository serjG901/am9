import "./style.css";
import { Action, Activity } from "../../../interfaces";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
import Collapse from "../../atom/collapse/Collapse";
import getPeriodByTime from "../../../helpers/getPeriodByTime";
import getHMS from "../../../helpers/getHMS";

interface ActionsByDaysComponent {
  actions: Action[];
  focusActivity: Activity | null;
  timestamp?: number;
  startPeriod?: number | null;
  endPeriod?: number | null;
  periodType?: "days" | "weeks" | "months" | "years";
}

export default function ActionsByDays({
  actions = [],
  focusActivity = null,
  timestamp = Date.now(),
  startPeriod = null,
  endPeriod = null,
  periodType = "days",
}: ActionsByDaysComponent) {
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

  const actionsByDays = Object.groupBy(filtredActions, ({ startTime }) =>
    getPeriodByTime(startTime, periodType)
  );

  return (
    <Contents>
      <Collapse
        title={
          <div>
            {periodType}
            {!focusActivity ? null : (
              <Contents>
                {" "}
                for{" "}
                <HighlightText bgColor={focusActivity.color} simple padding>
                  {focusActivity.name}
                </HighlightText>
              </Contents>
            )}
          </div>
        }
        collapseLevel='menu'
      >
        <div className='actions-by-period'>
          <Grid columns={2}>
            <div>activity</div>
            <div>spend</div>

            {Object.entries(actionsByDays).map(([day, actionsByDay]) => {
              return !actionsByDay ? null : (
                <Contents key={day}>
                  <div className='day'>{day}</div>
                  {Object.entries(
                    Object.groupBy(
                      actionsByDay,
                      ({ activity }) =>
                        `${activity.name}{separator}${activity.color}`
                    )
                  ).map(([activityString, actions]) => {
                    return (
                      <Contents key={activityString}>
                        <div>
                          <HighlightText
                            bgColor={activityString.split("{separator}")[1]}
                            simple
                            padding
                          >
                            {activityString.split("{separator}")[0]}
                          </HighlightText>
                        </div>
                        <div>
                          {getHMS(
                            actions!.reduce(
                              (acc, a) =>
                                acc +
                                (a.endTime
                                  ? a.endTime - a.startTime
                                  : timestamp - a.startTime),
                              0
                            )
                          )}
                        </div>
                        <div className='divider'></div>
                      </Contents>
                    );
                  })}
                </Contents>
              );
            })}
          </Grid>
        </div>
      </Collapse>
    </Contents>
  );
}
