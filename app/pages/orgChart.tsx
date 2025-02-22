"use client";

import { useState } from "react";
import { OrgChartContent } from "../components/organigram/OrgChartContent";
import EmployeeList from "../components/organigram/EmployeeList";
import { ZoomControls } from "../components/organigram/ZoomControls";
import { useOrgChart } from "../hooks/useOrgChart";
import { Employee } from "../types/types";

export default function OrgChart() {
  const [zoom, setZoom] = useState(100);
  const [employeeSheetOpen, setEmployeeSheetOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const {
    tiers,
    activeId,
    findPosition,
    handleDragStart,
    handleDragEnd,
    handleDelete,
  } = useOrgChart();

  console.log("HERE", employeeSheetOpen);
  const handleEmployeeSheetOpen = (employees: {
    count: number;
    data: Employee[];
  }) => {
    setSelectedEmployees(employees.data);
    setEmployeeSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <OrgChartContent
        tiers={tiers}
        activeId={activeId ? activeId.toString() : null}
        zoom={zoom}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDelete={handleDelete}
        onEmployeeSheetOpen={handleEmployeeSheetOpen}
        findPosition={findPosition}
      />
      <ZoomControls zoom={zoom} setZoom={setZoom} />
      <EmployeeList
        open={employeeSheetOpen}
        onOpenChange={setEmployeeSheetOpen}
        employees={selectedEmployees}
      />
    </div>
  );
}
