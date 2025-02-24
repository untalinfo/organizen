export interface Employees {
  id: number
  full_name: string
  email: string
}

export interface Division {
  id: number
  name: string
}

export interface PositionAssignment  {
  id: number
  employees: Employees
}
export interface Position {
  id: number
  name: string
  divisions?: Division
  tier_id: number
  reports_to_id?: number
  position_assignments: PositionAssignment[]
}

export interface Tier {
  id: number
  name: string
  positions: Position[]
}
