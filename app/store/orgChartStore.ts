import { create } from "zustand";
import { Division, Employees, Position, PositionAssignment, Tier, } from "../types/types";
import getTiers from "../api/tiers";
import getDivisions from "../api/divisions";

interface PositionByIdProps {
  id: number
  name: string
  position_assignments: PositionAssignment[]
}

interface OrgChartState {
  tiers: Tier[];
  // activeId: string | null;
  divisions: Division[];
  positionById?: PositionByIdProps;
  selectedEmployees: Employees[];
  employeeSheetOpen: boolean;
  setTiers: (tiers: Tier[]) => void;
  setDivisions: (divisions: Division[]) => void;
  setPositionsById: (divisions: Division[]) => void;
  setEmployeeSheetOpen: (open: boolean) => void;
  loadTiers: () => Promise<void>;
  loadDivisions: () => Promise<void>;
  getPositionById: (id: number) => Position | undefined;
}

export const useOrgChartStore = create<OrgChartState>((set, get) => ({
  tiers: [],
  divisions: [],
  positionById: {} as PositionByIdProps,
  selectedEmployees: [],
  employeeSheetOpen: false,
  setTiers: (tiers: Tier[]) => set({ tiers }),
  setDivisions: (divisions: Division[]) => set({ divisions }),
  setPositionsById: (divisions: Division[]) => set({ divisions }),
  setEmployeeSheetOpen: (open: boolean) => set({ employeeSheetOpen: open }),
  loadTiers: async () => {
    const dataTiers = (await getTiers()) || [];
    const tiers = dataTiers.sort((a, b) => a.id - b.id);
    
    set({ tiers: tiers ?? [] });
  },
  loadDivisions: async () => {
    const divisions = (await getDivisions()) || [];
    set({ divisions });
  },
  getPositionById: (id: number) => {
    const { tiers } = get();
    for (const tier of tiers) {
      const position = tier.positions.find((p) => p.id === id);
      if (position) return position;
    }
    return undefined;
  },
}));