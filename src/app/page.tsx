import React from "react";
import SearchBar from "@/components/searchBar/searchBar";
import Background from "@/components/background/background";
import Cards from "@/components/cards/cards";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <main className="flex flex-col h-screen w-screen gap-1">
      <Background />
      <div className="m-auto w-[40vh] xl:w-[100vh] lg:w-[90vh] md:w-[60vh] sm:w-[50vh]">
        <h1 className="text-center text-[35px] xl-w-[90px] lg:text-[70px] md:text-[50px] sm:text-[40px] font-days relative">
          FILMSEEKER
        </h1>
        <h3 className="text-center text-[9px] lg:text-[15px] md:text-[13px] sm:text-[10px] mb-7 relative">
          Find any movie using the power of AI, you just have to describe the
          movie you want to find. For example:{" "}
          {`"A man is bitten by a
          radioactive spider"`}
          .
        </h3>
        <SearchBar />
      </div>
      {searchParams?.query && <Cards searchParams={searchParams} />}
    </main>
  );
}
