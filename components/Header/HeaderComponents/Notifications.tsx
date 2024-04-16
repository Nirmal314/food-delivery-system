"use client";
import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";

const Notifications = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <KnockProvider
      apiKey="pk_test_xGwhc97ykiFO7N3hctDDY43LlrSNccz_lvqX1gkTMJU"
      userId={session?.user.id!}
    >
      {/* <KnockFeedProvider feedId="211cbdd0-7a3d-4448-bb99-a0b28af3746a"> */}
      <KnockFeedProvider feedId="31043d15-bb9b-4adb-9ee9-2e556fd18381">
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            placement="bottom-start"
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default Notifications;
