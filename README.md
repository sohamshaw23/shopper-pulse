# 🛍️ Shopper Pulse

> **Retail behaviour analytics dashboard — turn window shoppers into buyers.**

Shopper Pulse is the frontend dashboard for **LightHouse 💡**, a retail behaviour analytics system that goes beyond basic foot traffic counts to reveal *what customers are actually doing* inside your store. Built with React, TypeScript, and Recharts, it gives store managers real-time, actionable insights across every zone.

---

## ✨ Features

| Page | Description |
|---|---|
| **Overview** | High-level KPIs — total visitors, engagement rate, dwell time, conversion |
| **Zone Analytics** | Per-zone breakdown of traffic, dwell time, and engagement |
| **Heatmap** | Visual engagement intensity across store zones |
| **Speed Analysis** | Customer walking speed distribution — differentiate browsers from buyers |
| **Gaze Detection** | Track which products and displays are capturing visual attention |
| **Dwell Time** | Measure how long customers linger in each zone |
| **Customer Journey** | Visualise the most common paths customers take through the store |
| **Campaigns** | Before/after campaign impact on traffic, dwell, and conversions |
| **Alerts** | Real-time notifications when zones go hot, cold, or cross thresholds |
| **Reports** | Weekly performance summaries across all zones and metrics |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/sohamshaw23/shopper-pulse.git
cd shopper-pulse

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── KPICard.tsx       # Reusable metric card component
│   ├── Navbar.tsx        # Top navigation bar with theme toggle
│   └── Sidebar.tsx       # Collapsible sidebar navigation
├── data/
│   └── mockData.ts       # Mock data and TypeScript interfaces
├── hooks/
│   ├── use-mobile.tsx    # Mobile breakpoint hook
│   └── use-toast.ts      # Toast notification hook
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
└── pages/
    ├── Index.tsx          # Root layout — sidebar + page switcher
    ├── Overview.tsx
    ├── ZoneAnalytics.tsx
    ├── Heatmap.tsx
    ├── SpeedAnalysis.tsx
    ├── GazeDetection.tsx
    ├── DwellTime.tsx
    ├── CustomerJourney.tsx
    ├── Campaigns.tsx
    ├── Alerts.tsx
    └── Reports.tsx
```

---

## 🧠 The Problem We're Solving

Traditional retail analytics only count foot traffic — they tell you *how many* people entered, but nothing about what happened next.

**Shopper Pulse tracks:**

- 👁️ **Gaze** — are customers actually looking at your displays?
- 🚶 **Speed** — are they browsing or just passing through?
- ⏱️ **Dwell Time** — where do they linger? Where do they rush?
- 🗺️ **Journey** — what path do they take from entrance to exit?
- 📍 **Zones** — which sections drive engagement vs dead zones?

Together, these signals let retailers make smarter decisions about layout, product placement, staffing, and campaign spend.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | Component library (Radix UI) |
| [Recharts](https://recharts.org) | Charts and data visualisation |
| [TanStack Query](https://tanstack.com/query) | Data fetching & caching |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form validation |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark / light mode |
| [Lucide React](https://lucide.dev) | Icon library |

---

## 🎨 Dark Mode

Shopper Pulse supports dark and light themes out of the box. The theme is auto-detected from your system preference and can be toggled via the navbar.

---

## 📊 Data

Currently all data is mocked in `src/data/mockData.ts`. The interfaces are designed to be swapped out for a real backend — each page consumes typed data that maps directly to the analytics events your tracking system would emit.

**Key interfaces:**

```typescript
Zone           // Per-zone visitor & engagement metrics
GazeDataPoint  // Product-level gaze hits, duration, conversion
DwellDataPoint // Short / medium / long visit breakdown per zone
JourneyPath    // Customer path sequences with conversion rates
Campaign       // Before/after campaign impact metrics
Alert          // Threshold breach notifications
```

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build locally
npm run lint         # ESLint
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is private. All rights reserved.
