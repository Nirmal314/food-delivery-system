import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Knock } from "@knocklabs/node";
import React from "react";

const KnockPage = async () => {
  const session = await auth();
  const handleKnock = async () => {
    "use server";

    try {
      const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

      const res = await knockClient.notify("orders", {
        actor: session?.user.id,
        recipients: ["clv0t4ptw0004lq0tu7fkzai5"],
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form action={handleKnock}>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
};

export default KnockPage;
