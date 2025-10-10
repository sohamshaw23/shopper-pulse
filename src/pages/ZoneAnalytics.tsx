import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { zones, getZoneBadgeColor, formatDwellTime } from "@/data/mockData";

export const ZoneAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof zones[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (key: keyof typeof zones[0]) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const filteredZones = zones
    .filter((zone) =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  const dwellTimeChartData = zones.map((zone) => ({
    name: zone.name.split(" - ")[1] || zone.name,
    dwellTime: zone.avgDwellTime,
  }));

  const handleExport = () => {
    const csv = [
      ["Zone", "Total Visitors", "Avg Dwell Time", "Unique Visitors", "Engagement Rate"],
      ...zones.map((z) => [
        z.name,
        z.totalVisitors,
        formatDwellTime(z.avgDwellTime),
        z.uniqueVisitors,
        `${z.engagementRate}%`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zone-analytics.csv";
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Zone Analytics</h2>
          <p className="text-muted-foreground">Detailed metrics for each zone</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Dwell Time Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Average Dwell Time by Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dwellTimeChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="number"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "Seconds", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="dwellTime" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Zone Metrics Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Zone Metrics</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search zones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("totalVisitors")}
                  >
                    Total Visitors {sortKey === "totalVisitors" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("avgDwellTime")}
                  >
                    Avg Dwell Time {sortKey === "avgDwellTime" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("uniqueVisitors")}
                  >
                    Unique Visitors {sortKey === "uniqueVisitors" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("engagementRate")}
                  >
                    Engagement Rate {sortKey === "engagementRate" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell>
                      <Badge className={getZoneBadgeColor(zone.color)}>
                        {zone.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{zone.totalVisitors.toLocaleString()}</TableCell>
                    <TableCell>{formatDwellTime(zone.avgDwellTime)}</TableCell>
                    <TableCell>{zone.uniqueVisitors.toLocaleString()}</TableCell>
                    <TableCell>{zone.engagementRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
