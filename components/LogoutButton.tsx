import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and will need to log in
              again to access your account features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <Link href={"/api/auth/signout"}> */}
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => signOut()}
            >
              <AlertDialogAction>Yes</AlertDialogAction>
            </Button>
            {/* </Link> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutButton;
