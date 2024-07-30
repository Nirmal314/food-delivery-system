import { db } from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";
import { auth } from "@/auth";
import { DataTable } from "./data-table";

type PageProps = {
  params: {
    oid: string;
  };
};

const getVariant = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.COMPLETED:
      return "default";
    case OrderStatus.CANCELLED:
      return "destructive";
    case OrderStatus.PENDING:
      return "secondary";
    case OrderStatus.PROCESSING:
      return "outline";
    default:
      return null;
  }
};

const OrderDetails = async ({ params: { oid } }: PageProps) => {
  const session = await auth();
  const order = await db.order.findUnique({
    where: {
      id: oid,
    },
    select: {
      cartId: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      cart: {
        select: {
          isActive: true,
          items: {
            select: {
              menuItem: {
                select: {
                  name: true,
                  price: true,
                  image: true,
                  description: true,
                },
              },
              quantity: true,
            },
          },
          restaurant: {
            select: {
              name: true,
              phone: true,
              address: true,
              cuisine: true,
            },
          },
        },
      },
    },
  });

  const orderedItems =
    order?.cart?.items?.map((item) => ({
      name: item.menuItem.name,
      price: item.menuItem.price,
      image: item.menuItem.image,
      description: item.menuItem.description,
      quantity: item.quantity,
    })) || [];

  return (
    <>
      <div className="flex flex-col w-full h-screen justify-start items-center space-y-4">
        <p className="text-4xl text-primary font-bold">Order Details</p>
        <Card className="w-3/4 mt-8 mx-auto shadow-md rounded-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold mb-4">
                      Order Information
                    </h2>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Status:</span>
                      <Badge
                        variant={getVariant(order?.status!)}
                        className="px-2 py-1 rounded-md font-bold"
                      >
                        {order?.status}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Amount:</span>
                      <span>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(Number(order?.totalAmount))}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Ordered on:</span>
                      <span>
                        {new Date(order?.createdAt!).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Delivery address:</span>
                      <span>{session?.user.address}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-4">
                      Restuarant Information
                    </h2>
                    <p className="font-bold">
                      Name:{" "}
                      <span className="font-normal">
                        {order?.cart.restaurant.name}
                      </span>
                    </p>
                    <p className="font-bold">
                      Cuisine:{" "}
                      <span className="font-normal">
                        {order?.cart.restaurant.cuisine}
                      </span>
                    </p>
                    <p>
                      {" "}
                      <span className="font-bold">Contact number: </span>{" "}
                      {order?.cart.restaurant.phone}
                    </p>
                    <p>
                      {" "}
                      <span className="font-bold">
                        Restaurant address:{" "}
                      </span>{" "}
                      {order?.cart.restaurant.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l pl-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Subtotal:</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(Number(order?.totalAmount))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery:</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(Number(order?.totalAmount) + 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <DataTable columns={columns} data={orderedItems} />
      </div>
    </>
  );
};

export default OrderDetails;
