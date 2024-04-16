"use client";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useKnockFeed } from "@knocklabs/react";
import { toast } from "sonner";

const NotificationToaster = () => {
  const { feedClient } = useKnockFeed();

  const onNotificationsReceived = ({ items }: { items: any }) => {
    // ? (note here that we can receive > 1 items in a batch)
    items.forEach((notification: any) => {
      toast(notification.blocks[0].rendered, { id: notification.id });
    });

    feedClient.markAsSeen(items);
  };

  useEffect(() => {
    feedClient.on("items.received.realtime", onNotificationsReceived);

    // ! Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient]);

  return <Toaster />;
};

export default NotificationToaster;
