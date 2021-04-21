# seb-curr-calc

This is "combined style" web application ASP.NET Core Web API backend with Angular based frontend

## First run

In Visual studio code - open terminal at /seb-curr-calc folder
install node modules (npm install)
start the app (npm run start) - this compiles web client (to wwwroot), builds and runs backend, opens localhost:5000
(wait for backend build to complete, then refresh localhost:5000)

## App description

This is simple currency converter. You can change sums (other will change accordingly), pick from a list of currencies.
Upon first run frontend connects to backend (/api/Calc/Latest) to retrieve currency rates.
Currency rates have expiration time. Frontend checks once a minute, if retrieved currencies are not yet expired, if they are - it requests new ones;
Backend retrieves currencies from https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml, which contain their activation date.
Currencies expire next day at a set hour (configured in appsettings.json "RefreshHour" setting)
For the sake of simplicity - currencies on backend are stored simply in memory (no database, sorry db lovers).

## Tests

run "npm test" to run frontend tests.
some xunit backend tests are in "seb-curr-calc.test" project (in it's own dir).
To run them you can use "dotnet test" command.

If You prefer Visual studio you can use provided .sln file to load both projects.

