"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import type { Employee, Tier } from "../../types/types";
import { PositionCard } from "./PositionCard";
import { useState } from "react";

interface TierContainerProps {
  tier: Tier;
  tiers: Tier[];
  accentColor: string;
  onDelete: (id: string) => void;
  onEmployeeSheetOpen: (employees: { count: number; data: Employee[] }) => void;
  defaultName?: string;
}

export function TierContainer({
  tier,
  accentColor,
  onDelete,
  onEmployeeSheetOpen,
  defaultName = "",
}: TierContainerProps) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(defaultName || `${tier.title}`);

  return (
    <div
      ref={setNodeRef}
      className="relative mb-4 min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-4"
    >
      <div className="absolute -top-3 left-4 flex items-center gap-2 bg-white px-2">
        {isEditing ? (
          <Input
            className="h-6 w-32"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{name}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-50 hover:opacity-100"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>
        )}
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
                  onEmployeeSheetOpen={onEmployeeSheetOpen}
                />
                {/* {renderConnectorLines(position)} */}
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
