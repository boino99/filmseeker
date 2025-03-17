"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query) {
      router.push(`/?query=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 lg:flex-row">
      <Input
        type="text"
        placeholder="Describe the movie..."
        className=" border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        color="secondary"
        className="w-60 m-auto"
        title="buscar"
        onPress={handleSearch}
      >
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
