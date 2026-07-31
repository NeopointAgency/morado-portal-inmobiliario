import { createDirectus, rest, staticToken } from "@directus/sdk";
//#region src/lib/directus.ts
var url = "http://localhost:8055";
var directus = createDirectus(url).with(staticToken("")).with(rest());
var DIRECTUS_URL = url;
//#endregion
export { directus as n, DIRECTUS_URL as t };
