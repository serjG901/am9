import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity, Action, ActionsStore } from "../interfaces";
import { name as appName } from "../../package.json";

const useActionsStore = create<ActionsStore>()(
  persist(
    (set, get) => ({
      getState: () => get(),
      setState: (state) => {
        set(state);
      },

      actions: [],
      getActions: () => get().actions,
      getEndedActions: () =>
        get().actions.filter((activity) => activity.endTime),
      getActivities: (actions: Action[]) =>
        [
          ...new Map(
            actions.map((a) => [JSON.stringify(a.activity), a.activity])
          ),
        ].map((a) => a[1]),

      getActivitiesInAction: (actions: Action[]) =>
        actions.filter((action) => !action.endTime),

      focusActivity: { name: "", color: "" },
      setFocusActivity: (activity: Activity) =>
        set({ focusActivity: activity || { name: "", color: "" } }),

      isFiltredByFocus: false,
      toggleFilterByFocus: () =>
        set((state) => ({ isFiltredByFocus: !state.isFiltredByFocus })),

      startAction: (activity: Activity) => {
        const acticity: Action = {
          activity,
          startTime: Date.now(),
          endTime: null,
        };
        set((state) => ({ actions: [...state.actions, acticity],
          focusActivity:
            state.focusActivity.name === activity.name &&
            state.focusActivity.color === activity.color
              ? { name: "", color: "" }
              : state.focusActivity, }));
        if ("vibrate" in navigator) {
          navigator.vibrate([300]);
        }
      },
      stopAction: (activity: Activity) => {
        set((state) => ({
          actions: state.actions.map((action: Action) =>
            !action.endTime &&
            action.activity.name === activity.name &&
            action.activity.color === activity.color
              ? { ...action, endTime: Date.now() }
              : action
          )
        }));,
          focusActivity:
            state.focusActivity.name === activity.name &&
            state.focusActivity.color === activity.color
              ? { name: "", color: "" }
              : state.focusActivity,
        if ("vibrate" in navigator) {
          navigator.vibrate([300, 100, 300]);
        }
      },
      getIsActivityInAction: (activity: Activity, actions: Action[]) => {
        const findActivityStarted = actions.find(
          (a) =>
            !a.endTime &&
            JSON.stringify(a.activity) === JSON.stringify(activity)
        );
        return !!findActivityStarted;
      },

      getActionsByDays: () => {
        const { actions } = get();
        return Object.groupBy(
          actions,
          ({ startTime }) => new Date(startTime).toISOString().split("T")[0]!
        );
      },
      getActionsByWeek: () => {
        const { actions } = get();
        return Object.groupBy(
          actions,
          ({ startTime }) => new Date(startTime).toISOString().split("T")[0]!
        );
      },
      getActionsByMonth: () => {
        const { actions } = get();
        return Object.groupBy(
          actions,
          ({ startTime }) => new Date(startTime).toISOString().split("T")[0]!
        );
      },
      getActionsByYear: () => {
        const { actions } = get();
        return Object.groupBy(
          actions,
          ({ startTime }) => new Date(startTime).toISOString().split("T")[0]!
        );
      },

      getActionsByActivity: () => {
        const { actions } = get();
        return Object.groupBy(
          actions,
          ({ activity }) => activity.name + "{separator}" + activity.color
        );
      },

      deleteActions: (activity, period) => {
        set((state) => ({
          actions: state.actions.filter(
            (action) =>
              action.endTime &&
              action.endTime < period.end &&
              action.startTime > period.start &&
              (action.activity.name !== activity.name ||
                action.activity.color !== activity.color)
          ),
        }));
      },

      updateActivity: ({ oldActivity, newActivity }) => {
        set((state) => ({
          actions: state.actions.map((action) =>
            action.activity.name === oldActivity.name &&
            action.activity.color === oldActivity.color
              ? {
                  ...action,
                  activity: newActivity,
                }
              : action
          ),
          focusActivity:
            state.focusActivity.name === oldActivity.name &&
            state.focusActivity.color === oldActivity.color
              ? newActivity
              : state.focusActivity,
        }));
      },
      deleteActivity: (activityDelete) => {
        set((state) => ({
          actions: state.actions.filter(
            (action) =>
              action.activity.name !== activityDelete.name &&
              action.activity.color !== activityDelete.color
          ),
          focusActivity:
            state.focusActivity.name === activityDelete.name &&
            state.focusActivity.color === activityDelete.color
              ? { name: "", color: "" }
              : state.focusActivity,
        }));
      },
    }),
    {
      name: `${appName}-actions`,
    }
  )
);

export default useActionsStore;
