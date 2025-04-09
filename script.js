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
    const [destinationsResult, weathersResult, airportsResult] = await Promise.allSettled(promises);

    const data = {};

    if (destinationsResult.status === 'rejected') {
      console.error('Errore in destinations:', destinationsResult.reason);
      data.city = null;
      data.country = null;
    } else {
      const destinations = destinationsResult.value[0];
      data.city = destinations?.name ?? null;
      data.country = destinations?.country ?? null
    }

    if (weathersResult.status === 'rejected') {
      console.error('Errore in weathers:', weathersResult.reason);
      data.temperature = null;
      data.weather = null;
    } else {
      const weathers = weathersResult.value[0];
      data.temperature = weathers?.temperature ?? null;
      data.weather = weathers?.weather_description ?? null;
    }

    if (airportsResult.status === 'rejected') {
      console.error('Errore in airports:', airportsResult.reason);
      data.airport = null;
    } else {
      const airports = airportsResult.value[0];
      data.airport = airports?.name ?? null;
    }


    return data;

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
    console.log(message);
  })
  .catch(error => console.error(error));