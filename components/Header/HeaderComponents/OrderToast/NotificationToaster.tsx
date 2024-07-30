"use client";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useKnockFeed } from "@knocklabs/react";
import { toast } from "sonner";
import { mutate } from "swr";

const NotificationToaster = () => {
  const { feedClient } = useKnockFeed();
  const onNotificationsReceived = ({ items }: { items: any }) => {
    toast(items[0].blocks[0].rendered, { id: items[0].id });

    feedClient.markAsSeen(items);
  };

  useEffect(() => {
    feedClient.on("items.received.realtime", onNotificationsReceived);

    mutate("/orders");

    // ! Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient]);

  return <Toaster />;
};

export default NotificationToaster;
