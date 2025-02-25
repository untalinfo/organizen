import { useState } from "react"
import type { Position } from "../types/types"
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { useOrgChartStore } from "../store/orgChartStore";

export function useOrgChart() {
  const { tiers, EditPosition } = useOrgChartStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const findPosition = (id: UniqueIdentifier): Position | undefined => {
    for (const tier of tiers) {
      const position = tier.positions.find((p) => p.id === id as number)
      if (position) return position
    }
  }

  const handleDragStart = (event: { active: { id: UniqueIdentifier } }, cb: (value: boolean) => void) => {
    setActiveId(event.active.id)
    cb(true);
  }

  const handleDragEnd = (event: DragEndEvent, cb: (v: boolean)=> void) => {

    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activePosition = findPosition(active.id)
    if (!activePosition) {
      setActiveId(null)
      return
    }

    let targetTierId = over.id
    const overPosition = findPosition(over.id)
    if (overPosition) {
      targetTierId = overPosition.tier_id
    }

    EditPosition(activePosition, targetTierId);

    setActiveId(null)
    cb(false);
  }

  const handleDelete = (positionId: number) => {
    console.log("DELETE", positionId)
    // setTiers((prev) => {
    //   const newTiers = prev.map((tier) => ({
    //     ...tier,
    //     positions: tier.positions.filter((p) => p.id !== positionId),
    //   }))
    //   return newTiers
    // })
  }

  return {
    tiers,
    activeId,
    findPosition,
    handleDragStart,
    handleDragEnd,
    handleDelete,
  }
}

