# seb-curr-calc

This is "combined style" web application ASP.NET Core Web API backend with Angular based frontend

## First run

Requires .NET core SDK
Open terminal at /seb-curr-calc folder,\
install node modules (npm install),\
start the app (npm run start) - this compiles web client (to wwwroot), builds and runs backend, opens localhost:5000,\
(wait for backend build to complete, then refresh localhost:5000)

## App description

This is simple currency converter. You can change sums (other will change accordingly), pick from a list of currencies.\
Upon first run frontend connects to backend (/api/Calc/Latest) to retrieve currency rates.\
Currency rates have expiration time. Frontend checks once a minute, if retrieved currencies are not yet expired, if they are - it requests new ones;\
Backend retrieves currencies from https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml, which contain their activation date.\
Currencies expire next day at a set hour (configured in appsettings.json "RefreshHour" setting)\
For the sake of simplicity - currencies on backend are stored simply in memory (no database, sorry db lovers).

## Tests

Run "npm test" to run frontend tests.\
There are some xunit backend tests are in "seb-curr-calc.test" project (in it's own dir).\
To run them you can use "dotnet test" command.

If You prefer Visual studio you can use provided .sln file to load both projects.

## Code description
### Backend
Everything is very simple - classic ASP.NET core web service with only one controller (Controllers/CalcController.cs) and only one endpoint (GET /api/Calc/Current).\
Controller depends on 3 services (in /Services), which are injected with built-in DI.\
Services/MemoryStore/ - trivial storage service. As long, as server runs it stores currencies value. For the needs of this app - no more complexity required\
Services/Indeterminates/ - classic indeterminates, wrapped for testability purposes. Wraps DateTime.Now .\
Services/CurrencyRetrieval/ - really simple implementation of retrieving xml with currencies from given url, and parsing it\
Models - contains 2 trivial DTO objects. CurrencyDTO - simple currency name and rate pair, CurrencyListDTO - wraps list of currencies, expiration date and optional error message - this model is returned from backend

### Frontend
Everything is under /src, inluding pregenerated code.\
Here's structure of component tree in generated page\
|html>body>\
|-app-component     - main application component\
|--/calc            - calc contains main calculator logic\
|----/num-input     - numeric input wraps input functionality\
|-------/mousewheel - simple mousewheel directive, used by numeric input (use mousewheel, ctrl+mousewheel, shift+mousewheel)\
|----/curr-select   - trivial currencies dropdown with a flag
 
/code contains some utils and types used by above components



