"use client";

import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import notFound from "../../../public/not-found.jpg";
import { getServices } from "../streaming/route";

// async function getCover(title: string, year: string) {
//   const cover = await getServices(title);
//   let image = "";

//   if (cover[0]?.releaseYear == year) {
//     image = cover[0]?.imageSet?.verticalPoster?.w240;
//   } else if (cover[1]?.releaseYear == year) {
//     image = cover[1]?.imageSet?.verticalPoster?.w240;
//   } else {
//     image = "";
//   }

//   return image;
// }

// async function getStreaming(title: string, year: string) {
//   let streaming = await getServices(title);
//   let data = streaming.map((data: any) => {
//     if (data?.releaseYear == year) {
//       return data?.streamingOptions?.us;
//     }
//   });
//   return data
//     ?.filter((data: any) => data?.type === "subscription")
//     ?.map((data: any) => data.service.name);
// }

// async function getID(name: string, year: string) {
//   let id = await getServices(name);
//   let movieID = "";

//   if (id[0]?.releaseYear == year) {
//     movieID = id[0]?.imdbId;
//   } else {
//     movieID = id[1]?.imdbId;
//   }

//   return movieID;
// }

// function getCover(name: string, year: string) {
//   let cover = getServices(name);
//   let image = "";

//   if (cover[0]?.releaseYear == year) {
//     image = cover[0]?.imageSet?.verticalPoster?.w240;
//   } else if (cover[1]?.releaseYear == year) {
//     image = cover[1]?.imageSet?.verticalPoster?.w240;
//   } else {
//     image = notFound.src;
//   }

//   return image;
// }

// function getStreaming(name: string) {
//   let streaming = getServices(name);
//   let services: any[] = [];
//   services = [];
//   streaming[0]?.streamingOptions?.us?.map(async (data: any) => {
//     if (data.type == "subscription") {
//       services.push(
//         <p
//           key={data?.availableSince}
//           className="mb-3 font-normal text-gray-500 dark:text-gray-400"
//         >
//           {data?.service?.name}
//         </p>
//       );
//     }
//   });

//   return services;
// }

function GetData(query: any) {}

const Cards = ({ query }: { query: string }) => {
  const [movies, setMovies] = useState<
    { title: string; year: string; cover: string; streaming: [] }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="grid w-full p-10 gap-6 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 z-0">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="relative flex justify-start bg-black/30 backdrop-blur-none rounded-lg shadow-lg flex-col  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 scale-10 lg:scale-100 sm:scale-30 hover:scale-110 hover:bg-black/90 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg max-h-full"
                src={movie.cover}
                alt="movie-cover"
              />
              <div className="flex flex-col justify-start p-4 leading-normal">
                <h3 className="text-white text-xl">
                  {`${movie.title} (${movie.year})`}
                </h3>
                <p className="mb-3 font-bold text-gray-400 dark:text-gray-400">
                  Streaming options
                </p>
                {movie.streaming.length > 0 ? (
                  <ul
                    key={index + movie.title}
                    className="block mb-3 font-normal text-gray-500 dark:text-gray-400"
                  >
                    {movie.streaming
                      .filter(
                        (item, index, self) => self.indexOf(item) === index
                      )
                      .map((streaming, index) => (
                        <li key={index}>{streaming}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No disponible</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cards;
