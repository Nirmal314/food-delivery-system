"use client";

import { markAsDone } from "@/actions/admin/orders/markasdone";
import { socket } from "@/app/socket";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const MarkAsCompleted = ({ oid }: { oid: string }) => {
  const handleMarkAsDone = async () => {
    const res = await markAsDone(oid);

    if (res.success) socket.emit("order-done", res);
    else socket.emit("order-done", "Order completed");
  };
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        toast.promise(
          new Promise((resolve, reject) => {
            handleMarkAsDone()
              .then(() => {
                resolve(`Order has been completed.`);
                // setIsDBUpdating(false);
              })
              .catch((error) => {
                reject(error);
                // setIsDBUpdating(false);
              });
          }),
          {
            loading: `Marking as done...`,
            success: `Order has been marked as done.`,
            error: `Something went wrong, Please try again.`,
          }
        );
      }}
    >
      <Check className="mr-2" />
      Mark as completed
    </Button>
  );
};

export default MarkAsCompleted;
