type Timestamp = number;

interface UserAction {
  actionType: string;
  startTime: Timestamp;
  endTime?: Timestamp;
}

interface UserActionStorage {
  actions: UserAction[];
  actionTypes: string[];
}

interface Timer {
  id: number;
  interval: number;
}

class UserActionManager {
  private currentActionType: string = "";
  private startTimestamp: Timestamp | null = null;
  private isUserActive: boolean = false;
  private actionStorage: UserActionStorage = { actions: [], actionTypes: [] };

  setCurrentActionType(actionType: string): void {
    this.currentActionType = actionType;
  }

  startCurrentAction(): void {
    this.startTimestamp = Date.now();
    this.isUserActive = true;
  }

  stopCurrentAction(): void {
    if (this.startTimestamp !== null) {
      this.actionStorage.actions.push({
        actionType: this.currentActionType,
        startTime: this.startTimestamp,
        endTime: Date.now(),
      });
      this.startTimestamp = null;
      this.isUserActive = false;
    }
  }

  clearAllActions(): void {
    this.actionStorage.actions = [];
  }

  clearActionsByType(actionType: string): void {
    this.actionStorage.actions = this.actionStorage.actions.filter(
      (action) => action.actionType !== actionType
    );
  }
}

class TimerManager {
  private currentTimestamp: Timestamp = Date.now();
  private currentTimerId: number | null = null;
  private updateInterval: number = 1000;

  updateTimestamp(): void {
    this.currentTimestamp = Date.now();
  }

  setUpdateInterval(interval: number): void {
    this.updateInterval = interval;
  }

  removeTimer(): void {
    if (this.currentTimerId !== null) {
      clearInterval(this.currentTimerId);
      this.currentTimerId = null;
    }
  }
}
