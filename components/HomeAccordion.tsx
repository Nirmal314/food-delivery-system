import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HomeAccordion = ({ className }: any) => {
  return (
    <>
      <Accordion type="single" collapsible className={cn("w-full", className)}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Popular restaurant types near me</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>
                <Link href="/" className="hover:underline">
                  Bakeries near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Bars near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Beverage Shops near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Bhojanalya near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Cafés near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Casual Dining near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Clubs near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Cocktail Bars near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Confectioneries near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Dessert Parlors near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Dhabas near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Fine Dining near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Food Courts near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Food Trucks near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Irani Cafes near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kiosks near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Lounges near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Microbreweries near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Paan Shop near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Pubs near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Quick Bites near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Shacks near me
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Sweet Shops near me
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Top Restaurant Chains</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>
                <Link href="/" className="hover:underline">
                  Bikanervala
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Biryani Blues
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Burger King
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Domino's
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Dunkin' Donuts
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  KFC
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Krispy Kreme
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  McDonald's
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Pizza Hut
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  WOW! Momo
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Cities We Deliver To</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>
                <Link href="/" className="hover:underline">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kolkata
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Pune
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Chennai
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Lucknow
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kochi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Jaipur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Ahmedabad
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Chandigarh
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Goa
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Indore
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Gangtok
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Nashik
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Ooty
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Shimla
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Ludhiana
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Guwahati
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Amritsar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kanpur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Allahabad
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Aurangabad
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Bhopal
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Ranchi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Visakhapatnam
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Bhubaneswar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Coimbatore
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Mangalore
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Vadodara
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Nagpur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Agra
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Dehradun
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Mysore
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Puducherry
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Surat
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Varanasi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Patna
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Udaipur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Srinagar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Khajuraho
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Neemrana
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Cuttack
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Trivandrum
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Haridwar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Leh
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Pushkar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Rajkot
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Madurai
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kozhikode
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Alappuzha
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Thrissur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Manipal
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Vijayawada
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Jodhpur
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kota
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Ajmer
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Mussoorie
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Rishikesh
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Jalandhar
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Jammu
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Manali
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Dharamshala
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default HomeAccordion;
