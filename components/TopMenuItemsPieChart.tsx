"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function TopMenuItemsPieChart({
  data,
}: {
  data: {
    menuItemName: string;
    quantitySold: number | null;
  }[];
}) {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
    "hsl(var(--chart-9))",
    "hsl(var(--chart-10))",
  ];

  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Quantity Sold",
    },
  };

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top-Selling Food Items</CardTitle>
        <CardDescription>Sales distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="quantitySold"
              nameKey="menuItemName"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing top-selling food items distribution
        </div>
      </CardFooter>
    </Card>
  );
}
