"use client";

import { useEffect, useState } from "react";
import { OrgChartContent } from "../components/organigram/OrgChartContent";
import EmployeeList from "../components/organigram/EmployeeList";
import { ZoomControls } from "../components/organigram/ZoomControls";
import { useOrgChart } from "../hooks/useOrgChart";
import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { useOrgChartStore } from "../store/orgChartStore";

export default function OrgChart() {
  const [employeeSheetOpen, setEmployeeSheetOpen] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState<
    number | undefined
  >(undefined);
  const [transformWrapperDisabled, setTransformWrapperDisabled] = useState(false);
  const { tiers, loadTiers } = useOrgChartStore();


  const {
    activeId,
    findPosition,
    handleDragStart,
    handleDragEnd,
  } = useOrgChart();

  useEffect(() => {
    loadTiers();
  }, [loadTiers]);

  const handleEmployeeSheetOpen = (id: number) => {
    setSelectedPositionId(id);
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
            activeId={activeId ? activeId as number : null}
            onDragStart={(event) =>
              handleDragStart(event, setTransformWrapperDisabled)
            }
            onDragEnd={(event) =>
              handleDragEnd(event, setTransformWrapperDisabled)
            }
            onEmployeeSheetOpen={handleEmployeeSheetOpen}
            findPosition={findPosition}
          />
        </TransformComponent>

        <ZoomControls />
        <EmployeeList
          open={employeeSheetOpen}
          onOpenChange={setEmployeeSheetOpen}
          positionId={selectedPositionId ?? 0}
        />
      </TransformWrapper>
    </div>
  );
}
