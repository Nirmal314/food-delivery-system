import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Mail, MapPinIcon, PhoneCall } from "lucide-react";
import MarkAsCompleted from "./MarkAsCompleted";

export type ProcessingOrder = {
  id: string;
  createdAt: Date;
  totalAmount: number;
  cart: {
    items: {
      menuItem: {
        name: string;
        price: number;
      };
      quantity: number;
    }[];
  };
  user: {
    address: string | null;
    contactNumber: string | null;
    email: string | null;
    image: string | null;
    name: string | null;
  };
};

const ProcessingOrder = ({ order }: { order: ProcessingOrder }) => {
  return (
    <>
      <Card className="overflow-hidden rounded-lg shadow-lg flex flex-col justify-between">
        <CardHeader className="bg-white p-4 h-28">
          <CardTitle>
            <span className="text-xl truncate bg-gradient-to-r from-[#16a34a] to-[#21c462] text-transparent bg-clip-text">
              Order {order.id}
            </span>
          </CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className="text-gray-600 mt-4 text-sm">
              {order.createdAt.toDateString()}
            </CardDescription>
            <CardDescription className="text-gray-600 mt-4 text-sm">
              <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(Number(order.totalAmount.toFixed(2)))}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <div className="space-y-4 p-6">
          <Separator />
          {order.cart.items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium">{item.menuItem.name}</h3>
                  <p>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(Number(item.menuItem.price.toFixed(2)))}{" "}
                    x {item.quantity}
                  </p>
                </div>
                <div className="text-md font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    Number(item.menuItem.price) * Number(item.quantity)
                  )}
                </div>
              </div>

              <Separator className="my-2" />
            </div>
          ))}
        </div>
        <div className="p-6">
          <CardTitle className="mt-2">
            <span className="text-lg bg-gradient-to-r from-[#16a34a] to-[#21c462] text-transparent bg-clip-text">
              Ordered by{" "}
              <span className="bg-primary px-1.5 py-0.5 text-white">
                {order.user.name}
              </span>
            </span>
          </CardTitle>
          <div className="flex flex-col justify-start items-start space-y-2 p-2 rounded-lg bg-white">
            <p className="text-sm flex">
              <Mail className="mr-2" /> {order.user.email}
            </p>
            <p className="text-sm flex">
              <PhoneCall className="mr-2" /> {order.user.contactNumber}
            </p>

            <p className="text-sm flex">
              <MapPinIcon className="mr-2" /> {order.user.address}
            </p>
            <MarkAsCompleted oid={order.id} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProcessingOrder;
