"use client";

import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

import NotificationToaster from "./NotificationToaster";
import { useSession } from "next-auth/react";

const NotificationToastProducer = () => {
  const { data: session } = useSession();

  return (
    <KnockProvider
      userId={session?.user.id!}
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY!}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID!}>
        <NotificationToaster />
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default NotificationToastProducer;
