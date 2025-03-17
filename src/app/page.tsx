"use client";

import React from "react";
import SearchBar from "@/components/searchBar/searchBar";
import Background from "@/components/background/background";
import Cards from "@/components/cards/cards";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <main className="flex flex-col min-h-screen w-screen gap-1">
      <Background />
      <div
        className="p-5 m-auto w-[40vh] xl:w-[100vh] lg:w-[90vh] md:w-[60vh] sm:w-[50vh]"
        key="search"
      >
        <h1 className="text-center text-[35px] xl-w-[90px] lg:text-[70px] md:text-[50px] sm:text-[40px] font-days relative">
          FILMSEEKER
        </h1>
        <h3 className="text-center text-[9px] lg:text-[15px] md:text-[13px] sm:text-[10px] mb-7 relative">
          Find any movie using the power of AI, you just have to describe the
          movie you want to find. For example:{" "}
          {`"A man is bitten by a radioactive spider"`}.
        </h3>
        <SearchBar />
        <Cards query={query} />
      </div>
    </main>
  );
}
