import { createDirectus, rest, staticToken } from "@directus/sdk";
//#region src/lib/directus.ts
var url = "https://clientes-directus.nx4d4q.easypanel.host";
var directus = createDirectus(url).with(staticToken("20euI3_AMGqF8woH6SmoV31dFGtN2Vgs")).with(rest());
var DIRECTUS_URL = url;
//#endregion
export { directus as n, DIRECTUS_URL as t };
