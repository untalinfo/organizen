import { DndContext, DragOverlay, closestCenter, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { TierContainer } from "./TierContainer";
import { PositionCard } from "./PositionCard";
import type { Position, Tier } from "../../types/types";

interface OrgChartContentProps {
  tiers: Tier[];
  activeId: number | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onEmployeeSheetOpen?: (id: number) => void;
  findPosition: (id: number) => Position | undefined;
}

export function OrgChartContent({
  tiers,
  activeId,
  onDragStart,
  onDragEnd,
  onEmployeeSheetOpen,
  findPosition,
}: OrgChartContentProps) {
  const activePosition = activeId ? findPosition(activeId) : null;

  return (
    <div
      className="w-full"
      style={{
        transformOrigin: "top center",
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="space-y-24">
          {tiers?.map((tier, index) => (
            <div key={tier.id} className="relative w-full">
              <TierContainer
                tier={tier}
                tiers={tiers}
                accentColor={index === 0 ? "#37c99f" : "#fab8c3"}
                onEmployeeSheetOpen={onEmployeeSheetOpen}
              />
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeId && activePosition ? (
            <div
              style={{
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              <PositionCard
                position={activePosition}
                accentColor={
                  activePosition.tier_id === 1 ? "#37c99f" : "#fab8c3"
                }
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
