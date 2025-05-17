import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => {
      return {
        hue: "190",
        setHue: (hue) => set({ hue }),
      };
    },
    {
      name: `${appName}-settings`,
    }
  )
);
