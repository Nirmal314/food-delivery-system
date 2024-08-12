"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import { DailySalesData } from "@/app/(admin)/dashboard/page";

const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

type Data = { data: DailySalesData };

export default function SalesLineChart({ data }: Data) {
  const processedData = data.map((item) => ({
    date: item.date,
    totalSales: item.totalSales ?? 0,
  }));

  // const totalSalesArray = processedData.map((item) => item.totalSales);

  // const avgYValue =
  //   totalSalesArray.reduce((sum, value) => sum + value, 0) /
  //   totalSalesArray.length;

  // // const minYValue = Math.min(...processedData.map((item) => item.totalSales));
  // const minYValue = 0;
  // const maxRawValue =
  //   (Math.max(...processedData.map((item) => item.totalSales)) || 100) +
  //   avgYValue / 3;

  // const maxYValue = Math.ceil(maxRawValue / 10) * 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>Sales over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis
              // domain={[minYValue, maxYValue]}
              tickFormatter={(value) => currencyFormatter.format(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalSales"
              type="natural"
              stroke="var(--color-totalSales)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing daily sales trends
        </div>
      </CardFooter>
    </Card>
  );
}
