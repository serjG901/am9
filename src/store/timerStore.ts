import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimerStore } from "../interfaces";
import { name as appName } from "../../package.json";

const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      currentTimestamp: Date.now(),
      currentTimerId: undefined,
      updateInterval: 1000,

      updateTimestamp: () => {
        const { currentTimerId, updateInterval } = get();
        if (currentTimerId) clearTimeout(currentTimerId);
        set(() => ({ currentTimestamp: Date.now() }));
        const newTimerId = setTimeout(get().updateTimestamp, updateInterval);
        set(() => ({ currentTimerId: newTimerId }));
      },

      setUpdateInterval: (interval) =>
        set(() => ({ updateInterval: interval })),

      removeTimer: () => {
        const { currentTimerId } = get();
        if (currentTimerId) {
          clearTimeout(currentTimerId);
        }
        set(() => ({ currentTimerId: undefined }));
      },
    }),
    {
      name: `${appName}-timer`,
    }
  )
);

export default useTimerStore;
