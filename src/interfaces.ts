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
  isFiltredByCurrentActionType: boolean;
  toggleFilterByCurrentActionType: () => void;
  toggleAction: () => void;
  getActions: () => UserAction[];
  getActionsByType: () => Record<string, UserAction[]>;
  setCurrentActionType: (actionType: string) => void;
  startCurrentAction: () => void;
  getCurrentActionStartTime: () => Timestamp | undefined;
  stopCurrentAction: () => void;
  deleteActions: () => void;
}

export interface TimerStore {
  currentTimestamp: Timestamp;
  currentTimerId?: number;
  updateInterval: number;

  updateTimestamp: () => void;
  setUpdateInterval: (interval: number) => void;
  removeTimer: () => void;
}
