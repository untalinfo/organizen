import { useState } from "react"
import type { Position, Tier } from "../types/types"
import { initialTiers } from "../data/initialTiers"
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"

export function useOrgChart() {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const findPosition = (id: UniqueIdentifier): Position | undefined => {
    for (const tier of tiers) {
      const position = tier.positions.find((p) => p.id === id)
      if (position) return position
    }
  }

  const handleDragStart = (event: { active: { id: UniqueIdentifier } }) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {

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
      targetTierId = overPosition.tierId
    }

    setTiers((prevTiers) => {
      const newTiers = [...prevTiers]
      const oldTierIndex = newTiers.findIndex((t) => t.id === activePosition.tierId)
      const oldTier = newTiers[oldTierIndex]
      const positionIndex = oldTier.positions.findIndex((p) => p.id === activePosition.id)
      const [movedPosition] = oldTier.positions.splice(positionIndex, 1)

      movedPosition.tierId = String(targetTierId)

      const newTierIndex = newTiers.findIndex((t) => t.id === targetTierId)
      newTiers[newTierIndex].positions.push(movedPosition)

      return newTiers
    })

    setActiveId(null)
  }

  const handleDelete = (positionId: string) => {
    setTiers((prev) => {
      const newTiers = prev.map((tier) => ({
        ...tier,
        positions: tier.positions
          .map((position) => ({
            ...position,
            subordinates: position.subordinates.filter((subId) => subId !== positionId),
          }))
          .filter((p) => p.id !== positionId),
      }))
      return newTiers
    })
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

