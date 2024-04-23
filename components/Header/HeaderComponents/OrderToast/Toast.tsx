"use client";

import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

import NotificationToaster from "./NotificationToaster";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const NotificationToastProducer = () => {
  const { data: session } = useSession();

  return (
    <KnockProvider
      userId={session?.user.id!}
      apiKey="pk_test_xGwhc97ykiFO7N3hctDDY43LlrSNccz_lvqX1gkTMJU"
    >
      <KnockFeedProvider feedId="31043d15-bb9b-4adb-9ee9-2e556fd18381">
        <NotificationToaster />
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default NotificationToastProducer;
