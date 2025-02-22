export interface Employee {
  id: string;
  name: string;
  email: string;
}
export interface Position {
  id: string
  title: string
  employees: {
    count: number
    data: Employee[]
  }
  division?: string
  tierId: string
  subordinates: string[]
}

export interface Tier {
  id: string
  title: string
  positions: Position[]
}
