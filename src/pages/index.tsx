"use client";
import SearchBox from "@/components/atoms/SearchBox";
import { Title } from "@/components/ui/Title";
import React from "react";

function Page() {
  return (
    <div className="font-outfit flex flex-col items-center justify-center space-y-10 mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8">
      <SearchBox />
    </div>
  );
}

export default Page;
