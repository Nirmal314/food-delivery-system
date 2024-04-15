"use client";

import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

// We'll write this next
import NotificationToaster from "./NotificationToaster";
import { useSession } from "next-auth/react";

const NotificationToastProducer = () => {
  // An example of fetching the current authenticated user
  const { data: session } = useSession();

  return (
    <KnockProvider
      userId={session?.user.id!}
      apiKey="pk_test_xGwhc97ykiFO7N3hctDDY43LlrSNccz_lvqX1gkTMJU"
    >
      <KnockFeedProvider feedId="31043d15-bb9b-4adb-9ee9-2e556fd18381">
        {/* <KnockFeedProvider feedId="211cbdd0-7a3d-4448-bb99-a0b28af3746a"> */}
        <NotificationToaster />
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default NotificationToastProducer;
