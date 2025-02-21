import { DndContext, DragOverlay, closestCenter, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { TierContainer } from "./TierContainer";
import { PositionCard } from "./PositionCard";
import type { Position, Tier } from "../../types/types";

interface OrgChartContentProps {
  tiers: Tier[];
  activeId: string | null;
  zoom: number;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDelete: (id: string) => void;
  onEmployeeSheetOpen: () => void;
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
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-[-2.5rem]"
                onClick={onEmployeeSheetOpen}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
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
                onDelete={onDelete}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
