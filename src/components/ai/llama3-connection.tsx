import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export default async function Llama3(description: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'Eres un sistema para buscar películas basado en la descripción que se ingresa y respondes en formato JSON en cualquier idioma, Una lista con maximo 20 peliculas, debe estar en JSON y debe tener la siguiente estructura: {"results": [\n{"title", "year"}]}',
      },
      {
        role: "user",
        content: description || "",
      },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
  });

  return chatCompletion?.choices[0]?.message?.content || "";
}
