import { PersistOptions } from "zustand/middleware";

type Timestamp = number;

export interface Activity {
  name: string;
  color: string;
}

export interface Action {
  activity: Activity;
  startTime: Timestamp;
  endTime: Timestamp | null;
}

export interface ActionsStore {
  getState: () => ActionsStore;
  setState: (state: ActionsStore) => void;

  actions: Action[];
  getActions: () => Action[];
  getEndedActions: () => Action[];
  getActivities: (actions: Action[]) => Activity[];
  getActivitiesInAction: (actions: Action[]) => Action[];

  focusActivity: Activity;
  setFocusActivity: (activity: Activity) => void;
  isFiltredByFocus: boolean;
  toggleFilterByFocus: () => void;

  startAction: (activity: Activity) => void;
  stopAction: (activity: Activity) => void;
  getIsActivityInAction: (activity: Activity, actions: Action[]) => boolean;

  getActionsByDays: () => Partial<Record<string, Action[]>>;
  getActionsByWeek: () => Partial<Record<string, Action[]>>;
  getActionsByMonth: () => Partial<Record<string, Action[]>>;
  getActionsByYear: () => Partial<Record<string, Action[]>>;

  getActionsByActivity: () => Partial<Record<string, Action[]>>;

  deleteActions: (
    activity: Activity,
    period: { start: number; end: number }
  ) => void;

  updateActivity: ({
    oldActivity,
    newActivity,
  }: Record<"oldActivity" | "newActivity", Activity>) => void;
  deleteActivity: (activityDelete: Activity) => void;
}

export interface TimerStore {
  currentTimestamp: Timestamp;
  currentTimerId?: number;
  updateInterval: number;

  updateTimestamp: () => void;
  setUpdateInterval: (interval: number) => void;
  removeTimer: () => void;
}

export interface PeriodStore {
  start: number | null;
  end: number | null;
  setPeriod: (start: number | null, end: number | null) => void;
}

export interface SettingsStore {
  hue: string;
  setHue: (hue: string) => void;
}

//zustand

export type Write<T, U> = Omit<T, keyof U> & U;
export type PersistListener<S> = (state: S) => void;
export type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};
