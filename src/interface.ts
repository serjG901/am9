type Timestamp = number;

export interface UserAction {
  actionType: string;
  startTime: Timestamp;
  endTime?: Timestamp;
}

export interface UserActionStore {
  currentActionType: string;
  isUserActive: boolean;
  actions: UserAction[];
  actionTypes: string[];

  setCurrentActionType: (actionType: string) => void;
  startCurrentAction: () => void;
  stopCurrentAction: () => void;
  clearAllActions: () => void;
  clearActionsByType: (actionType: string) => void;
}

export interface TimerStore {
  currentTimestamp: Timestamp;
  currentTimerId?: number;
  updateInterval: number;

  updateTimestamp: () => void;
  setUpdateInterval: (interval: number) => void;
  removeTimer: () => void;
}
