"use client";

import { useState } from "react";
import { OrgChartContent } from "../components/organigram/OrgChartContent";
import EmployeeList from "../components/organigram/EmployeeList";
import { ZoomControls } from "../components/organigram/ZoomControls";
import { useOrgChart } from "../hooks/useOrgChart";
import { Employee } from "../types/types";
import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

export default function OrgChart() {
  const [employeeSheetOpen, setEmployeeSheetOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [transformWrapperDisabled, setTransformWrapperDisabled] = useState(false);

  const {
    tiers,
    activeId,
    findPosition,
    handleDragStart,
    handleDragEnd,
    handleDelete,
  } = useOrgChart();

  const handleEmployeeSheetOpen = (employees: {
    count: number;
    data: Employee[];
  }) => {
    setSelectedEmployees(employees.data);
    setEmployeeSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        disabled={transformWrapperDisabled}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%", paddingTop: "12px" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <OrgChartContent
            tiers={tiers}
            activeId={activeId ? activeId.toString() : null}
            onDragStart={(event) =>
              handleDragStart(event, setTransformWrapperDisabled)
            }
            onDragEnd={(event) =>
              handleDragEnd(event, setTransformWrapperDisabled)
            }
            onDelete={handleDelete}
            onEmployeeSheetOpen={handleEmployeeSheetOpen}
            findPosition={findPosition}
          />
        </TransformComponent>

        <ZoomControls />
        <EmployeeList
          open={employeeSheetOpen}
          onOpenChange={setEmployeeSheetOpen}
          employees={selectedEmployees}
        />
      </TransformWrapper>
    </div>
  );
}
