import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { CreateNewModal } from "./CreateNewModal";

interface ZoomControlsProps {
  zoom: number;
  setZoom: (zoom: number) => void;
}

export function ZoomControls({ zoom, setZoom }: ZoomControlsProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-background p-2 rounded-lg shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setZoom(Math.max(50, zoom - 10))}
      >
        <ZoomOut className="w-5 h-5" />
      </Button>
      {/* <Button
        className="bg-primary text-primary hover:bg-primary/90 px-8"
        onClick={() => setCreateDialogOpen(true)}
      >
        New position
      </Button> */}
      <p className="bg-primary text-primary hover:bg-primary/90 px-8">
        Zoom controls
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setZoom(Math.min(150, zoom + 10))}
      >
        <ZoomIn className="w-5 h-5" />
      </Button>
      <CreateNewModal
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
