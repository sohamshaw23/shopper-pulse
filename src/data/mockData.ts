// Mock data for the Customer Behavior Tracking System

export interface Zone {
  id: number;
  name: string;
  color: string;
  totalVisitors: number;
  avgDwellTime: number; // in seconds
  uniqueVisitors: number;
  engagementRate: number;
}

export interface TrafficDataPoint {
  time: string;
  visitors: number;
}

export interface SpeedDataPoint {
  range: string;
  count: number;
}

export const zones: Zone[] = [
  {
    id: 1,
    name: "Zone A - Entrance",
    color: "blue",
    totalVisitors: 847,
    avgDwellTime: 125,
    uniqueVisitors: 723,
    engagementRate: 34,
  },
  {
    id: 2,
    name: "Zone B - Fashion",
    color: "green",
    totalVisitors: 1234,
    avgDwellTime: 287,
    uniqueVisitors: 1089,
    engagementRate: 52,
  },
  {
    id: 3,
    name: "Zone C - Electronics",
    color: "purple",
    totalVisitors: 1876,
    avgDwellTime: 423,
    uniqueVisitors: 1654,
    engagementRate: 68,
  },
  {
    id: 4,
    name: "Zone D - Food Court",
    color: "amber",
    totalVisitors: 956,
    avgDwellTime: 512,
    uniqueVisitors: 834,
    engagementRate: 45,
  },
  {
    id: 5,
    name: "Zone E - Exit",
    color: "red",
    totalVisitors: 623,
    avgDwellTime: 78,
    uniqueVisitors: 589,
    engagementRate: 18,
  },
];

export const trafficDataHourly: TrafficDataPoint[] = [
  { time: "9 AM", visitors: 145 },
  { time: "10 AM", visitors: 289 },
  { time: "11 AM", visitors: 412 },
  { time: "12 PM", visitors: 567 },
  { time: "1 PM", visitors: 634 },
  { time: "2 PM", visitors: 578 },
  { time: "3 PM", visitors: 489 },
  { time: "4 PM", visitors: 523 },
  { time: "5 PM", visitors: 678 },
  { time: "6 PM", visitors: 734 },
  { time: "7 PM", visitors: 612 },
  { time: "8 PM", visitors: 456 },
];

export const trafficDataDaily: TrafficDataPoint[] = [
  { time: "Mon", visitors: 4234 },
  { time: "Tue", visitors: 3987 },
  { time: "Wed", visitors: 4512 },
  { time: "Thu", visitors: 4876 },
  { time: "Fri", visitors: 5634 },
  { time: "Sat", visitors: 6234 },
  { time: "Sun", visitors: 5876 },
];

export const speedDistribution: SpeedDataPoint[] = [
  { range: "0-0.5", count: 1234 },
  { range: "0.5-1.0", count: 1876 },
  { range: "1.0-1.5", count: 1423 },
  { range: "1.5-2.0", count: 867 },
  { range: "2.0+", count: 447 },
];

export const behaviorData = [
  { name: "Interested Shoppers", value: 68, description: "Speed < 1.0 m/s" },
  { name: "Passing By", value: 32, description: "Speed ≥ 1.0 m/s" },
];

export const speedTimelineData = [
  { time: "9 AM", speed: 1.4 },
  { time: "10 AM", speed: 1.2 },
  { time: "11 AM", speed: 0.9 },
  { time: "12 PM", speed: 0.7 },
  { time: "1 PM", speed: 0.8 },
  { time: "2 PM", speed: 1.1 },
  { time: "3 PM", speed: 1.3 },
  { time: "4 PM", speed: 1.0 },
  { time: "5 PM", speed: 0.8 },
  { time: "6 PM", speed: 0.9 },
  { time: "7 PM", speed: 1.2 },
  { time: "8 PM", speed: 1.5 },
];

export const getZoneBadgeColor = (color: string) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  return colors[color] || colors.blue;
};

export const formatDwellTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
