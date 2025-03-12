"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const redirect = useRouter();

  const handleSearch = async () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    redirect.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-row gap-5">
      <Input
        type="text"
        placeholder="Describe the movie..."
        // defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Button
        color="secondary"
        className="w-60 m-auto"
        title={"buscar"}
        onClick={() => handleSearch()}
      >
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
