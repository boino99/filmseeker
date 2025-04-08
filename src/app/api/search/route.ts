import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getServices } from "@/components/streaming/route";
import notFound from "../../../../public/not-found.jpg";

const apiKey = process.env.GROQ_API_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const description = searchParams.get("query") || "";

    if (!description) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    const groq = new Groq({ apiKey });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'Eres un sistema para buscar películas basado en la descripción que se ingresa y respondes en formato JSON en cualquier idioma, Una lista con maximo 10 peliculas, debe estar en JSON y debe tener la siguiente estructura: {"results": [{"title", "year"}]}',
        },
        { role: "user", content: description },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
      stop: null,
    });

    const response = JSON.parse(
      chatCompletion?.choices[0]?.message?.content || "{}"
    );

    if (!response.results) {
      return NextResponse.json({ error: "No movies found" }, { status: 404 });
    }

    const movieData = await Promise.all(
      response.results.map(async (data: any) => {
        const img = await getCover(data.title, data.year);
        const streaming = await getStreaming(data.title);

        return {
          title: data.title,
          year: data.year,
          cover: img,
          streaming: streaming,
        };
      })
    );

    return NextResponse.json({ results: movieData });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
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
      services.push(data?.service?.name);
    }
  });

  return services;
}
