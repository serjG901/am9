import "./style.css";
import Page from "../../ui/atom/page/Page";
import FormDataRange from "../../ui/molecul/form-date-range/FormDateRange";
import { usePeriodStore } from "../../store/periodStore";
import { ActionsStore, StorePersist, Write } from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";
//import Paginate from "../../ui/substance/paginate/Paginate";
//import ToTop from "../../ui/molecul/to-top/ToTop";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
//import StatisticByPeriod from "../../ui/substance/statistic-by-period/StatisticByPeriod";
import Collapse from "../../ui/atom/collapse/Collapse";
import FocusActivity from "../../ui/substance/focus-activity/FocusActivity";
import { useShallow } from "zustand/shallow";
import Checked from "../../ui/atom/checked/Checked";
import StartStopAction from "../../ui/substance/start-stop-action/StartStopAction";
import ActivitiesInAction from "../../ui/substance/activities-in-action/ActivitiesInAction";

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

  const [startPeriod, endPeriod, setPeriod] = usePeriodStore(
    useShallow((state) => [state.start, state.end, state.setPeriod])
  );
  return (
    <Page>
      <div className='payments-view'>
        <h1>Action</h1>
        <hr />
        <FlexColumnCenter>
          <FocusActivity
            focusActivity={focusActivity}
            maybeActivities={getActivities(actions)}
            hoistActivity={setFocusActivity}
          />

          <hr />
          <StartStopAction
            activity={focusActivity}
            startAction={startAction}
            stopAction={stopAction}
            isActivityInAction={getIsActivityInAction(focusActivity, actions)}
          />
          <ActivitiesInAction
            activitiesInAction={getActivitiesInAction(actions)}
            hoistActivity={setFocusActivity}
          />
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
          <Collapse title='stat' collapseLevel='menu'>
            <FlexColumnCenter></FlexColumnCenter>
          </Collapse>
        </FlexColumnCenter>
      </div>
    </Page>
  );
} /*
 <StatisticByPeriod period='days' actions={getActionsByDays()} />
              <StatisticByPeriod period='weeks' actions={getActionsByWeek()} />
              <StatisticByPeriod
                period='months'
                actions={getActionsByMonth()}
              />
              <StatisticByPeriod period='years' actions={getActionsByYear()} />*/
