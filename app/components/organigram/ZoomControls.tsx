import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { CreateNewModal } from "./CreateNewModal";
import { useControls } from "react-zoom-pan-pinch";


export function ZoomControls() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-background p-2 rounded-lg shadow-lg">
      <Button variant="ghost" size="icon" onClick={() => zoomOut()}>
        <ZoomOut className="w-5 h-5" />
      </Button>
      <p
        onClick={() => resetTransform()}
        className="bg-primary text-primary hover:bg-primary/90 px-8 cursor-pointer rounded-lg"
      >
        Reset
      </p>
      <Button variant="ghost" size="icon" onClick={() => zoomIn()}>
        <ZoomIn className="w-5 h-5" />
      </Button>
      <CreateNewModal
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
