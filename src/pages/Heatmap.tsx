import { useState } from "react";
import { Play, Pause, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Heatmap = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedZone, setSelectedZone] = useState("zone-c");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold">Heatmap Visualization</h2>
        <p className="text-muted-foreground">Track customer movement patterns</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Video Feed Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-2 block text-sm font-medium">Select Camera/Zone</label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zone-a">Zone A - Entrance</SelectItem>
                  <SelectItem value="zone-b">Zone B - Fashion</SelectItem>
                  <SelectItem value="zone-c">Zone C - Electronics</SelectItem>
                  <SelectItem value="zone-d">Zone D - Food Court</SelectItem>
                  <SelectItem value="zone-e">Zone E - Exit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Display */}
      <Card>
        <CardHeader>
          <CardTitle>Heat Intensity Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            {/* Simulated heatmap overlay */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.random();
                let bgColor = "bg-blue-500/20";
                if (intensity > 0.7) bgColor = "bg-red-500/60";
                else if (intensity > 0.4) bgColor = "bg-yellow-500/40";
                else if (intensity > 0.2) bgColor = "bg-green-500/30";

                return (
                  <div
                    key={i}
                    className={`rounded transition-all duration-300 ${bgColor}`}
                  />
                );
              })}
            </div>

            {/* Overlay text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg bg-card/90 p-6 text-center backdrop-blur-sm">
                <p className="text-lg font-semibold">Simulated Heatmap View</p>
                <p className="text-sm text-muted-foreground">
                  Showing activity patterns for {selectedZone.toUpperCase().replace("-", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Playback controls */}
          <div className="mt-4 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">1x</Button>
              <Button variant="outline" size="sm">2x</Button>
              <Button variant="outline" size="sm">4x</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Legend & Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Heat Intensity Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-12 rounded bg-blue-500/20" />
                <span className="text-sm">Low Activity (0-25%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-12 rounded bg-green-500/30" />
                <span className="text-sm">Moderate Activity (25-50%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-12 rounded bg-yellow-500/40" />
                <span className="text-sm">High Activity (50-75%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-12 rounded bg-red-500/60" />
                <span className="text-sm">Very High Activity (75-100%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hotspot Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Hotspot</p>
                <p className="text-lg font-semibold">Center Display Area</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peak Activity Time</p>
                <p className="text-lg font-semibold">5:30 PM - 6:00 PM</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coverage</p>
                <p className="text-lg font-semibold">87% of Zone</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
