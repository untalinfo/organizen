"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import type { Position, Tier } from "../../types/types";
import { PositionCard } from "./PositionCard";

interface TierContainerProps {
  tier: Tier;
  tiers: Tier[];
  accentColor: string;
  onDelete: (id: string) => void;
}

export function TierContainer({
  tier,
  tiers,
  accentColor,
  onDelete,
}: TierContainerProps) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });

  const findSubordinatePositions = (positionId: string): Position[] => {
    const position = tier.positions.find((p) => p.id === positionId);
    if (!position) return [];

    const subordinates: Position[] = [];
    position.subordinates.forEach((subId) => {
      tiers.forEach((t) => {
        const sub = t.positions.find((p) => p.id === subId);
        if (sub) subordinates.push(sub);
      });
    });
    return subordinates;
  };

  const renderConnectorLines = (position: Position) => {
    const subordinates = findSubordinatePositions(position.id);
    if (subordinates.length === 0) return null;

    const lineWidth = (subordinates.length - 1) * 240;
    const centerOffset = lineWidth / 2;

    return (
      <>
        {/* Línea vertical desde la tarjeta actual */}
        <div className="absolute left-1/2 -bottom-12 w-px h-12 bg-border" />

        {/* Línea horizontal que conecta a los subordinados */}
        {subordinates.length > 1 && (
          <div
            className="absolute h-px bg-border"
            style={{
              width: `${lineWidth}px`,
              left: `50%`,
              transform: `translateX(-${centerOffset}px)`,
              bottom: "-12px",
            }}
          />
        )}

        {/* Líneas verticales a los subordinados */}
        {subordinates.map((sub, index) => {
          const xPosition = index * 240 - centerOffset;
          return (
            <div
              key={sub.id}
              className="absolute w-px h-12 bg-border"
              style={{
                left: `calc(50% + ${xPosition}px)`,
                bottom: "-24px",
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <div
      ref={setNodeRef}
      className="border-2 border-dashed border-gray-300 p-4 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-foreground">{tier.title}</h2>
        <Pencil className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="relative">
        <SortableContext
          items={tier.positions}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-16 justify-center">
            {tier.positions.map((position) => (
              <div key={position.id} className="relative">
                <PositionCard
                  position={position}
                  accentColor={accentColor}
                  onDelete={onDelete}
                />
                {renderConnectorLines(position)}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 rounded-full z-10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
