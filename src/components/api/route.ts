export async function getServices(title: string) {
  const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${title}&series_granularity=show&show_type=movie&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPIKEY || "",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
