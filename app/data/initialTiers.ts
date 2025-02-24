import type { Tier } from "../types/types"

export const initialTiers: Tier[] = [
  {
      id: 1,
      name: "Tier 1",
      positions: [
        {
          id: 1,
          name: "CEO",
          tier_id: 1,
          divisions: {
            id: 1,
            name: "Management"
          },
          reports_to_id: undefined,
          position_assignments: [
            {
              id: 4,
              employees: {
                  id: 2,
                  email: "sadjk@gma.com",
                  full_name: "oscar Info"
              }
            }
          ]
        }
      ]
  },
  {
      id: 2,
      name: "Tier 2",
      positions: [
          {
              id: 3,
              name: "CTO",
              tier_id: 2,
              divisions: {
                    id: 1,
                    name: "Engineering"
            },
              reports_to_id: 1,
              position_assignments: [
                  {
                      id: 7,
                      employees: {
                          id: 3,
                          email: "asdsa@dguhd.co",
                          full_name: "juan lopez"
                      }
                  }
              ]
          }
      ]
  },
  {
      id: 3,
      name: "Tier 3",
      positions: [
          {
              id: 4,
              name: "Business development",
              tier_id: 3,
              divisions: {
                    id: 1,
                    name: "Engineering"
            },
              reports_to_id: 3,
              position_assignments: [
                  {
                      id: 8,
                      employees: {
                          id: 5,
                          email: "mt@gmail.com",
                          full_name: "Maria Torres"
                      }
                  },
                  {
                      id: 9,
                      employees: {
                          id: 4,
                          email: "cr@mgial.com",
                          full_name: "Camilo rojas"
                      }
                  }
              ]
          },
          {
              id: 5,
              name: "Business Operations",
              tier_id: 3,
              divisions: {
                    id: 1,
                    name: "Engineering"
            },
              reports_to_id: 3,
              position_assignments: [
                  {
                      id: 10,
                      employees: {
                          id: 7,
                          email: "cr@gmail.com",
                          full_name: "Celeste Rodriguez"
                      }
                  }
              ]
          }
      ]
  }
]

