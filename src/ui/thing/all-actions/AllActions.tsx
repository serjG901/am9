import "./style.css";
import { Action, Activity } from "../../../interfaces";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
import toLocalDateTime from "../../../helpers/toLocalDateTime";
import getHMS from "../../../helpers/getHMS";
import Collapse from "../../atom/collapse/Collapse";
import Paginate from "../../substance/paginate/Paginate";
import { useState } from "react";
import Blinker from "../../atom/blinker/Blinker";

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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerOnePage = 10;

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

  const actionsByPage = filtredActions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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
            actions{" "}
            {!focusActivity ? null : (
              <Contents>
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
          <Grid columns={3}>
            <div className='header'>activity</div>
            <div className='header'>stop/start</div>
            <div className='header'>spend</div>
            <div className='divider'></div>
            {actionsByPage.map(({ activity, startTime, endTime }, i) => {
              return (
                <Contents key={activity.name + activity.color + i}>
                  <div>
                    <Blinker isBlink={!endTime} delay={i * 333}>
                      <HighlightText bgColor={activity.color} simple padding>
                        {activity.name}
                      </HighlightText>
                    </Blinker>
                  </div>
                  <div>
                    <div>
                      {endTime ? toLocalDateTime(endTime) : "in action"}
                    </div>
                    <div>{toLocalDateTime(startTime)}</div>
                  </div>
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
        <Paginate
          pageActive={page}
          pages={Math.ceil(filtredActions.length / itemsPerPage)}
          setPageActive={setPage}
          addItemsPerPage={() =>
            setItemsPerPage((state) =>
              state < filtredActions.length ? state + itemsPerOnePage : state
            )
          }
        />
      </Collapse>
    </Contents>
  );
}
