"use client";
import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";

const YourAppLayout = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY!}
      userId={session?.user.id!}
    >
      {/* <KnockFeedProvider feedId="211cbdd0-7a3d-4448-bb99-a0b28af3746a"> */}
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID!}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default YourAppLayout;
