"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import type { Tier } from "../../types/types";
import { PositionCard } from "./PositionCard";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { UpdateTierName } from "@/app/api/tiers";
import { toast } from "react-toastify";

interface TierContainerProps {
  tier: Tier;
  tiers: Tier[];
  accentColor: string;
  onDelete: (id: number) => void;
  onEmployeeSheetOpen?: (id: number) => void;
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
  const [name, setName] = useState(defaultName || `${tier.name}`);

  const handleNameChange = async () => {
    setIsEditing(false);
    const updatedTier = await UpdateTierName(tier.id, name);
    if (updatedTier) {
      // Optionally update the global state or local state if needed
      toast.success("Tier name updated successfully");
    } else {
      toast.error("Failed to update tier name");
    }
  };

  const handleCreateNewPosition = () => {
    // const lastPosition = tier.positions[tier.positions.length - 1];
    // const lastPositionId = parseInt(lastPosition.id.split("-")[1]);
    // const newPositionId = `position-${lastPositionId + 1}`;

    // tier.positions.push({
    //   id: newPositionId,
    //   title: "New Position",
    //   employees: { count: 0, data: [] },
    //   division: "Operations",
    //   tierId: tier.id,
    //   subordinates: [],
    // });
    alert("New position created");
  }

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
            onBlur={handleNameChange}
            onKeyDown={(e) => e.key === "Enter" && handleNameChange()}
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
            <Xwrapper>
              {tier.positions.map((position) => {
                return (
                  <div key={position.id} className="relative">
                    <PositionCard
                      position={position}
                      accentColor={accentColor}
                      onDelete={onDelete}
                      onEmployeeSheetOpen={onEmployeeSheetOpen}
                      id={`${position.id}`}
                    />
                    {position.reports_to_id && (
                      <Xarrow
                        start={`${position.reports_to_id}`}
                        end={`${position.id}`}
                        color="grey"
                        showHead={false}
                      />
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 rounded-full z-10 bg-white shadow"
                      onClick={handleCreateNewPosition}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </Xwrapper>
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
