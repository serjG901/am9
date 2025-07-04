import "./style.css";
import { useShallow } from "zustand/shallow";
import { StoreApi, UseBoundStore } from "zustand";
import { usePeriodStore } from "../../store/periodStore";
import {
  ActionsStore,
  StorePersist,
  TimerStore,
  Write,
} from "../../interfaces";
//import Paginate from "../../ui/substance/paginate/Paginate";
//import ToTop from "../../ui/molecul/to-top/ToTop";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
//import StatisticByPeriod from "../../ui/substance/statistic-by-period/StatisticByPeriod";
import FocusActivity from "../../ui/substance/focus-activity/FocusActivity";
import Checked from "../../ui/atom/checked/Checked";
import StartStopAction from "../../ui/substance/start-stop-action/StartStopAction";
//import ActivitiesInAction from "../../ui/substance/activities-in-action/ActivitiesInAction";
import Page from "../../ui/atom/page/Page";
import FormDataRange from "../../ui/molecul/form-date-range/FormDateRange";
import useTimerStore from "../../store/timerStore";
import { useEffect } from "react";
import AllActions from "../../ui/thing/all-actions/AllActions";
import Contents from "../../ui/atom/contents/Contents";
import ActionsByPeriod from "../../ui/thing/actions-by-period/ActionsByPeriod";
import setBadges from "../../helpers/setBadges";
import setNotifications from "../../helpers/setNotifications";

interface ActionsComponent {
  useActionsStore: UseBoundStore<
    Write<StoreApi<ActionsStore>, StorePersist<ActionsStore, ActionsStore>>
  >;
}

export default function Actions({ useActionsStore }: ActionsComponent) {
  const [
    actions,
    // getActions,
    // getEndedActions,
    getActivities,
    getActivitiesInAction,
    focusActivity,
    setFocusActivity,
    isFiltredByFocus,
    toggleFilterByFocus,
    startAction,
    stopAction,
    getIsActivityInAction,
    /* getActionsByDays,
    getActionsByWeek,
    getActionsByMonth,
    getActionsByYear,*/
    //getActionsByActivity,
  ] = useActionsStore(
    useShallow((state: ActionsStore) => [
      state.actions,
      //state.getActions,
      //state.getEndedActions,
      state.getActivities,
      state.getActivitiesInAction,
      state.focusActivity,
      state.setFocusActivity,
      state.isFiltredByFocus,
      state.toggleFilterByFocus,
      state.startAction,
      state.stopAction,
      state.getIsActivityInAction,
      /* state.getActionsByDays,
    state.getActionsByWeek,
    state.getActionsByMonth,
    state.getActionsByYear,*/
      //state.getActionsByActivity,
    ])
  );
  const [currentTimestamp, updateTimestamp] = useTimerStore(
    useShallow((state: TimerStore) => [
      state.currentTimestamp,
      state.updateTimestamp,
    ])
  );

  const [startPeriod, endPeriod, setPeriod] = usePeriodStore(
    useShallow((state) => [state.start, state.end, state.setPeriod])
  );

  useEffect(() => {
    updateTimestamp();
  }, []);

  useEffect(() => {
    setBadges(actions);
  }, [actions]);

  useEffect(() => {
    setNotifications(actions, getActivitiesInAction, stopAction);
  }, [actions]);

  return (
    <Page>
      <div className='actions-view'>
        <h1>Actions</h1>
        current time: {new Date(currentTimestamp).toLocaleString()}
        <hr />
        <FlexColumnCenter>
          <StartStopAction
            activity={focusActivity}
            startAction={startAction}
            stopAction={stopAction}
            isActivityInAction={getIsActivityInAction(focusActivity, actions)}
          />

          <hr />
          <FocusActivity
            timestamp={currentTimestamp}
            activitiesInAction={getActivitiesInAction(actions)}
            focusActivity={focusActivity}
            maybeActivities={getActivities(actions)}
            hoistActivity={setFocusActivity}
          />
          {!actions.length ? null : (
            <Contents>
              <hr />
              <h2>Statistic</h2>
              <FormDataRange
                key={"FormDataRange"}
                period={{ start: startPeriod, end: endPeriod }}
                setPeriod={setPeriod}
              />
              <Checked
                id={"filter"}
                name={`filter by ${focusActivity.name}`}
                valueFromParent={isFiltredByFocus}
                hoistValue={toggleFilterByFocus}
              />

              <AllActions
                actions={actions}
                focusActivity={isFiltredByFocus ? focusActivity : null}
                timestamp={currentTimestamp}
                startPeriod={startPeriod}
                endPeriod={endPeriod}
              />

              <ActionsByPeriod
                actions={actions}
                focusActivity={isFiltredByFocus ? focusActivity : null}
                timestamp={currentTimestamp}
                startPeriod={startPeriod}
                endPeriod={endPeriod}
                periodType='days'
              />
              <ActionsByPeriod
                actions={actions}
                focusActivity={isFiltredByFocus ? focusActivity : null}
                timestamp={currentTimestamp}
                startPeriod={startPeriod}
                endPeriod={endPeriod}
                periodType='weeks'
              />
              <ActionsByPeriod
                actions={actions}
                focusActivity={isFiltredByFocus ? focusActivity : null}
                timestamp={currentTimestamp}
                startPeriod={startPeriod}
                endPeriod={endPeriod}
                periodType='months'
              />
              <ActionsByPeriod
                actions={actions}
                focusActivity={isFiltredByFocus ? focusActivity : null}
                timestamp={currentTimestamp}
                startPeriod={startPeriod}
                endPeriod={endPeriod}
                periodType='years'
              />
            </Contents>
          )}
        </FlexColumnCenter>
      </div>
    </Page>
  );
} /* <ActivitiesInAction
            activitiesInAction={getActivitiesInAction(actions)}
            hoistActivity={setFocusActivity}
            timestamp={currentTimestamp}
          />
 <StatisticByPeriod period='days' actions={getActionsByDays()} />
              <StatisticByPeriod period='weeks' actions={getActionsByWeek()} />
              <StatisticByPeriod
                period='months'
                actions={getActionsByMonth()}
              />
              <StatisticByPeriod period='years' actions={getActionsByYear()} />*/
