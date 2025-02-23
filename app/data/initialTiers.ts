import type { Tier } from "../types/types"

export const initialTiers: Tier[] = [
  {
    id: "tier-1",
    title: "TIER 1",
    positions: [
      {
        id: "position-1",
        title: "COO",
        employees: {
          count: 2,
          data: [
            {id: '1', name: "John Doe", email: "john.doe@example.com" },
            {id: '2', name: "Jane Smith", email: "jane.smith@example.com" },
          ],},
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
        employees: {
          count: 0,
          data: [],
        },
        division: "Operations",
        tierId: "tier-2",
        subordinates: ["position-4"],
      },
      {
        id: "position-3",
        title: "Business Development",
        employees: {
          count: 2,
          data: [
            {id: '4', name: "Bob Brown", email: "bob.brown@example.com" },
            {id: '5', name: "Charlie Davis", email: "charlie.davis@example.com" },
          ],
        },
        division: "Operations",
        tierId: "tier-2",
        subordinates: ["position-1"],
      },
    ],
  },
]

