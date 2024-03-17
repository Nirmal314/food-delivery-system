import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
const AddMenuItem = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="absolute bottom-10 right-10">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Are you absolutely sure?
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddMenuItem;
