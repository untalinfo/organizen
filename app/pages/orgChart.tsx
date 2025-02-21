"use client";

import { useState } from "react";
// import {
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
// import { OrgChartHeader } from "./components/OrgChartHeader";
import { OrgChartContent } from "../components/organigram/OrgChartContent";
import  EmployeeList  from "../components/organigram/EmployeeList";
import { ZoomControls } from "../components/organigram/ZoomControls";
import { useOrgChart } from "../hooks/useOrgChart";

export default function OrgChart() {
  const [zoom, setZoom] = useState(100);
  const [employeeSheetOpen, setEmployeeSheetOpen] = useState(false);
  const {
    tiers,
    activeId,
    findPosition,
    handleDragStart,
    handleDragEnd,
    handleDelete,
  } = useOrgChart();

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 5,
  //     },
  //   }),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <OrgChartContent
        tiers={tiers}
        activeId={activeId ? activeId.toString() : null}
        zoom={zoom}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDelete={handleDelete}
        onEmployeeSheetOpen={() => setEmployeeSheetOpen(true)}
        findPosition={findPosition}
      />
      <ZoomControls zoom={zoom} setZoom={setZoom} />
      <EmployeeList
        open={employeeSheetOpen}
        onOpenChange={setEmployeeSheetOpen}
      />
    </div>
  );
}
