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
import { useRouter } from "next/navigation";
import { USER_REDIRECT_ROUTE } from "@/routes";

const LogoutButton = () => {
  const router = useRouter();
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
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => {
                signOut();
                router.push(USER_REDIRECT_ROUTE);
              }}
            >
              <AlertDialogAction>Yes</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutButton;
