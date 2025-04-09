async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

const getDashboardData = async (query) => {
  try {
    const destinationsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
    const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
    const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

    const promises = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promises);

    return {
      city: destinations[0]?.name ?? null,
      country: destinations[0]?.country ?? null,
      temperature: weathers[0]?.temperature ?? null,
      weather: weathers[0]?.weather_description ?? null,
      airport: airports[0]?.name ?? null
    }
  } catch (error) {
    throw new Error(`Errore nel recupero dei dati: ${error.message}`);
  }

}

getDashboardData('london')
  .then(data => {
    console.log('Dasboard data:', data);
    let message = '';
    if (data.city !== null && data.country !== null) {
      message += `${data.city} is in ${data.country}.\n`
    }
    if (data.temperature !== null && data.weather !== null) {
      message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
    }
    if (data.airport !== null) {
      message += `The main airport is ${data.airport}.\n`
    }
    console.log(
      `${data.city} is in ${data.country}.\n` +
      `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
      `The main airport is ${data.airport}.\n`
    );
  })
  .catch(error => console.error(error));