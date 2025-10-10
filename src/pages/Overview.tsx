import { useState } from "react";
import { Users, Clock, Activity, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { trafficDataHourly, trafficDataDaily } from "@/data/mockData";

export const Overview = () => {
  const [timeRange, setTimeRange] = useState<"hourly" | "daily">("hourly");
  const trafficData = timeRange === "hourly" ? trafficDataHourly : trafficDataDaily;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="text-muted-foreground">Monitor your store's real-time metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Visitors"
          value="2,847"
          icon={Users}
          trend={{ value: "12.5%", isPositive: true }}
        />
        <KPICard
          title="Average Dwell Time"
          value="4m 32s"
          icon={Clock}
          subtitle="Per visitor"
        />
        <KPICard
          title="Average Speed"
          value="1.2 m/s"
          icon={Activity}
          subtitle="Walking speed"
        />
        <KPICard
          title="Most Popular Zone"
          value="Zone C"
          icon={TrendingUp}
          subtitle="Electronics"
        />
      </div>

      {/* Traffic Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Visitor Traffic</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={timeRange === "hourly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("hourly")}
              >
                24 Hours
              </Button>
              <Button
                variant={timeRange === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("daily")}
              >
                7 Days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorVisitors)"
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
