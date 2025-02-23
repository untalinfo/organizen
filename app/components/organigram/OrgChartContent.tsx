import { DndContext, DragOverlay, closestCenter, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { TierContainer } from "./TierContainer";
import { PositionCard } from "./PositionCard";
import type { Employee, Position, Tier } from "../../types/types";
import Tiers from "@/app/api/tiers";
import { useEffect, useState } from "react";

interface OrgChartContentProps {
  tiers: Tier[];
  activeId: string | null;
  zoom: number;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDelete: (id: string) => void;
  onEmployeeSheetOpen: (employees: { count: number; data: Employee[] }) => void;
  findPosition: (id: string) => Position | undefined;
}

export function OrgChartContent({
  tiers,
  activeId,
  zoom,
  onDragStart,
  onDragEnd,
  onDelete,
  onEmployeeSheetOpen,
  findPosition,
}: OrgChartContentProps) {

  const activePosition = activeId ? findPosition(activeId) : null;

  const [tiers2, setTiers2] = useState({});

  useEffect(() => {
    async function fetchTiers() {
      const result = await Tiers();
      setTiers2(result);
    }

    fetchTiers();
  }, []);
  console.log("tiers", tiers, tiers2);

  return (
    <div
      className="w-full"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="space-y-24">
          {tiers.map((tier, index) => (
            <div key={tier.id} className="relative w-full">
              <TierContainer
                tier={tier}
                tiers={tiers}
                accentColor={index === 0 ? "#37c99f" : "#fab8c3"}
                onDelete={onDelete}
                onEmployeeSheetOpen={onEmployeeSheetOpen}
              />
              
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeId && activePosition ? (
            <div
              style={{
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              <PositionCard
                position={activePosition}
                accentColor={
                  activePosition.tierId === "tier-1" ? "#37c99f" : "#fab8c3"
                }
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
