import { create } from "zustand";
import { Division, Employees, Tier } from "../types/types";
import Tiers from "../api/tiers";
import Divisions from "../api/divisions";
import { PositionById } from "../api/position";

interface OrgChartState {
  tiers: Tier[];
  // activeId: string | null;
  divisions: Division[];
  positionById: Record<string, Employees[]>;
  selectedEmployees: Employees[];
  employeeSheetOpen: boolean;
  setTiers: (tiers: Tier[]) => void;
  setDivisions: (divisions: Division[]) => void;
  setPositionsById: (divisions: Division[]) => void;
  setEmployeeSheetOpen: (open: boolean) => void;
  loadTiers: () => Promise<void>;
  loadDivisions: () => Promise<void>;
  loadPositionsById: (id: number) => Promise<void>;
}

export const useOrgChartStore = create<OrgChartState>((set) => ({
  tiers: [],
  divisions: [],
  positionById: {},
  selectedEmployees: [],
  employeeSheetOpen: false,
  setTiers: (tiers: Tier[]) => set({ tiers }),
  setDivisions: (divisions: Division[]) => set({ divisions }),
  setPositionsById: (divisions: Division[]) => set({ divisions }),
  setEmployeeSheetOpen: (open: boolean) => set({ employeeSheetOpen: open }),
  loadTiers: async () => {
    const tiers = (await Tiers()) || [];
    const sortedTiers = tiers.sort((a, b) => a.id - b.id);
    set({ tiers: sortedTiers });
  },
  loadDivisions: async () => {
    const divisions = (await Divisions()) || [];
    set({ divisions });
  },
  loadPositionsById: async (id: number) => {
    const positionById = (await PositionById(id)) || {};
    set({ positionById });
  },
}));