EX - Dashboard della città
===
Esercizio sulle promise.all.
## Consegna
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente: <br>
- Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
- Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
- Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
- Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
## Bonus
1. Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).
2. Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione. <br>
Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che: <br>
- Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
- Stampa in console un messaggio di errore per ogni richiesta fallita.
- Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).