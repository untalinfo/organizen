"use client";

// import { Handle, Position as Postions } from "reactflow";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
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
  onDelete: (id: string) => void;
}

export function PositionCard({
  position,
  accentColor,
  onDelete,
}: PositionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: position.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card text-card-foreground rounded-lg shadow p-4 mb-4 cursor-move touch-none"
    >
      {/* <Handle type="target" position={Postions.Top} className="!bg-gray-400" /> */}
      <div style={{ borderLeftColor: accentColor }} className="border-l-4 pl-3">
        <h3 className="font-medium">{position.title}</h3>
        <div className="text-sm">
          <span>Openings</span>
          <span className="text-red-500 ml-1">
            {position.employees} employees ›
          </span>
        </div>
        <Select defaultValue={position.division}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Division..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onDelete(position.id)}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
