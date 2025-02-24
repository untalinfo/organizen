"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import type { Position } from "../../types/types";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useOrgChartStore } from "@/app/store/orgChartStore";

interface PositionCardProps {
  position: Position;
  accentColor: string;
  onDelete?: (id: number) => void;
  onEmployeeSheetOpen?: (id: number) => void;
  id?: string;
}

export function PositionCard({
  position,
  accentColor,
  onDelete,
  onEmployeeSheetOpen,
  id,
}: PositionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: position.id });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(`${position?.name}`);
  const { divisions, loadDivisions } = useOrgChartStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onEmployeeSheetOpen) {
      onEmployeeSheetOpen(position.id);
    }
  };

  useEffect(() => {
    loadDivisions();
  }, [loadDivisions]);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card text-card-foreground rounded-lg shadow min-w-[200px] cursor-pointer"
      id={id}
    >
      <div
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex flex-col pl-3 p-4 mb-4 gap-1">
        <Button
          className="self-end cursor-move touch-none right-0 top-0"
          variant="ghost"
          size="icon"
          onClick={(event) => {
            event.stopPropagation();
          }}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
        {isEditing ? (
          <Input
            className="h-6 w-32 self-center text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2 self-center group">
            <span className="text-sm font-medium">{name}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setIsEditing(true);
              }}
              className="hidden group-hover:inline transition-opacity"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>
        )}

        <div className="text-sm">
          <span>Openings:</span>
          <span className="text-red-500 ml-1 flex items-center justify-center">
            {position?.position_assignments?.length} employees
            <Button
              variant="ghost"
              size="icon"
              className=""
              onClick={(event) => {
                handleButtonClick(event);
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </span>
        </div>
        <Select defaultValue={position.divisions?.name || "Select division"}>
          <SelectTrigger className="mt-2">
            <SelectValue
              placeholder="Select division"
              defaultValue={position.divisions?.name || "Select division"}
            />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division.id} value={division.name}>
                {division.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="self-end">
          {id !== '1' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(event) => {
                event.stopPropagation();
                onDelete?.(position.id);
                alert("Position deleted");
              }}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
