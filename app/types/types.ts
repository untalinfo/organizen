export interface Position {
  id: string
  title: string
  employees: number
  division?: string
  tierId: string
  subordinates: string[]
}

export interface Tier {
  id: string
  title: string
  positions: Position[]
}
