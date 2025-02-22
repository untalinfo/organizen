"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CreateNewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateNewModal({ open, onOpenChange }: CreateNewModalProps) {
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [newTierName, setNewTierName] = useState("");
  const [positionName, setPositionName] = useState("");
  const [division, setDivision] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      tier: selectedTier,
      newTierName: selectedTier === "new" ? newTierName : undefined,
      positionName,
      division,
    });

    // Reset form
    setSelectedTier("");
    setNewTierName("");
    setPositionName("");
    setDivision("");
    onOpenChange(false);
  };

  const existingTiers = [
    { id: "tier-1", name: "TIER 1" },
    { id: "tier-2", name: "TIER 2" },
    { id: "tier-3", name: "TIER 3" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new position</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tier">Select TIER</Label>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                {existingTiers.map((tier) => (
                  <SelectItem key={tier.id} value={tier.id}>
                    {tier.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">Create new tier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedTier === "new" && (
            <div className="space-y-2">
              <Label htmlFor="tierName">Name of TIER</Label>
              <Input
                id="tierName"
                placeholder="Ex: Middle management"
                value={newTierName}
                onChange={(e) => setNewTierName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="positionName">Position name</Label>
            <Input
              id="positionName"
              placeholder="Ex: Sales manager"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="division">Division</Label>
            <Select value={division} onValueChange={setDivision}>
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="division1">Division 1</SelectItem>
                <SelectItem value="division2">Division 2</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2930ff] hover:bg-[#2930ff]/90 text-white"
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
