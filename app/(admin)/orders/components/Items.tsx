import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Getter } from "@tanstack/react-table";

type ItemName = {
  menuItem: { name: string; price: number };
  quantity: number;
};
type PageProps = {
  getValue: Getter<unknown>;
};

const Items = ({ getValue }: PageProps) => {
  const items: ItemName[] = getValue() as ItemName[];
  const totalAmount = items.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>View</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle className="text-2xl font-bold mb-4">
                Ordered items
              </AlertDialogTitle>
              <AlertDialogCancel className="p-0 rounded-none border-none border-0 outline-none hover:bg-transparent">
                <X />
              </AlertDialogCancel>
            </div>
            <Separator />
            <AlertDialogDescription className="w-full text-gray-700">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">
                          {item.menuItem.name}
                        </h3>
                        <p>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(Number(item.menuItem.price.toFixed(2)))}
                          x {item.quantity}
                        </p>
                      </div>
                      <div className="text-lg font-medium">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(
                          Number(item.menuItem.price) * Number(item.quantity)
                        )}
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-xl">Total: </p>
                <p className="font-bold text-lg">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(totalAmount.toFixed(2)))}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Items;
