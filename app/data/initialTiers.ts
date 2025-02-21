import type { Tier } from "../types/types"

export const initialTiers: Tier[] = [
  {
    id: "tier-1",
    title: "TIER 1",
    positions: [
      {
        id: "position-1",
        title: "COO",
        employees: 2,
        division: "Operations",
        tierId: "tier-1",
        subordinates: ["position-2", "position-3"],
      },
    ],
  },
  {
    id: "tier-2",
    title: "TIER 2",
    positions: [
      {
        id: "position-2",
        title: "Business Operations",
        employees: 1,
        division: "Operations",
        tierId: "tier-2",
        subordinates: ["position-4"],
      },
      {
        id: "position-3",
        title: "Business Development",
        employees: 2,
        division: "Operations",
        tierId: "tier-2",
        subordinates: [],
      },
    ],
  },
  {
    id: "tier-3",
    title: "TIER 3",
    positions: [
      {
        id: "position-4",
        title: "Planning Analyst",
        employees: 0,
        division: "Operations",
        tierId: "tier-3",
        subordinates: [],
      },
    ],
  },
]

