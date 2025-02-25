import { create } from "zustand";
import { Division, Employees, Position, PositionAssignment, Tier, } from "../types/types";
import getTiers from "../api/tiers";
import getDivisions from "../api/divisions";
import fetchCreateEmployee, { fetchDeleteEmployee, fetchEditEmployee } from "../api/employee";
import { fetchCreateNewPosition, fetchDeletePosition, fetchEditPosition } from "../api/position";
import { UniqueIdentifier } from "@dnd-kit/core";

interface PositionByIdProps {
  id: number
  name: string
  position_assignments: PositionAssignment[]
}

interface OrgChartState {
  tiers: Tier[];
  divisionsList: Division[];
  positionById?: PositionByIdProps;
  selectedEmployees: Employees[];
  employeeSheetOpen: boolean;
  setTiers: (tiers: Tier[]) => void;
  setDivisions: (divisionsList: Division[]) => void;
  setPositionsById: (divisionsList: Division[]) => void;
  setEmployeeSheetOpen: (open: boolean) => void;
  loadTiers: () => Promise<void>;
  loadDivisions: () => Promise<void>;
  getPositionById: (id: number) => Position | undefined;
  createNewEmployee: (data: Employees, positionId: number) => Promise<void>;
  deleteEmployee: (position_id: number, position_assignment: PositionAssignment) => Promise<void>;
  editEmployee: (position_id: number, employee: Employees) => Promise<void>;
  EditPosition: (activePosition: Position, targetTierId: UniqueIdentifier) => Promise<void>;
  createNewPosition: (reports_to_id: number, current_tier_id: number) => Promise<void>;
  deletePosition: (id: number) => Promise<void>;
}

export const useOrgChartStore = create<OrgChartState>((set, get) => ({
  tiers: [],
  divisionsList: [],
  positionById: {} as PositionByIdProps,
  selectedEmployees: [],
  employeeSheetOpen: false,
  setTiers: (tiers: Tier[]) => set({ tiers }),
  setDivisions: (divisionsList: Division[]) => set({ divisionsList }),
  setPositionsById: (divisionsList: Division[]) => set({ divisionsList }),
  setEmployeeSheetOpen: (open: boolean) => set({ employeeSheetOpen: open }),
  loadTiers: async () => {
    const dataTiers = (await getTiers()) || [];
    const tiers = dataTiers.sort((a, b) => a.id - b.id);
    set({ tiers: (tiers as Tier[]) ?? [] });
  },
  loadDivisions: async () => {
    const divisionsList = (await getDivisions()) || [];
    set({ divisionsList });
  },
  getPositionById: (id: number) => {
    const { tiers } = get();
    for (const tier of tiers) {
      const position = tier.positions.find((p) => p.id === id);
      if (position) return position;
    }
    return undefined;
  },
  createNewEmployee: async (data: Employees, positionId: number) => {
    const position_assignments = (await fetchCreateEmployee(data, positionId));

    if (!position_assignments) return;

    set(({tiers}) => ({tiers: tiers.map(tier => {
      const position = tier.positions.find((p) => p.id === positionId);
      if (position) {
        position.position_assignments.push(position_assignments);
      }
      return tier;
    }
    )}));
  },
  deleteEmployee: async (position_id: number, position_assignment: PositionAssignment) => {
    await fetchDeleteEmployee(position_assignment);
    set(({tiers}) => ({tiers: tiers.map(tier => {
      const position = tier.positions.find((p) => p.id === position_id);
      if (position) {
        position.position_assignments = position.position_assignments.filter((pa) => pa.id !== position_assignment.id);
      }
      return tier;
    }
    )}));
  },
  editEmployee: async (position_id: number, employee: Employees) => {
    await fetchEditEmployee(employee);
    set(({tiers}) => ({tiers: tiers.map(tier => {
      const position = tier.positions.find((p) => p.id === position_id);
      if (position) {
        position.position_assignments = position.position_assignments.map((pa) => pa.employees.id === employee.id ? {id: pa.id, employees: employee} : pa);
      }
      return tier;
    }
    )}));
  },
  EditPosition: async (activePosition, targetTierId) => {
    const { tiers } = get();
    const newTiers = [...tiers]
    const oldTierIndex = newTiers.findIndex((t) => t.id === activePosition.tier_id)
    const oldTier = newTiers[oldTierIndex]
    const positionIndex = oldTier.positions.findIndex((p) => p.id === activePosition.id)
    const [movedPosition] = oldTier.positions.splice(positionIndex, 1)

    movedPosition.tier_id = Number(targetTierId)

    const newTierIndex = newTiers.findIndex((t) => t.id === targetTierId)
    newTiers[newTierIndex].positions.push(movedPosition)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { position_assignments, divisions, ...data_positions } = activePosition;
    await fetchEditPosition(data_positions);

    set({ tiers: (newTiers as Tier[]) ?? [] }); 
  },
  createNewPosition: async (reports_to_id: number, current_tier_id: number) => {
    await fetchCreateNewPosition(reports_to_id, current_tier_id);
    await get().loadTiers();
  },
  deletePosition: async (id: number) => {
    const success = await fetchDeletePosition(id);
    if (success) {
      set(({ tiers }) => ({
        tiers: tiers.map((tier) => ({
          ...tier,
          positions: tier.positions.filter((position) => position.id !== id),
        })),
      }));
    }
  },

}));
