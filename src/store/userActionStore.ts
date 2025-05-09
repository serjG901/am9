import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAction, UserActionStore } from "../interfaces";
import { name as appName } from "../../package.json";

const useUserActionStore = create<UserActionStore>()(
  persist(
    (set, get) => ({
      currentActionType: "",
      isUserActive: false,
      actions: [],
      actionTypes: [],
      isFiltredByCurrentActionType: false,

      toggleFilterByCurrentActionType: () =>
        set((state) => ({
          isFiltredByCurrentActionType: !state.isFiltredByCurrentActionType,
        })),

      toggleAction: () =>
        set((state) => {
          if ("vibrate" in navigator) {
            navigator.vibrate(state.isUserActive ? [300, 100, 300] : [300]);
          }

          return state.isUserActive
            ? {
                isUserActive: false,
                actions: state.actions.map((action) =>
                  action.endTime ? action : { ...action, endTime: Date.now() }
                ),
              }
            : {
                isUserActive: true,
                actions: [
                  ...state.actions,
                  {
                    actionType: state.currentActionType,
                    startTime: Date.now(),
                  },
                ],
                actionTypes: [
                  ...new Set([...state.actionTypes, state.currentActionType]),
                ],
              };
        }),

      getActions: () => {
        const { actions, isFiltredByCurrentActionType, currentActionType } =
          get();
        return isFiltredByCurrentActionType
          ? actions.filter((action) => action.actionType === currentActionType)
          : actions;
      },

      getDoneActionsReverse: () => {
        const { actions, isFiltredByCurrentActionType, currentActionType } =
          get();
        return isFiltredByCurrentActionType
          ? actions
              .filter(
                (action) =>
                  action.actionType === currentActionType && action.endTime
              )
              .toReversed()
          : actions.filter((action) => action.endTime).toReversed();
      },

      getDoneActionsByType: () => {
        const { actions } = get();
        return actions
          .filter((action) => action.endTime)
          .reduce((acc, action) => {
            (acc[action.actionType] ||= []).push(action);
            return acc;
          }, {} as Record<string, UserAction[]>);
      },

      setCurrentActionType: (actionType) =>
        set(() => ({ currentActionType: actionType })),

      startCurrentAction: () =>
        set((state) => ({
          isUserActive: true,
          actions: [
            ...state.actions,
            { actionType: state.currentActionType, startTime: Date.now() },
          ],
          actionTypes: [
            ...new Set([...state.actionTypes, state.currentActionType]),
          ],
        })),

      getCurrentActionStartTime: () =>
        get().actions.find((action) => !action.endTime)?.startTime,

      stopCurrentAction: () =>
        set((state) => {
          const updatedActions = state.actions.map((action) =>
            action.endTime ? action : { ...action, endTime: Date.now() }
          );
          return { isUserActive: false, actions: updatedActions };
        }),

      deleteActions: () => {
        const { currentActionType } = get();

        const actionTypeText = currentActionType
          ? currentActionType
          : "ALL actions";

        if (confirm(`Delete ${actionTypeText}?`)) {
          if ("vibrate" in navigator) {
            navigator.vibrate([300, 100, 300, 100, 300]);
          }

          set((state) => ({
            actions: currentActionType
              ? state.actions.filter(
                  (action) => action.actionType !== currentActionType
                )
              : [],
            actionTypes: currentActionType
              ? state.actionTypes.filter((type) => type !== currentActionType)
              : [],
          }));
        }
      },
    }),
    {
      name: `${appName}-actions`,
    }
  )
);

export default useUserActionStore;
