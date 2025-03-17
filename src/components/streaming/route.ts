export async function getServices(title: any) {
  const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${title}&series_granularity=show&show_type=movie&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPIKEY || "",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, options);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
