import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
  table: any;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const PageNavigation = ({ table, setCurrentPage, currentPage }: Props) => {
  return (
    <div className="py-5">
      <div className="border flex items-center justify-between w-[9rem] rounded-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            table.previousPage();
            setCurrentPage(currentPage - 1);
          }}
          disabled={!table.getCanPreviousPage()}
          className="rounded-r-none border-r"
        >
          <ChevronLeftIcon />
        </Button>
        <div>{currentPage}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            table.nextPage();
            setCurrentPage(currentPage + 1);
          }}
          disabled={!table.getCanNextPage()}
          className="rounded-l-none border-l"
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default PageNavigation;
