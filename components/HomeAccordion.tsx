import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const HomeAccordion = ({ className }: any) => {
  return (
    <>
      <Accordion type="single" collapsible className={cn("w-full", className)}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Popular restaurant types near me</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>Bakeries near me</li>
              <li>Bars near me</li>
              <li>Beverage Shops near me</li>
              <li>Bhojanalya near me</li>
              <li>Cafés near me</li>
              <li>Casual Dining near me</li>
              <li>Clubs near me</li>
              <li>Cocktail Bars near me</li>
              <li>Confectioneries near me</li>
              <li>Dessert Parlors near me</li>
              <li>Dhabas near me</li>
              <li>Fine Dining near me</li>
              <li>Food Courts near me</li>
              <li>Food Trucks near me</li>
              <li>Irani Cafes near me</li>
              <li>Kiosks near me</li>
              <li>Lounges near me</li>
              <li>Microbreweries near me</li>
              <li>Paan Shop near me</li>
              <li>Pubs near me</li>
              <li>Quick Bites near me</li>
              <li>Shacks near me</li>
              <li>Sweet Shops near me</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Top Restaurant Chains</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>Bikanervala</li>
              <li>Biryani Blues</li>
              <li>Burger King</li>
              <li>Domino's</li>
              <li>Dunkin' Donuts</li>
              <li>KFC</li>
              <li>Krispy Kreme</li>
              <li>McDonald's</li>
              <li>Pizza Hut</li>
              <li>WOW! Momo</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Cities We Deliver To</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-4 gap-4">
              <li>Delhi</li>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Bengaluru</li>
              <li>Pune</li>
              <li>Hyderabad</li>
              <li>Chennai</li>
              <li>Lucknow</li>
              <li>Kochi</li>
              <li>Jaipur</li>
              <li>Ahmedabad</li>
              <li>Chandigarh</li>
              <li>Goa</li>
              <li>Indore</li>
              <li>Gangtok</li>
              <li>Nashik</li>
              <li>Ooty</li>
              <li>Shimla</li>
              <li>Ludhiana</li>
              <li>Guwahati</li>
              <li>Amritsar</li>
              <li>Kanpur</li>
              <li>Allahabad</li>
              <li>Aurangabad</li>
              <li>Bhopal</li>
              <li>Ranchi</li>
              <li>Visakhapatnam</li>
              <li>Bhubaneswar</li>
              <li>Coimbatore</li>
              <li>Mangalore</li>
              <li>Vadodara</li>
              <li>Nagpur</li>
              <li>Agra</li>
              <li>Dehradun</li>
              <li>Mysore</li>
              <li>Puducherry</li>
              <li>Surat</li>
              <li>Varanasi</li>
              <li>Patna</li>
              <li>Udaipur</li>
              <li>Srinagar</li>
              <li>Khajuraho</li>
              <li>Neemrana</li>
              <li>Cuttack</li>
              <li>Trivandrum</li>
              <li>Haridwar</li>
              <li>Leh</li>
              <li>Pushkar</li>
              <li>Rajkot</li>
              <li>Madurai</li>
              <li>Kozhikode</li>
              <li>Alappuzha</li>
              <li>Thrissur</li>
              <li>Manipal</li>
              <li>Vijayawada</li>
              <li>Jodhpur</li>
              <li>Kota</li>
              <li>Ajmer</li>
              <li>Mussoorie</li>
              <li>Rishikesh</li>
              <li>Jalandhar</li>
              <li>Jammu</li>
              <li>Manali</li>
              <li>Dharamshala</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default HomeAccordion;
