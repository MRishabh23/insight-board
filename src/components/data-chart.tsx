import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartConfig = {
  date: {
    label: "date",
  },
} satisfies ChartConfig;

export default function ChartComponent({ chartData, carriers }: { chartData: any; carriers: string[] }) {
  const [timeRange, setTimeRange] = React.useState("7d");

  const filteredData = chartData.filter((item: any) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 7;
    if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "60d") {
      daysToSubtract = 60;
    } else if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "all") {
      return true;
    }

    now.setDate(now.getDate() - daysToSubtract);
    const now2 = now.toISOString().split("T")[0];
    const newDate = new Date(now2);
    return date >= newDate;
  });

  const updatedCarrierList = carriers.map((item, index) => {
    if (index === 0) {
      return { carrier: item, color: "#8884d8", hide: false };
    } else if (index === 1) {
      return { carrier: item, color: "#82ca9d", hide: false };
    } else if (index === 2) {
      return { carrier: item, color: "#ffca3a", hide: false };
    }
  });

  const [hidden, setHidden] = React.useState<any>(updatedCarrierList);

  return (
    <Card className="mt-5">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-xl">Latency</CardTitle>
          <CardDescription>Showing latency in hours for each day.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="60d" className="rounded-lg">
              Last 2 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <YAxis ticks={[0, 4, 8, 12, 16]} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <ChartLegend
              onClick={({ dataKey }) => {
                const k = dataKey?.toString();
                const newHidden = hidden.map((item: any) => {
                  if (item?.carrier === k) {
                    return { ...item, hide: !item?.hide };
                  }
                  return item;
                });
                setHidden(newHidden);
              }}
            />

            {hidden.map((item: any) => {
              return (
                <Line 
                  type="monotone"
                  dataKey={item?.carrier}
                  stroke={item?.color}
                  strokeWidth={2}
                  dot={true}
                  key={item?.carrier}
                  hide={item?.hide}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
