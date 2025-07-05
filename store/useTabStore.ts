import { create } from "zustand";

type TabState = {
  activeTab: "account" | "order-history" | null;
  setActiveTab: (tab: TabState["activeTab"]) => void;
};

export const useTabStore = create<TabState>((set) => ({
  activeTab: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
