import { useState, useEffect, useRef } from "react";
import { Play, Pause, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface HeatCell {
  intensity: number;
  visitors: number;
}

interface HotspotData {
  location: string;
  coordinates: string;
  intensity: number;
}

const GRID_COLS = 10;
const GRID_ROWS = 8;

// Generate zone-specific heatmap patterns
const generateHeatmapForZone = (zoneName: string, timeOfDay: number = 14): HeatCell[][] => {
  const grid: HeatCell[][] = [];
  const timeFactor = Math.sin((timeOfDay - 9) / 6 * Math.PI); // Peak at midday
  
  for (let row = 0; row < GRID_ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      let intensity = 0;
      
      switch (zoneName) {
        case "zone-a": // Entrance - dispersed near entrance
          intensity = col < 3 ? Math.random() * 60 + 20 : Math.random() * 30;
          break;
        case "zone-b": // Clothing - multiple medium hotspots
          const isHotspot = (row === 2 && col === 3) || (row === 5 && col === 7) || (row === 3 && col === 5);
          intensity = isHotspot ? Math.random() * 40 + 50 : Math.random() * 40 + 10;
          break;
        case "zone-c": // Electronics - concentrated high-intensity
          const centerDist = Math.sqrt(Math.pow(row - 4, 2) + Math.pow(col - 5, 2));
          intensity = Math.max(0, 90 - centerDist * 15 + Math.random() * 20);
          break;
        case "zone-d": // Checkout - linear queue patterns
          intensity = col > 5 && row > 2 && row < 6 ? Math.random() * 50 + 40 : Math.random() * 20;
          break;
        case "zone-e": // Food Court - clustered table areas
          const isTable = (row % 2 === 0 && col % 3 === 0) || (row === 3 && col === 8);
          intensity = isTable ? Math.random() * 35 + 55 : Math.random() * 25;
          break;
        default:
          intensity = Math.random() * 100;
      }
      
      intensity = Math.min(100, intensity * (0.8 + timeFactor * 0.4));
      const visitors = Math.floor(intensity / 10 * (5 + Math.random() * 8));
      
      grid[row][col] = { intensity, visitors };
    }
  }
  
  return grid;
};

const getHeatColor = (intensity: number): string => {
  if (intensity < 20) return "bg-blue-500";
  if (intensity < 40) return "bg-cyan-500";
  if (intensity < 60) return "bg-yellow-500";
  if (intensity < 80) return "bg-orange-500";
  return "bg-red-500";
};

const getHeatOpacity = (intensity: number): string => {
  if (intensity < 20) return "opacity-20";
  if (intensity < 40) return "opacity-40";
  if (intensity < 60) return "opacity-60";
  if (intensity < 80) return "opacity-75";
  return "opacity-90";
};

const calculateHotspots = (grid: HeatCell[][]): HotspotData[] => {
  const hotspots: { row: number; col: number; intensity: number }[] = [];
  
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell.intensity > 70) {
        hotspots.push({ row: rowIdx, col: colIdx, intensity: cell.intensity });
      }
    });
  });
  
  return hotspots
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 3)
    .map((spot, idx) => ({
      location: `Area ${String.fromCharCode(65 + idx)}`,
      coordinates: `[${spot.col}, ${spot.row}]`,
      intensity: Math.round(spot.intensity),
    }));
};

const getZoneLabel = (zoneId: string): string => {
  const labels: Record<string, string> = {
    "zone-a": "Zone A - Entrance",
    "zone-b": "Zone B - Clothing",
    "zone-c": "Zone C - Electronics",
    "zone-d": "Zone D - Checkout",
    "zone-e": "Zone E - Food Court",
  };
  return labels[zoneId] || zoneId;
};

export const Heatmap = () => {
  const [selectedZone, setSelectedZone] = useState("zone-c");
  const [heatmapData, setHeatmapData] = useState<HeatCell[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(14); // 2 PM
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize heatmap
  useEffect(() => {
    setHeatmapData(generateHeatmapForZone(selectedZone, currentTime));
  }, [selectedZone, currentTime]);

  // Handle playback
  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5;
          if (next > 21) {
            setIsPlaying(false);
            return 9;
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const handleZoneChange = (zone: string) => {
    setSelectedZone(zone);
    toast.success(`Switched to ${getZoneLabel(zone)}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["video/mp4", "video/avi", "video/mov", "video/quicktime"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a video file (MP4, AVI, MOV).");
      return;
    }

    // Validate file size (500MB max)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 500MB.");
      return;
    }

    // Simulate upload
    setIsUploading(true);
    toast.info("Uploading video...");

    setTimeout(() => {
      setUploadedFile(file.name);
      setIsUploading(false);
      setHeatmapData(generateHeatmapForZone(selectedZone, currentTime));
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Video uploaded successfully: {file.name}</span>
        </div>
      );
    }, 2000);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (hour: number): string => {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const hotspots = calculateHotspots(heatmapData);
  const totalCells = GRID_COLS * GRID_ROWS;
  const activeCells = heatmapData.flat().filter((cell) => cell.intensity > 30).length;
  const coverage = Math.round((activeCells / totalCells) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Heatmap Visualization</h2>
          <p className="text-muted-foreground">Track customer movement patterns</p>
        </div>
        <Badge variant={isLiveMode ? "default" : "secondary"}>
          {isLiveMode ? "Live Feed" : "Recorded"}
        </Badge>
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
              <Select value={selectedZone} onValueChange={handleZoneChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zone-a">Zone A - Entrance</SelectItem>
                  <SelectItem value="zone-b">Zone B - Clothing</SelectItem>
                  <SelectItem value="zone-c">Zone C - Electronics</SelectItem>
                  <SelectItem value="zone-d">Zone D - Checkout</SelectItem>
                  <SelectItem value="zone-e">Zone E - Food Court</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Upload Video</label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {isUploading ? "Uploading..." : "Upload Video"}
                </Button>
              </div>
              {uploadedFile && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-success" />
                  {uploadedFile}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Heat Intensity Map</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Current Time:</span>
              <Badge variant="outline">{formatTime(currentTime)}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Heatmap Grid */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/20 p-4">
              <div
                className="grid h-full w-full gap-1"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                }}
              >
                {heatmapData.map((row, rowIdx) =>
                  row.map((cell, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className={`relative rounded transition-all duration-500 ${getHeatColor(
                        cell.intensity
                      )} ${getHeatOpacity(cell.intensity)} cursor-pointer hover:scale-110 hover:z-10`}
                      onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx && (
                        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card p-2 text-xs shadow-lg border">
                          <p className="font-semibold">
                            Position: [{colIdx}, {rowIdx}]
                          </p>
                          <p>Intensity: {Math.round(cell.intensity)}%</p>
                          <p>Visitors: {cell.visitors}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Color Legend Bar */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Activity Level</p>
              <div className="relative h-8 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="flex-1 bg-blue-500 opacity-20" />
                  <div className="flex-1 bg-cyan-500 opacity-40" />
                  <div className="flex-1 bg-yellow-500 opacity-60" />
                  <div className="flex-1 bg-orange-500 opacity-75" />
                  <div className="flex-1 bg-red-500 opacity-90" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-between px-2 text-xs text-foreground font-medium">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={isUploading}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <div className="flex-1">
                  <input
                    type="range"
                    min="9"
                    max="21"
                    step="0.5"
                    value={currentTime}
                    onChange={(e) => {
                      setCurrentTime(parseFloat(e.target.value));
                      setIsPlaying(false);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>9 AM</span>
                    <span>3 PM</span>
                    <span>9 PM</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={playbackSpeed === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(1)}
                  >
                    1x
                  </Button>
                  <Button
                    variant={playbackSpeed === 2 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(2)}
                  >
                    2x
                  </Button>
                  <Button
                    variant={playbackSpeed === 4 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(4)}
                  >
                    4x
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiveMode(!isLiveMode)}
                >
                  {isLiveMode ? "Switch to Recorded" : "Switch to Live"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hotspot Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Top 3 Hotspots</p>
                {hotspots.length > 0 ? (
                  <div className="space-y-2">
                    {hotspots.map((spot, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-semibold">{spot.location}</p>
                          <p className="text-xs text-muted-foreground">Grid: {spot.coordinates}</p>
                        </div>
                        <Badge variant="outline">{spot.intensity}%</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No significant hotspots detected</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zone Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Zone</p>
                <p className="text-lg font-semibold">{getZoneLabel(selectedZone)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peak Activity Time</p>
                <p className="text-lg font-semibold">
                  {currentTime >= 17 && currentTime <= 19 ? formatTime(currentTime) : "5:30 PM - 6:30 PM"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coverage</p>
                <p className="text-lg font-semibold">{coverage}% of Zone</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
