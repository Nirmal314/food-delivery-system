import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const HomeAccordion = () => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Popular restaurant types near me</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-wrap space-x-3">
              <li>
                <Link href="/">Bakeries near me</Link>
              </li>
              <li>
                <Link href="/">Bars near me</Link>
              </li>
              <li>
                <Link href="/">Beverage Shops near me</Link>
              </li>
              <li>
                <Link href="/">Bhojanalya near me</Link>
              </li>
              <li>
                <Link href="/">Cafés near me</Link>
              </li>
              <li>
                <Link href="/">Casual Dining near me</Link>
              </li>
              <li>
                <Link href="/">Clubs near me</Link>
              </li>
              <li>
                <Link href="/">Cocktail Bars near me</Link>
              </li>
              <li>
                <Link href="/">Confectioneries near me</Link>
              </li>
              <li>
                <Link href="/">Dessert Parlors near me</Link>
              </li>
              <li>
                <Link href="/">Dhabas near me</Link>
              </li>
              <li>
                <Link href="/">Fine Dining near me</Link>
              </li>
              <li>
                <Link href="/">Food Courts near me</Link>
              </li>
              <li>
                <Link href="/">Food Trucks near me</Link>
              </li>
              <li>
                <Link href="/">Irani Cafes near me</Link>
              </li>
              <li>
                <Link href="/">Kiosks near me</Link>
              </li>
              <li>
                <Link href="/">Lounges near me</Link>
              </li>
              <li>
                <Link href="/">Microbreweries near me</Link>
              </li>
              <li>
                <Link href="/">Paan Shop near me</Link>
              </li>
              <li>
                <Link href="/">Pubs near me</Link>
              </li>
              <li>
                <Link href="/">Quick Bites near me</Link>
              </li>
              <li>
                <Link href="/">Shacks near me</Link>
              </li>
              <li>
                <Link href="/">Sweet Shops near me</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Top Restaurant Chains</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Cities We Deliver To</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default HomeAccordion;
