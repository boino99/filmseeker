import React from "react";
import Llama3 from "@/components/ai/llama3-connection";
import { getServices } from "@/components/api/route";
import notFound from "../../../public/not-found.jpg";

async function getID(name: string) {
  let id = await getServices(name);
  return id[0]?.imdbId;
}

async function getCover(name: string, year: string) {
  let cover = await getServices(name);
  let image = "";

  if (cover[0]?.releaseYear == year) {
    image = cover[0]?.imageSet?.verticalPoster?.w240;
  } else if (cover[1]?.releaseYear == year) {
    image = cover[1]?.imageSet?.verticalPoster?.w240;
  } else {
    image = notFound.src;
  }

  return image;
}

async function getStreaming(name: string) {
  let streaming = await getServices(name);
  let services: any[] = [];
  services = [];
  streaming[0]?.streamingOptions?.us?.map(async (data: any) => {
    if (data.type == "subscription") {
      services.push(
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {data?.service?.name}
        </p>
      );
    }
  });

  return services;
}

function Cards({ searchParams }: any) {
  async function getResults() {
    const query = searchParams?.query || "";
    try {
      let response = await Llama3(query);
      let data = await JSON.parse(response);
      return (
        <>
          {await data.results.map(async (post: any) => (
            <a
              key={await getID(post.title)}
              target="_blank"
              href={`https://www.imdb.com/es-es/title/${await getID(
                post.title
              )}`}
              className="flex items-center bg-black/30 backdrop-blur-none rounded-lg shadow-lg flex-col sm:flex-row transition delay-150 duration-300 ease-in-out hover:-translate-y-1 scale-10 lg:scale-100 sm:scale-30 hover:scale-110 hover:bg-black/90 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-50 rounded-t-lg h-96 md:w-48  md:rounded-none md:rounded-s-lg"
                src={await getCover(post.title, post.year)}
                alt="movie-cover"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
                  {post.title} {`(${post.year})`}
                </h5>
                <p className="mb-3 font-bold text-gray-300 dark:text-gray-400">
                  Streaming options
                </p>
                {await getStreaming(post.title)}
              </div>
            </a>
          ))}
        </>
      );
    } catch (error) {
      console.log(`se ha descubierto un error ${error}`);
    }
  }

  return (
    <div className="grid  w-full p-10 gap-6 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 z-0">
      {getResults()}
    </div>
  );
}

export default Cards;
