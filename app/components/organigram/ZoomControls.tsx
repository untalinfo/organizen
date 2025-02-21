import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface ZoomControlsProps {
  zoom: number;
  setZoom: (zoom: number) => void;
}

export function ZoomControls({ zoom, setZoom }: ZoomControlsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background p-2 rounded-lg shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setZoom(Math.max(50, zoom - 10))}
      >
        <ZoomOut className="w-5 h-5" />
      </Button>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
        New position
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setZoom(Math.min(150, zoom + 10))}
      >
        <ZoomIn className="w-5 h-5" />
      </Button>
    </div>
  );
}
