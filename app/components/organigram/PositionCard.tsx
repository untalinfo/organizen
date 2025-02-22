"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import type { Position } from "../../types/types";

interface PositionCardProps {
  position: Position;
  accentColor: string;
  onDelete?: (id: string) => void;
  onEmployeeSheetOpen?: (employees: Position["employees"]) => void;
}

export function PositionCard({
  position,
  accentColor,
  onDelete,
  onEmployeeSheetOpen,
}: PositionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: position.id });

  console.log('POSITION', position)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onEmployeeSheetOpen) {
      onEmployeeSheetOpen(position.employees);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card text-card-foreground rounded-lg shadow min-w-[200px] cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        alert("Position Edited");
      }}
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
            alert("Position Edited");
          }}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
        <h3 className="font-medium self-center">{position.title}</h3>
        <div className="text-sm">
          <span>Openings:</span>
          <span className="text-red-500 ml-1 flex items-center justify-center">
            {position.employees.count} employees
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
        <Select defaultValue={position.division}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder='Select division' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
          </SelectContent>
        </Select>
        <div className="self-end">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              alert("Position Edited");
            }}
          >
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button> */}
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
        </div>
      </div>
    </div>
  );
}
