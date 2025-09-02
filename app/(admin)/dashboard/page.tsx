import { auth } from "@/auth";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import React from "react";
import ProcessingOrder from "./components/ProcessingOrder";
import TopMenuItemsPieChart from "@/components/TopMenuItemsPieChart";
import SalesLineChart from "@/components/SalesLineChart";
import OrderStatusPieChart from "@/components/OrderStatusPieChart";
import { Card } from "@/components/ui/card";

export type DailySalesData = {
  date: string;
  totalSales: number | null;
}[];

const Dashboard = async () => {
  const session = await auth();

  const processingOrders = await db.order.findMany({
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
        Order: {
          status: OrderStatus.PROCESSING,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      totalAmount: true,

      cart: {
        select: {
          items: {
            select: {
              menuItem: {
                select: {
                  name: true,
                  price: true,
                },
              },
              quantity: true,
            },
          },
        },
      },
      user: {
        select: {
          address: true,
          contactNumber: true,
          email: true,
          image: true,
          name: true,
        },
      },
    },
  });

  const dailySales = await db.order.groupBy({
    by: ["createdAt"],
    _sum: {
      totalAmount: true,
    },
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
      },
      status: OrderStatus.COMPLETED,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedData = dailySales.map((sale) => {
    const date = new Date(sale.createdAt);
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`, // MM/DD format
      totalSales: sale._sum.totalAmount,
    };
  });

  const uniqueDates = new Set();
  const uniqueData = formattedData.filter((entry) => {
    if (!uniqueDates.has(entry.date)) {
      uniqueDates.add(entry.date);
      return true;
    }
    return false;
  });

  const lineChartData: DailySalesData = uniqueData;

  const topSoldItems = await db.cartItem.groupBy({
    by: ["menuItemId"],
    _sum: {
      quantity: true,
    },
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
        isActive: false, // ! Ensure the cart represents a completed order
        Order: {
          status: OrderStatus.COMPLETED
        }
      },
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 10,
  });

  const pieChartData = await Promise.all(
    topSoldItems.map(async (item) => {
      const menuItem = await db.menuItem.findUnique({
        where: { id: item.menuItemId },
        select: { name: true },
      });

      return {
        menuItemName: menuItem?.name || "Unknown",
        quantitySold: item._sum.quantity,
      };
    })
  );

  const ordersByStatus = await db.order.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
      },
    },
  });

  const statusColors: { [key in OrderStatus]: string } = {
    [OrderStatus.PROCESSING]: "hsl(var(--chart-2))",
    [OrderStatus.COMPLETED]: "hsl(var(--chart-1))",
    [OrderStatus.CANCELLED]: "hsl(var(--chart-4))",
    [OrderStatus.PENDING]: "hsl(var(--chart-3))",
  };

  const donutPieChartData = ordersByStatus.map((item) => ({
    status: item.status,
    count: item._count.id,
    fill: statusColors[item.status] || "hsl(var(--chart-5))",
  }));

  return (
    <>
      <div className="flex w-full h-full justify-center items-center flex-col ">
        <p className="text-secondary px-2 py-1 bg-primary my-4 text-4xl font-bold">
          Current orders
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {processingOrders.map((order, index) => (
            <>
              <div key={index} className="flex justify-center">
                <ProcessingOrder order={order} />
              </div>
            </>
          ))}
        </div>

        <div className="w-full h-full flex justify-center items-center p-4">
          <Card className="w-[95%] h-full p-4 bg-primary overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
              {/* Line Chart: Takes 3/4 of the width */}
              <div className="col-span-3 flex flex-col h-full">
                <Card className="h-full">
                  <div className="flex-1">
                    <SalesLineChart data={lineChartData} />
                  </div>
                </Card>
              </div>

              {/* Stacked Pie Charts: Takes 1/4 of the width */}
              <div className="col-span-1 flex flex-col gap-4 h-full">
                <Card className="flex-1">
                  <div className="h-full">
                    <TopMenuItemsPieChart data={pieChartData} />
                  </div>
                </Card>
                <Card className="flex-1">
                  <div className="h-full">
                    <OrderStatusPieChart data={donutPieChartData} />
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
